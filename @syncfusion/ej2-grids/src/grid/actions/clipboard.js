import { Browser, remove, EventHandler, isUndefined, closest, classList } from '@syncfusion/ej2-base';
import { parentsUntil } from '../base/util';
import * as events from '../base/constant';
import * as literals from '../base/string-literals';
/**
 * The `Clipboard` module is used to handle clipboard copy action.
 */
var Clipboard = /** @class */ (function () {
    /**
     * Constructor for the Grid clipboard module
     * @hidden
     */
    function Clipboard(parent) {
        this.copyContent = '';
        this.isSelect = false;
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * @hidden
     */
    Clipboard.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.contentReady, this.initialEnd, this);
        this.parent.on(events.keyPressed, this.keyDownHandler, this);
        this.parent.on(events.click, this.clickHandler, this);
        EventHandler.add(this.parent.element, 'keydown', this.pasteHandler, this);
    };
    /**
     * @hidden
     */
    Clipboard.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.keyPressed, this.keyDownHandler);
        this.parent.off(events.contentReady, this.initialEnd);
        this.parent.off(events.click, this.clickHandler);
        EventHandler.remove(this.parent.element, 'keydown', this.pasteHandler);
    };
    Clipboard.prototype.clickHandler = function (e) {
        var target = parentsUntil(e.target, literals.rowCell);
    };
    Clipboard.prototype.pasteHandler = function (e) {
        var _this = this;
        var grid = this.parent;
        var isMacLike = /(Mac)/i.test(navigator.platform);
        if (e.keyCode === 86 && (e.ctrlKey || (isMacLike && e.metaKey)) && !grid.isEdit) {
            var target = closest(document.activeElement, '.' + literals.rowCell);
            if (!target || !grid.editSettings.allowEditing || grid.editSettings.mode !== 'Batch' ||
                grid.selectionSettings.mode !== 'Cell' || grid.selectionSettings.cellSelectionMode === 'Flow') {
                return;
            }
            this.activeElement = document.activeElement;
            this.clipBoardTextArea.value = '';
            var x_1 = window.scrollX;
            var y_1 = window.scrollY;
            this.clipBoardTextArea.focus();
            setTimeout(function () {
                _this.activeElement.focus();
                window.scrollTo(x_1, y_1);
                _this.paste(_this.clipBoardTextArea.value, _this.parent.getSelectedRowCellIndexes()[0].rowIndex, _this.parent.getSelectedRowCellIndexes()[0].cellIndexes[0]);
            }, 10);
        }
    };
    /**
     * Paste data from clipboard to selected cells.
     * @param {boolean} data - Specifies the date for paste.
     * @param {boolean} rowIndex - Specifies the row index.
     * @param {boolean} colIndex - Specifies the column index.
     */
    Clipboard.prototype.paste = function (data, rowIndex, colIndex) {
        var grid = this.parent;
        var cIdx = colIndex;
        var rIdx = rowIndex;
        var col;
        var value;
        var isAvail;
        if (!grid.editSettings.allowEditing || grid.editSettings.mode !== 'Batch' ||
            grid.selectionSettings.mode !== 'Cell' || grid.selectionSettings.cellSelectionMode === 'Flow') {
            return;
        }
        var rows = data.split('\n');
        var cols;
        var dataRows = grid.getDataRows();
        var mRows;
        var frRows;
        var isFrozen = this.parent.isFrozenGrid();
        if (isFrozen) {
            mRows = grid.getMovableDataRows();
            if (grid.getFrozenRightColumnsCount()) {
                frRows = grid.getFrozenRightDataRows();
            }
        }
        for (var r = 0; r < rows.length; r++) {
            cols = rows[r].split('\t');
            cIdx = colIndex;
            if ((r === rows.length - 1 && rows[r] === '') || isUndefined(grid.getRowByIndex(rIdx))) {
                cIdx++;
                break;
            }
            for (var c = 0; c < cols.length; c++) {
                isAvail = grid.getCellFromIndex(rIdx, cIdx);
                if (isFrozen) {
                    var fTr = dataRows[rIdx];
                    var mTr = mRows[rIdx];
                    isAvail = !fTr.querySelector('[aria-colindex="' + cIdx + '"]') ?
                        mTr.querySelector('[aria-colindex="' + cIdx + '"]') : true;
                    if (frRows && !isAvail) {
                        var frTr = frRows[rIdx];
                        isAvail = frTr.querySelector('[aria-colindex="' + cIdx + '"]');
                    }
                }
                if (!isAvail) {
                    cIdx++;
                    break;
                }
                col = grid.getColumnByIndex(cIdx);
                value = col.getParser() ? col.getParser()(cols[c]) : cols[c];
                if (col.allowEditing && !col.isPrimaryKey && !col.template) {
                    var args = {
                        column: col,
                        data: value,
                        rowIndex: rIdx
                    };
                    this.parent.trigger(events.beforePaste, args);
                    rIdx = args.rowIndex;
                    if (!args.cancel) {
                        if (grid.editModule) {
                            if (col.type === 'number') {
                                this.parent.editModule.updateCell(rIdx, col.field, parseFloat(args.data));
                            }
                            else {
                                grid.editModule.updateCell(rIdx, col.field, args.data);
                            }
                        }
                    }
                }
                cIdx++;
            }
            rIdx++;
        }
        grid.selectionModule.selectCellsByRange({ rowIndex: rowIndex, cellIndex: colIndex }, { rowIndex: rIdx - 1, cellIndex: cIdx - 1 });
        var cell = this.parent.getCellFromIndex(rIdx - 1, cIdx - 1);
        if (cell) {
            classList(cell, ['e-focus', 'e-focused'], []);
        }
    };
    Clipboard.prototype.initialEnd = function () {
        this.parent.off(events.contentReady, this.initialEnd);
        this.clipBoardTextArea = this.parent.createElement('textarea', {
            className: 'e-clipboard',
            styles: 'opacity: 0',
            attrs: { tabindex: '-1', 'aria-label': 'clipboard' }
        });
        this.parent.element.appendChild(this.clipBoardTextArea);
    };
    Clipboard.prototype.keyDownHandler = function (e) {
        if (e.action === 'ctrlPlusC') {
            this.copy();
        }
        else if (e.action === 'ctrlShiftPlusH') {
            this.copy(true);
        }
    };
    Clipboard.prototype.setCopyData = function (withHeader) {
        if (window.getSelection().toString() === '') {
            var isFrozen = this.parent.isFrozenGrid();
            this.clipBoardTextArea.value = this.copyContent = '';
            var mRows = void 0;
            var frRows = void 0;
            var rows = this.parent.getRows();
            if (isFrozen) {
                mRows = this.parent.getMovableDataRows();
                if (this.parent.getFrozenMode() === literals.leftRight) {
                    frRows = this.parent.getFrozenRightRows();
                }
            }
            if (this.parent.selectionSettings.mode !== 'Cell') {
                var selectedIndexes = this.parent.getSelectedRowIndexes().sort(function (a, b) { return a - b; });
                if (withHeader) {
                    var headerTextArray = [];
                    for (var i = 0; i < this.parent.getVisibleColumns().length; i++) {
                        headerTextArray[i] = this.parent.getVisibleColumns()[i].headerText;
                    }
                    this.getCopyData(headerTextArray, false, '\t', withHeader);
                    this.copyContent += '\n';
                }
                for (var i = 0; i < selectedIndexes.length; i++) {
                    if (i > 0) {
                        this.copyContent += '\n';
                    }
                    var cells = [].slice.call(rows[selectedIndexes[i]].
                        querySelectorAll('.e-rowcell:not(.e-hide)'));
                    if (isFrozen) {
                        cells.push.apply(cells, [].slice.call(mRows[selectedIndexes[i]].querySelectorAll('.e-rowcell:not(.e-hide)')));
                        if (frRows) {
                            cells.push.apply(cells, [].slice.call(frRows[selectedIndexes[i]].querySelectorAll('.e-rowcell:not(.e-hide)')));
                        }
                    }
                    this.getCopyData(cells, false, '\t', withHeader);
                }
            }
            else {
                var obj = this.checkBoxSelection();
                if (obj.status) {
                    if (withHeader) {
                        var headers = [];
                        for (var i = 0; i < obj.colIndexes.length; i++) {
                            headers.push(this.parent.getColumnHeaderByIndex(obj.colIndexes[i]));
                        }
                        this.getCopyData(headers, false, '\t', withHeader);
                        this.copyContent += '\n';
                    }
                    for (var i = 0; i < obj.rowIndexes.length; i++) {
                        if (i > 0) {
                            this.copyContent += '\n';
                        }
                        var cells = [].slice.call(rows[obj.rowIndexes[i]].
                            getElementsByClassName('e-cellselectionbackground'));
                        if (isFrozen) {
                            cells.push.apply(cells, [].slice.call(mRows[obj.rowIndexes[i]]
                                .getElementsByClassName('e-cellselectionbackground')));
                            if (frRows) {
                                cells.push.apply(cells, [].slice.call(frRows[obj.rowIndexes[i]]
                                    .getElementsByClassName('e-cellselectionbackground')));
                            }
                        }
                        this.getCopyData(cells, false, '\t', withHeader);
                    }
                }
                else {
                    this.getCopyData([].slice.call(this.parent.element.getElementsByClassName('e-cellselectionbackground')), true, '\n', withHeader);
                }
            }
            var args = {
                data: this.copyContent,
                cancel: false,
            };
            this.parent.trigger(events.beforeCopy, args);
            if (args.cancel) {
                return;
            }
            this.clipBoardTextArea.value = this.copyContent = args.data;
            if (!Browser.userAgent.match(/ipad|ipod|iphone/i)) {
                this.clipBoardTextArea.select();
            }
            else {
                this.clipBoardTextArea.setSelectionRange(0, this.clipBoardTextArea.value.length);
            }
            this.isSelect = true;
        }
    };
    Clipboard.prototype.getCopyData = function (cells, isCell, splitKey, withHeader) {
        var isElement = typeof cells[0] !== 'string';
        for (var j = 0; j < cells.length; j++) {
            if (withHeader && isCell) {
                this.copyContent += this.parent.getColumns()[parseInt(cells[j].getAttribute(literals.ariaColIndex), 10)].headerText + '\n';
            }
            if (isElement) {
                if (!cells[j].classList.contains('e-hide')) {
                    this.copyContent += cells[j].innerText;
                }
            }
            else {
                this.copyContent += cells[j];
            }
            if (j < cells.length - 1) {
                this.copyContent += splitKey;
            }
        }
    };
    /**
     * Copy selected rows or cells data into clipboard.
     * @param {boolean} withHeader - Specifies whether the column header data need to be copied or not.
     */
    Clipboard.prototype.copy = function (withHeader) {
        if (document.queryCommandSupported('copy')) {
            this.setCopyData(withHeader);
            document.execCommand('copy');
            this.clipBoardTextArea.blur();
        }
        if (this.isSelect) {
            window.getSelection().removeAllRanges();
            this.isSelect = false;
        }
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    Clipboard.prototype.getModuleName = function () {
        return 'clipboard';
    };
    /**
     * To destroy the clipboard
     * @return {void}
     * @hidden
     */
    Clipboard.prototype.destroy = function () {
        this.removeEventListener();
        if (this.clipBoardTextArea) {
            remove(this.clipBoardTextArea);
        }
    };
    Clipboard.prototype.checkBoxSelection = function () {
        var gridObj = this.parent;
        var obj = { status: false };
        if (gridObj.selectionSettings.mode === 'Cell') {
            var rowCellIndxes = gridObj.getSelectedRowCellIndexes();
            var str = void 0;
            var rowIndexes = [];
            var i = void 0;
            for (i = 0; i < rowCellIndxes.length; i++) {
                if (rowCellIndxes[i].cellIndexes.length) {
                    rowIndexes.push(rowCellIndxes[i].rowIndex);
                }
                if (rowCellIndxes[i].cellIndexes.length) {
                    if (!str) {
                        str = JSON.stringify(rowCellIndxes[i].cellIndexes.sort());
                    }
                    if (str !== JSON.stringify(rowCellIndxes[i].cellIndexes.sort())) {
                        break;
                    }
                }
            }
            rowIndexes.sort(function (a, b) { return a - b; });
            if (i === rowCellIndxes.length && rowIndexes[rowIndexes.length - 1] - rowIndexes[0] === rowIndexes.length - 1) {
                obj = { status: true, rowIndexes: rowIndexes, colIndexes: rowCellIndxes[0].cellIndexes };
            }
        }
        return obj;
    };
    return Clipboard;
}());
export { Clipboard };
