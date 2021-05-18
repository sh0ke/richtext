import { EventHandler, extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { remove, isBlazor, select } from '@syncfusion/ej2-base';
import { Toolbar as tool } from '@syncfusion/ej2-navigations';
import * as events from '../base/constant';
import { templateCompiler, appendChildren, parentsUntil, addRemoveEventListener } from '../base/util';
import { ResponsiveToolbarAction } from '../base/enum';
import { SearchBox } from '../services/focus-strategy';
/**
 * The `Toolbar` module is used to handle ToolBar actions.
 * @hidden
 */
var Toolbar = /** @class */ (function () {
    function Toolbar(parent, serviceLocator) {
        this.predefinedItems = {};
        this.items = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'Print', 'Search',
            'ColumnChooser', 'PdfExport', 'ExcelExport', 'CsvExport', 'WordExport'];
        this.parent = parent;
        this.gridID = parent.element.id;
        this.serviceLocator = serviceLocator;
        this.addEventListener();
    }
    Toolbar.prototype.render = function () {
        this.l10n = this.serviceLocator.getService('localization');
        var preItems = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'Print',
            'PdfExport', 'ExcelExport', 'WordExport', 'CsvExport'];
        var isAdaptive = this.parent.enableAdaptiveUI;
        var excludingItems = ['Edit', 'Delete', 'Update', 'Cancel'];
        for (var _i = 0, preItems_1 = preItems; _i < preItems_1.length; _i++) {
            var item = preItems_1[_i];
            var itemStr = item.toLowerCase();
            var localeName = itemStr[0].toUpperCase() + itemStr.slice(1);
            this.predefinedItems[item] = {
                id: this.gridID + '_' + itemStr, prefixIcon: 'e-' + itemStr,
                text: this.l10n.getConstant(localeName), tooltipText: this.l10n.getConstant(localeName)
            };
            if (isAdaptive) {
                this.predefinedItems[item].text = '';
                this.predefinedItems[item].visible = excludingItems.indexOf(item) === -1;
            }
        }
        this.predefinedItems.Search = {
            id: this.gridID + '_search',
            tooltipText: this.l10n.getConstant('Search'), align: 'Right', cssClass: 'e-search-wrapper',
            type: 'Input'
        };
        this.predefinedItems.ColumnChooser = {
            id: this.gridID + '_' + 'columnchooser', cssClass: 'e-cc e-ccdiv e-cc-toolbar', suffixIcon: 'e-' + 'columnchooser-btn',
            text: isAdaptive ? '' : this.l10n.getConstant('Columnchooser'),
            tooltipText: this.l10n.getConstant('Columnchooser'), align: 'Right',
        };
        if (this.parent.rowRenderingMode === 'Vertical') {
            if (this.parent.allowFiltering && this.parent.filterSettings.type !== 'FilterBar') {
                this.predefinedItems.responsiveFilter = {
                    id: this.gridID + '_' + 'responsivefilter', cssClass: 'e-gridresponsiveicons e-icons',
                    suffixIcon: 'e-' + 'resfilter-icon', tooltipText: this.l10n.getConstant('FilterButton')
                };
            }
            if (this.parent.allowSorting) {
                this.predefinedItems.responsiveSort = {
                    id: this.gridID + '_' + 'responsivesort', cssClass: 'e-gridresponsiveicons e-icons',
                    suffixIcon: 'e-' + 'ressort-icon', tooltipText: this.l10n.getConstant('Sort')
                };
            }
        }
        if (this.parent.enableAdaptiveUI && this.parent.toolbar.indexOf('Search') > -1) {
            this.predefinedItems.responsiveBack = {
                id: this.gridID + '_' + 'responsiveback', cssClass: 'e-gridresponsiveicons e-icons',
                suffixIcon: 'e-' + 'resback-icon', visible: false
            };
        }
        this.createToolbar();
    };
    /**
     * Gets the toolbar of the Grid.
     * @return {Element}
     * @hidden
     */
    Toolbar.prototype.getToolbar = function () {
        return this.toolbar.element;
    };
    /**
     * Destroys the ToolBar.
     * @method destroy
     * @return {void}
     */
    Toolbar.prototype.destroy = function () {
        if (this.toolbar && !this.toolbar.isDestroyed) {
            if (!this.toolbar.element) {
                this.parent.destroyTemplate(['toolbarTemplate']);
                if (this.parent.isReact) {
                    this.parent.renderTemplates();
                }
            }
            else {
                this.toolbar.off('render-react-toolbar-template', this.addReactToolbarPortals);
                this.toolbar.destroy();
            }
            this.unWireEvent();
            this.removeEventListener();
            remove(this.element);
        }
    };
    Toolbar.prototype.bindSearchEvents = function () {
        this.searchElement = select('#' + this.gridID + '_searchbar', this.element);
        this.wireEvent();
        this.refreshToolbarItems();
        if (this.parent.searchSettings) {
            this.updateSearchBox();
        }
    };
    Toolbar.prototype.toolbarCreated = function (isNormal) {
        if (this.element.querySelector('.e-search-wrapper')) {
            if (!this.parent.enableAdaptiveUI || isNormal) {
                this.element.querySelector('.e-search-wrapper').innerHTML = '<div class="e-input-group e-search" role="search">\
                    <input id="' + this.gridID + '_searchbar" class="e-input" name="input" type="search" \
                    placeholder= \"' + this.l10n.getConstant('Search') + '\"/>\
                    <span id="' + this.gridID + '_searchbutton" class="e-input-group-icon e-search-icon e-icons" \
                    tabindex="-1" title="' + this.l10n.getConstant('Search') + '" aria-label= "search"></span> \
                    </div>';
            }
            else {
                this.element.querySelector('.e-search-wrapper').innerHTML = '<span id="' + this.gridID
                    + '_searchbutton" class="e-input-group-icon e-search-icon e-icons" \
                    tabindex="-1" title="' + this.l10n.getConstant('Search') + '" aria-label= "search"></span> \
                    </div>';
            }
        }
        this.bindSearchEvents();
    };
    Toolbar.prototype.createToolbar = function () {
        var items = this.getItems();
        this.toolbar = new tool({
            items: items,
            clicked: this.toolbarClickHandler.bind(this),
            enablePersistence: this.parent.enablePersistence,
            enableRtl: this.parent.enableRtl,
            created: this.toolbarCreated.bind(this)
        });
        this.toolbar.isReact = this.parent.isReact;
        this.toolbar.on('render-react-toolbar-template', this.addReactToolbarPortals, this);
        var isStringTemplate = 'isStringTemplate';
        this.toolbar[isStringTemplate] = true;
        var viewStr = 'viewContainerRef';
        var registerTemp = 'registeredTemplate';
        if (this.parent[viewStr]) {
            this.toolbar[registerTemp] = {};
            this.toolbar[viewStr] = this.parent[viewStr];
        }
        this.element = this.parent.createElement('div', { id: this.gridID + '_toolbarItems' });
        if (this.parent.enableAdaptiveUI) {
            this.element.classList.add('e-res-toolbar');
        }
        if (this.parent.toolbarTemplate) {
            if (!isBlazor() && typeof (this.parent.toolbarTemplate) === 'string') {
                this.toolbar.appendTo(this.parent.toolbarTemplate);
                this.element = this.toolbar.element;
            }
            else {
                var isReactCompiler = this.parent.isReact && typeof (this.parent.toolbarTemplate) !== 'string';
                var ID = this.parent.element.id + 'toolbarTemplate';
                if (isReactCompiler) {
                    templateCompiler(this.parent.toolbarTemplate)({}, this.parent, 'toolbarTemplate', ID, null, null, this.element);
                    this.parent.renderTemplates();
                }
                else {
                    appendChildren(this.element, templateCompiler(this.parent.toolbarTemplate)({}, this.parent, 'toolbarTemplate'));
                }
            }
        }
        else {
            this.toolbar.appendTo(this.element);
        }
        this.parent.element.insertBefore(this.element, this.parent.getHeaderContent());
    };
    Toolbar.prototype.addReactToolbarPortals = function (args) {
        if (this.parent.isReact && args) {
            this.parent.portals = this.parent.portals.concat(args);
            this.parent.renderTemplates();
        }
    };
    Toolbar.prototype.renderResponsiveSearch = function (isRender) {
        if (isRender) {
            this.toolbarCreated(true);
            this.refreshResponsiveToolbarItems(ResponsiveToolbarAction.isSearch);
            this.searchElement = select('#' + this.gridID + '_searchbar', this.element);
            var right = parentsUntil(this.searchElement, 'e-toolbar-right');
            right.classList.add('e-responsive-right');
            if (this.parent.searchSettings) {
                this.updateSearchBox();
            }
            this.searchBoxObj.searchFocus({ target: this.searchElement });
            this.searchElement.focus();
        }
        else {
            this.refreshResponsiveToolbarItems(ResponsiveToolbarAction.isInitial);
        }
    };
    Toolbar.prototype.refreshResponsiveToolbarItems = function (action) {
        if (action === ResponsiveToolbarAction.isInitial) {
            var id = this.parent.element.id;
            var items = [id + '_edit', id + '_delete'];
            var selectedRecords = this.parent.getSelectedRowIndexes();
            var excludingItems = [id + '_responsiveback', id + '_update', id + '_cancel'];
            for (var _i = 0, _a = this.toolbar.items; _i < _a.length; _i++) {
                var item = _a[_i];
                var toolbarEle = this.toolbar.element.querySelector('#' + item.id);
                if (toolbarEle) {
                    if (items.indexOf(item.id) > -1) {
                        if (selectedRecords.length) {
                            toolbarEle.parentElement.classList.remove('e-hidden');
                        }
                        else {
                            toolbarEle.parentElement.classList.add('e-hidden');
                        }
                    }
                    else {
                        if (excludingItems.indexOf(item.id) === -1) {
                            toolbarEle.parentElement.classList.remove('e-hidden');
                        }
                        else {
                            toolbarEle.parentElement.classList.add('e-hidden');
                        }
                    }
                }
            }
            if (this.searchElement) {
                var right = parentsUntil(this.searchElement, 'e-toolbar-right');
                right.classList.remove('e-responsive-right');
                this.toolbarCreated(false);
                this.unWireEvent();
                this.searchElement = undefined;
            }
        }
        if (action === ResponsiveToolbarAction.isSearch) {
            var items = [this.parent.element.id + '_responsiveback', this.parent.element.id + '_search'];
            for (var _b = 0, _c = this.toolbar.items; _b < _c.length; _b++) {
                var item = _c[_b];
                var toolbarEle = this.toolbar.element.querySelector('#' + item.id);
                if (toolbarEle) {
                    if (items.indexOf(item.id) > -1) {
                        toolbarEle.parentElement.classList.remove('e-hidden');
                    }
                    else {
                        toolbarEle.parentElement.classList.add('e-hidden');
                    }
                }
            }
        }
    };
    Toolbar.prototype.refreshToolbarItems = function (args) {
        var gObj = this.parent;
        var enableItems = [];
        var disableItems = [];
        var edit = gObj.editSettings;
        var hasData = gObj.currentViewData && gObj.currentViewData.length;
        edit.allowAdding ? enableItems.push(this.gridID + '_add') : disableItems.push(this.gridID + '_add');
        edit.allowEditing && hasData ? enableItems.push(this.gridID + '_edit') : disableItems.push(this.gridID + '_edit');
        edit.allowDeleting && hasData ? enableItems.push(this.gridID + '_delete') : disableItems.push(this.gridID + '_delete');
        if (gObj.editSettings.mode === 'Batch') {
            if (gObj.element.getElementsByClassName('e-updatedtd').length && (edit.allowAdding || edit.allowEditing)) {
                enableItems.push(this.gridID + '_update');
                enableItems.push(this.gridID + '_cancel');
            }
            else {
                disableItems.push(this.gridID + '_update');
                disableItems.push(this.gridID + '_cancel');
            }
        }
        else {
            if (gObj.isEdit && (edit.allowAdding || edit.allowEditing)) {
                enableItems = [this.gridID + '_update', this.gridID + '_cancel'];
                disableItems = [this.gridID + '_add', this.gridID + '_edit', this.gridID + '_delete'];
            }
            else {
                disableItems.push(this.gridID + '_update');
                disableItems.push(this.gridID + '_cancel');
            }
        }
        this.enableItems(enableItems, true);
        this.enableItems(disableItems, false);
    };
    Toolbar.prototype.getItems = function () {
        var items = [];
        var toolbarItems = this.parent.toolbar || [];
        if (typeof (this.parent.toolbar) === 'string') {
            return [];
        }
        if (this.parent.rowRenderingMode === 'Vertical') {
            if (this.parent.allowFiltering && this.parent.filterSettings.type !== 'FilterBar') {
                items.push(this.getItemObject('responsiveFilter'));
            }
            if (this.parent.allowSorting) {
                items.push(this.getItemObject('responsiveSort'));
            }
        }
        for (var _i = 0, toolbarItems_1 = toolbarItems; _i < toolbarItems_1.length; _i++) {
            var item = toolbarItems_1[_i];
            switch (typeof item) {
                case 'number':
                    items.push(this.getItemObject(this.items[item]));
                    break;
                case 'string':
                    items.push(this.getItemObject(item));
                    break;
                default:
                    items.push(this.getItem(item));
            }
        }
        if (this.parent.enableAdaptiveUI && this.parent.toolbar.indexOf('Search') > -1) {
            items.push(this.getItemObject('responsiveBack'));
        }
        return items;
    };
    Toolbar.prototype.getItem = function (itemObject) {
        var item = this.predefinedItems[itemObject.text];
        return item ? extend(item, item, itemObject) : itemObject;
    };
    Toolbar.prototype.getItemObject = function (itemName) {
        return this.predefinedItems[itemName] || { text: itemName, id: this.gridID + '_' + itemName };
    };
    /**
     * Enables or disables ToolBar items.
     * @param {string[]} items - Defines the collection of itemID of ToolBar items.
     * @param {boolean} isEnable - Defines the items to be enabled or disabled.
     * @return {void}
     * @hidden
     */
    Toolbar.prototype.enableItems = function (items, isEnable) {
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var element = select('#' + item, this.element);
            if (element) {
                this.toolbar.enableItems(element.parentElement, isEnable);
            }
        }
    };
    Toolbar.prototype.toolbarClickHandler = function (args) {
        var _this = this;
        var gObj = this.parent;
        var gID = this.gridID;
        extend(args, { cancel: false });
        var newArgs = args;
        var originalEvent = args.originalEvent;
        gObj.trigger(events.toolbarClick, newArgs, function (toolbarargs) {
            toolbarargs.originalEvent = toolbarargs.originalEvent ? toolbarargs.originalEvent : originalEvent;
            if (!toolbarargs.cancel) {
                switch (!isNullOrUndefined(toolbarargs.item) && toolbarargs.item.id) {
                    case gID + '_print':
                        gObj.print();
                        break;
                    case gID + '_edit':
                        gObj.startEdit();
                        break;
                    case gID + '_update':
                        gObj.endEdit();
                        break;
                    case gID + '_cancel':
                        gObj.closeEdit();
                        break;
                    case gID + '_add':
                        gObj.addRecord();
                        break;
                    case gID + '_delete':
                        gObj.deleteRecord();
                        break;
                    case gID + '_search':
                        if (toolbarargs.originalEvent.target.id === gID + '_searchbutton' && _this.searchElement) {
                            _this.search();
                        }
                        else if (gObj.enableAdaptiveUI && !_this.searchElement
                            && (toolbarargs.originalEvent.target.classList.contains('e-search-wrapper')
                                || toolbarargs.originalEvent.target.id === gID + '_searchbutton')) {
                            _this.renderResponsiveSearch(true);
                        }
                        break;
                    case gID + '_columnchooser':
                        var tarElement = _this.parent.element.querySelector('.e-ccdiv');
                        var y = tarElement.getBoundingClientRect().top;
                        var x = tarElement.getBoundingClientRect().left;
                        var targetEle = toolbarargs.originalEvent.target;
                        y = tarElement.getBoundingClientRect().top + tarElement.offsetTop;
                        gObj.createColumnchooser(x, y, targetEle);
                        break;
                    case gID + '_responsivefilter':
                        gObj.showResponsiveCustomFilter();
                        break;
                    case gID + '_responsivesort':
                        gObj.showResponsiveCustomSort();
                        break;
                    case gID + '_responsiveback':
                        _this.renderResponsiveSearch(false);
                        break;
                }
            }
        });
    };
    Toolbar.prototype.modelChanged = function (e) {
        if (e.module === 'edit') {
            this.refreshToolbarItems();
        }
    };
    Toolbar.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName() || !this.parent.toolbar) {
            return;
        }
        if (this.element) {
            remove(this.element);
        }
        this.render();
    };
    Toolbar.prototype.keyUpHandler = function (e) {
        if (e.keyCode === 13) {
            this.search();
        }
    };
    Toolbar.prototype.search = function () {
        this.parent.search(this.searchElement.value);
    };
    Toolbar.prototype.updateSearchBox = function () {
        if (this.searchElement) {
            this.searchElement.value = this.parent.searchSettings.key;
        }
    };
    Toolbar.prototype.wireEvent = function () {
        if (this.searchElement) {
            this.searchBoxObj = new SearchBox(this.searchElement);
            EventHandler.add(this.searchElement, 'keyup', this.keyUpHandler, this);
            this.searchBoxObj.wireEvent();
        }
    };
    Toolbar.prototype.unWireEvent = function () {
        if (this.searchElement) {
            EventHandler.remove(this.searchElement, 'keyup', this.keyUpHandler);
            this.searchBoxObj.unWireEvent();
        }
    };
    Toolbar.prototype.reRenderToolbar = function () {
        if (this.element) {
            remove(this.element);
        }
        this.render();
    };
    Toolbar.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.evtHandlers = [{ event: events.setFullScreenDialog, handler: this.reRenderToolbar },
            { event: events.initialEnd, handler: this.render },
            { event: events.uiUpdate, handler: this.onPropertyChanged },
            { event: events.inBoundModelChanged, handler: this.updateSearchBox.bind(this) },
            { event: events.modelChanged, handler: this.refreshToolbarItems },
            { event: events.toolbarRefresh, handler: this.refreshToolbarItems },
            { event: events.inBoundModelChanged, handler: this.modelChanged },
            { event: events.dataBound, handler: this.refreshToolbarItems },
            { event: events.click, handler: this.removeResponsiveSearch },
            { event: events.rowModeChange, handler: this.reRenderToolbar }];
        addRemoveEventListener(this.parent, this.evtHandlers, true, this);
        this.rowSelectedFunction = this.rowSelected.bind(this);
        this.rowDeSelectedFunction = this.rowSelected.bind(this);
        this.parent.addEventListener(events.rowSelected, this.rowSelectedFunction);
        this.parent.addEventListener(events.rowDeselected, this.rowDeSelectedFunction);
    };
    Toolbar.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        addRemoveEventListener(this.parent, this.evtHandlers, false);
        this.parent.removeEventListener(events.rowSelected, this.rowSelectedFunction);
        this.parent.removeEventListener(events.rowDeselected, this.rowDeSelectedFunction);
    };
    Toolbar.prototype.removeResponsiveSearch = function (e) {
        var target = e.target;
        var isSearch = target.classList.contains('e-search-icon') || target.classList.contains('e-search-wrapper');
        if (this.parent.enableAdaptiveUI && !isSearch && this.searchElement
            && !parentsUntil(e.target, 'e-res-toolbar')) {
            this.renderResponsiveSearch(false);
        }
    };
    Toolbar.prototype.rowSelected = function () {
        if (this.parent.enableAdaptiveUI) {
            this.refreshResponsiveToolbarItems(ResponsiveToolbarAction.isInitial);
        }
    };
    /**
     * For internal use only - Get the module name.
     */
    Toolbar.prototype.getModuleName = function () {
        return 'toolbar';
    };
    return Toolbar;
}());
export { Toolbar };
