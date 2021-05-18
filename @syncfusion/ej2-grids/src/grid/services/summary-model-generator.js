var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Row } from '../models/row';
import { Column } from '../models/column';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { calculateAggregate, getUid } from '../base/util';
import { CellType } from '../base/enum';
import { Cell } from '../models/cell';
/**
 * Summary row model generator
 * @hidden
 */
var SummaryModelGenerator = /** @class */ (function () {
    /**
     * Constructor for Summary row model generator
     */
    function SummaryModelGenerator(parent) {
        this.parent = parent;
    }
    SummaryModelGenerator.prototype.getData = function () {
        var _this = this;
        var rows = [];
        var row = this.parent.aggregates.slice();
        for (var i = 0; i < row.length; i++) {
            var columns = row[i].columns.filter(function (column) {
                return !(column.footerTemplate || column.groupFooterTemplate || column.groupCaptionTemplate)
                    || _this.columnSelector(column);
            });
            if (columns.length) {
                rows.push({ columns: columns });
            }
        }
        return rows;
    };
    SummaryModelGenerator.prototype.columnSelector = function (column) {
        return column.footerTemplate !== undefined;
    };
    SummaryModelGenerator.prototype.getColumns = function (start, end) {
        var columns = [];
        if (this.parent.allowGrouping) {
            for (var i = 0; i < this.parent.groupSettings.columns.length; i++) {
                columns.push(new Column({}));
            }
        }
        if (this.parent.detailTemplate || !isNullOrUndefined(this.parent.childGrid) || (this.parent.isRowDragable() && !start)) {
            columns.push(new Column({}));
        }
        columns.push.apply(columns, this.parent.getColumns());
        end = end ? end + this.parent.getIndentCount() : end;
        return isNullOrUndefined(start) ? columns : columns.slice(start, end);
    };
    SummaryModelGenerator.prototype.generateRows = function (input, args, start, end, columns) {
        if (input.length === 0) {
            if (args === undefined || !args.count) {
                return [];
            }
        }
        var data = this.buildSummaryData(input, args);
        var rows = [];
        var row = this.getData();
        for (var i = 0; i < row.length; i++) {
            rows.push(this.getGeneratedRow(row[i], data[i], args ? args.level : undefined, start, end, args ? args.parentUid : undefined, columns));
        }
        return rows;
    };
    SummaryModelGenerator.prototype.getGeneratedRow = function (summaryRow, data, raw, start, end, parentUid, columns) {
        var tmp = [];
        var indents = this.getIndentByLevel(raw);
        var isDetailGridAlone = !isNullOrUndefined(this.parent.childGrid);
        var indentLength = this.parent.getIndentCount();
        if (this.parent.isRowDragable()) {
            indents = ['e-indentcelltop'];
        }
        var values = columns ? columns : this.getColumns(start, end);
        for (var i = 0; i < values.length; i++) {
            tmp.push(this.getGeneratedCell(values[i], summaryRow, i >= indentLength ? this.getCellType() :
                i < this.parent.groupSettings.columns.length ? CellType.Indent : CellType.DetailFooterIntent, indents[i], isDetailGridAlone));
        }
        var row = new Row({ data: data, attributes: { class: 'e-summaryrow' } });
        row.cells = tmp;
        row.uid = getUid('grid-row');
        row.parentUid = parentUid;
        row.visible = tmp.some(function (cell) { return cell.isDataCell && cell.visible; });
        return row;
    };
    SummaryModelGenerator.prototype.getGeneratedCell = function (column, summaryRow, cellType, indent, isDetailGridAlone) {
        //Get the summary column by display
        var sColumn = summaryRow.columns.filter(function (scolumn) { return scolumn.columnName === column.field; })[0];
        var attrs = {
            'style': { 'textAlign': column.textAlign },
            'e-mappinguid': column.uid, index: column.index
        };
        if (indent) {
            attrs.class = indent;
        }
        if (isNullOrUndefined(indent) && isDetailGridAlone) {
            attrs.class = 'e-detailindentcelltop';
        }
        var opt = {
            'visible': column.visible,
            'isDataCell': !isNullOrUndefined(sColumn),
            'isTemplate': sColumn && !isNullOrUndefined(sColumn.footerTemplate
                || sColumn.groupFooterTemplate || sColumn.groupCaptionTemplate),
            'column': sColumn || {},
            'attributes': attrs,
            'cellType': cellType
        };
        opt.column.headerText = column.headerText;
        return new Cell(opt);
    };
    SummaryModelGenerator.prototype.buildSummaryData = function (data, args) {
        var dummy = [];
        var summaryRows = this.getData();
        var single = {};
        var key = '';
        for (var i = 0; i < summaryRows.length; i++) {
            single = {};
            var column = summaryRows[i].columns;
            for (var j = 0; j < column.length; j++) {
                single = this.setTemplate(column[j], (args && args.aggregates) ? args : data, single);
            }
            dummy.push(single);
        }
        return dummy;
    };
    SummaryModelGenerator.prototype.getIndentByLevel = function (data) {
        return this.parent.groupSettings.columns.map(function () { return 'e-indentcelltop'; });
    };
    SummaryModelGenerator.prototype.setTemplate = function (column, data, single) {
        var types = column.type;
        var helper = {};
        var formatFn = column.getFormatter() || (function () { return function (a) { return a; }; })();
        var group = data;
        if (!(types instanceof Array)) {
            types = [column.type];
        }
        for (var i = 0; i < types.length; i++) {
            var key = column.field + ' - ' + types[i].toLowerCase();
            var disp = column.columnName;
            var val = types[i] !== 'Custom' && group.aggregates && key in group.aggregates ? group.aggregates[key] :
                calculateAggregate(types[i], group.aggregates ? group : data, column, this.parent);
            single[disp] = single[disp] || {};
            single[disp][key] = val;
            single[disp][types[i]] = !isNullOrUndefined(val) ? formatFn(val) : ' ';
            if (group.field) {
                single[disp].field = group.field;
                single[disp].key = group.key;
            }
        }
        helper.format = column.getFormatter();
        column.setTemplate(helper);
        return single;
    };
    SummaryModelGenerator.prototype.getCellType = function () {
        return CellType.Summary;
    };
    return SummaryModelGenerator;
}());
export { SummaryModelGenerator };
var GroupSummaryModelGenerator = /** @class */ (function (_super) {
    __extends(GroupSummaryModelGenerator, _super);
    function GroupSummaryModelGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupSummaryModelGenerator.prototype.columnSelector = function (column) {
        return column.groupFooterTemplate !== undefined;
    };
    GroupSummaryModelGenerator.prototype.getIndentByLevel = function (level) {
        if (level === void 0) { level = this.parent.groupSettings.columns.length; }
        return this.parent.groupSettings.columns.map(function (v, indx) { return indx <= level - 1 ? '' : 'e-indentcelltop'; });
    };
    GroupSummaryModelGenerator.prototype.getCellType = function () {
        return CellType.GroupSummary;
    };
    return GroupSummaryModelGenerator;
}(SummaryModelGenerator));
export { GroupSummaryModelGenerator };
var CaptionSummaryModelGenerator = /** @class */ (function (_super) {
    __extends(CaptionSummaryModelGenerator, _super);
    function CaptionSummaryModelGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CaptionSummaryModelGenerator.prototype.columnSelector = function (column) {
        return column.groupCaptionTemplate !== undefined;
    };
    CaptionSummaryModelGenerator.prototype.getData = function () {
        var initVal = { columns: [] };
        return [_super.prototype.getData.call(this).reduce(function (prev, cur) {
                prev.columns = prev.columns.concat(cur.columns);
                return prev;
            }, initVal)];
    };
    CaptionSummaryModelGenerator.prototype.isEmpty = function () {
        return (this.getData()[0].columns || []).length === 0;
    };
    CaptionSummaryModelGenerator.prototype.getCellType = function () {
        return CellType.CaptionSummary;
    };
    return CaptionSummaryModelGenerator;
}(SummaryModelGenerator));
export { CaptionSummaryModelGenerator };
