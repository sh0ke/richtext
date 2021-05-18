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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, ChildProperty, Browser, closest, extend } from '@syncfusion/ej2-base';
import { isNullOrUndefined, setValue, getValue, isBlazor } from '@syncfusion/ej2-base';
import { addClass, removeClass, append, remove, classList, setStyleAttribute } from '@syncfusion/ej2-base';
import { Property, Collection, Complex, Event, NotifyPropertyChanges, L10n } from '@syncfusion/ej2-base';
import { EventHandler, KeyboardEvents } from '@syncfusion/ej2-base';
import { DataManager, DataUtil, UrlAdaptor } from '@syncfusion/ej2-data';
import { createSpinner, hideSpinner, showSpinner, Tooltip } from '@syncfusion/ej2-popups';
import { iterateArrayOrObject, prepareColumns, parentsUntil, wrap, templateCompiler, isGroupAdaptive, refreshForeignData } from './util';
import { getRowHeight, setColumnIndex, Global, ispercentageWidth, renderMovable, getNumberFormat } from './util';
import { setRowElements, resetRowIndex, compareChanges, getCellByColAndRowIndex, performComplexDataOperation } from './util';
import * as events from '../base/constant';
import { Render } from '../renderer/render';
import { RenderType } from './enum';
import { RowRenderer } from '../renderer/row-renderer';
import { CellRenderer } from '../renderer/cell-renderer';
import { CellRendererFactory } from '../services/cell-render-factory';
import { ServiceLocator } from '../services/service-locator';
import { ValueFormatter } from '../services/value-formatter';
import { RendererFactory } from '../services/renderer-factory';
import { ColumnWidthService } from '../services/width-controller';
import { AriaService } from '../services/aria-service';
import { FocusStrategy } from '../services/focus-strategy';
import { PageSettings } from '../models/page-settings';
import { ColumnChooserSettings } from '../models/column-chooser-settings';
import { Selection } from '../actions/selection';
import { Search } from '../actions/search';
import { ShowHide } from '../actions/show-hide';
import { Scroll } from '../actions/scroll';
import { Print } from '../actions/print';
import { AggregateRow } from '../models/aggregate';
import { Clipboard } from '../actions/clipboard';
import { RowModelGenerator } from '../services/row-model-generator';
import * as literals from '../base/string-literals';
/**
 * Represents the field name and direction of sort column.
 */
var SortDescriptor = /** @class */ (function (_super) {
    __extends(SortDescriptor, _super);
    function SortDescriptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], SortDescriptor.prototype, "field", void 0);
    __decorate([
        Property()
    ], SortDescriptor.prototype, "direction", void 0);
    __decorate([
        Property(false)
    ], SortDescriptor.prototype, "isFromGroup", void 0);
    return SortDescriptor;
}(ChildProperty));
export { SortDescriptor };
/**
 * Configures the sorting behavior of Grid.
 */
var SortSettings = /** @class */ (function (_super) {
    __extends(SortSettings, _super);
    function SortSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Collection([], SortDescriptor)
    ], SortSettings.prototype, "columns", void 0);
    __decorate([
        Property(true)
    ], SortSettings.prototype, "allowUnsort", void 0);
    return SortSettings;
}(ChildProperty));
export { SortSettings };
/**
 * Represents the predicate for the filter column.
 */
var Predicate = /** @class */ (function (_super) {
    __extends(Predicate, _super);
    function Predicate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], Predicate.prototype, "field", void 0);
    __decorate([
        Property()
    ], Predicate.prototype, "operator", void 0);
    __decorate([
        Property()
    ], Predicate.prototype, "value", void 0);
    __decorate([
        Property()
    ], Predicate.prototype, "matchCase", void 0);
    __decorate([
        Property(false)
    ], Predicate.prototype, "ignoreAccent", void 0);
    __decorate([
        Property()
    ], Predicate.prototype, "predicate", void 0);
    __decorate([
        Property({})
    ], Predicate.prototype, "actualFilterValue", void 0);
    __decorate([
        Property({})
    ], Predicate.prototype, "actualOperator", void 0);
    __decorate([
        Property()
    ], Predicate.prototype, "type", void 0);
    __decorate([
        Property()
    ], Predicate.prototype, "ejpredicate", void 0);
    __decorate([
        Property()
    ], Predicate.prototype, "uid", void 0);
    __decorate([
        Property()
    ], Predicate.prototype, "isForeignKey", void 0);
    return Predicate;
}(ChildProperty));
export { Predicate };
/**
 * Configures the infinite scroll behavior of Grid.
 */
var InfiniteScrollSettings = /** @class */ (function (_super) {
    __extends(InfiniteScrollSettings, _super);
    function InfiniteScrollSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], InfiniteScrollSettings.prototype, "enableCache", void 0);
    __decorate([
        Property(3)
    ], InfiniteScrollSettings.prototype, "maxBlocks", void 0);
    __decorate([
        Property(3)
    ], InfiniteScrollSettings.prototype, "initialBlocks", void 0);
    return InfiniteScrollSettings;
}(ChildProperty));
export { InfiniteScrollSettings };
/**
 * Configures the filtering behavior of the Grid.
 */
var FilterSettings = /** @class */ (function (_super) {
    __extends(FilterSettings, _super);
    function FilterSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Collection([], Predicate)
    ], FilterSettings.prototype, "columns", void 0);
    __decorate([
        Property('FilterBar')
    ], FilterSettings.prototype, "type", void 0);
    __decorate([
        Property()
    ], FilterSettings.prototype, "mode", void 0);
    __decorate([
        Property(true)
    ], FilterSettings.prototype, "showFilterBarStatus", void 0);
    __decorate([
        Property(1500)
    ], FilterSettings.prototype, "immediateModeDelay", void 0);
    __decorate([
        Property()
    ], FilterSettings.prototype, "operators", void 0);
    __decorate([
        Property(false)
    ], FilterSettings.prototype, "ignoreAccent", void 0);
    __decorate([
        Property(false)
    ], FilterSettings.prototype, "enableCaseSensitivity", void 0);
    __decorate([
        Property(false)
    ], FilterSettings.prototype, "showFilterBarOperator", void 0);
    return FilterSettings;
}(ChildProperty));
export { FilterSettings };
/**
 * Configures the selection behavior of the Grid.
 */
var SelectionSettings = /** @class */ (function (_super) {
    __extends(SelectionSettings, _super);
    function SelectionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Row')
    ], SelectionSettings.prototype, "mode", void 0);
    __decorate([
        Property('Flow')
    ], SelectionSettings.prototype, "cellSelectionMode", void 0);
    __decorate([
        Property('Single')
    ], SelectionSettings.prototype, "type", void 0);
    __decorate([
        Property(false)
    ], SelectionSettings.prototype, "checkboxOnly", void 0);
    __decorate([
        Property(false)
    ], SelectionSettings.prototype, "persistSelection", void 0);
    __decorate([
        Property('Default')
    ], SelectionSettings.prototype, "checkboxMode", void 0);
    __decorate([
        Property(false)
    ], SelectionSettings.prototype, "enableSimpleMultiRowSelection", void 0);
    __decorate([
        Property(true)
    ], SelectionSettings.prototype, "enableToggle", void 0);
    __decorate([
        Property(false)
    ], SelectionSettings.prototype, "allowColumnSelection", void 0);
    return SelectionSettings;
}(ChildProperty));
export { SelectionSettings };
/**
 * Configures the search behavior of the Grid.
 */
var SearchSettings = /** @class */ (function (_super) {
    __extends(SearchSettings, _super);
    function SearchSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property([])
    ], SearchSettings.prototype, "fields", void 0);
    __decorate([
        Property('')
    ], SearchSettings.prototype, "key", void 0);
    __decorate([
        Property('contains')
    ], SearchSettings.prototype, "operator", void 0);
    __decorate([
        Property(true)
    ], SearchSettings.prototype, "ignoreCase", void 0);
    __decorate([
        Property(false)
    ], SearchSettings.prototype, "ignoreAccent", void 0);
    return SearchSettings;
}(ChildProperty));
export { SearchSettings };
/**
 * Configures the row drop settings of the Grid.
 */
var RowDropSettings = /** @class */ (function (_super) {
    __extends(RowDropSettings, _super);
    function RowDropSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], RowDropSettings.prototype, "targetID", void 0);
    return RowDropSettings;
}(ChildProperty));
export { RowDropSettings };
/**
 * Configures the text wrap settings of the Grid.
 */
var TextWrapSettings = /** @class */ (function (_super) {
    __extends(TextWrapSettings, _super);
    function TextWrapSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Both')
    ], TextWrapSettings.prototype, "wrapMode", void 0);
    return TextWrapSettings;
}(ChildProperty));
export { TextWrapSettings };
/**
 * Configures the resize behavior of the Grid.
 */
var ResizeSettings = /** @class */ (function (_super) {
    __extends(ResizeSettings, _super);
    function ResizeSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Normal')
    ], ResizeSettings.prototype, "mode", void 0);
    return ResizeSettings;
}(ChildProperty));
export { ResizeSettings };
/**
 * Configures the group behavior of the Grid.
 */
var GroupSettings = /** @class */ (function (_super) {
    __extends(GroupSettings, _super);
    function GroupSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], GroupSettings.prototype, "showDropArea", void 0);
    __decorate([
        Property(false)
    ], GroupSettings.prototype, "allowReordering", void 0);
    __decorate([
        Property(false)
    ], GroupSettings.prototype, "showToggleButton", void 0);
    __decorate([
        Property(false)
    ], GroupSettings.prototype, "showGroupedColumn", void 0);
    __decorate([
        Property(true)
    ], GroupSettings.prototype, "showUngroupButton", void 0);
    __decorate([
        Property(false)
    ], GroupSettings.prototype, "disablePageWiseAggregates", void 0);
    __decorate([
        Property([])
    ], GroupSettings.prototype, "columns", void 0);
    __decorate([
        Property()
    ], GroupSettings.prototype, "captionTemplate", void 0);
    __decorate([
        Property(false)
    ], GroupSettings.prototype, "enableLazyLoading", void 0);
    return GroupSettings;
}(ChildProperty));
export { GroupSettings };
/**
 * Configures the edit behavior of the Grid.
 */
var EditSettings = /** @class */ (function (_super) {
    __extends(EditSettings, _super);
    function EditSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], EditSettings.prototype, "allowAdding", void 0);
    __decorate([
        Property(false)
    ], EditSettings.prototype, "allowEditing", void 0);
    __decorate([
        Property(false)
    ], EditSettings.prototype, "allowDeleting", void 0);
    __decorate([
        Property('Normal')
    ], EditSettings.prototype, "mode", void 0);
    __decorate([
        Property(true)
    ], EditSettings.prototype, "allowEditOnDblClick", void 0);
    __decorate([
        Property(true)
    ], EditSettings.prototype, "showConfirmDialog", void 0);
    __decorate([
        Property(false)
    ], EditSettings.prototype, "showDeleteConfirmDialog", void 0);
    __decorate([
        Property('')
    ], EditSettings.prototype, "template", void 0);
    __decorate([
        Property('')
    ], EditSettings.prototype, "headerTemplate", void 0);
    __decorate([
        Property('')
    ], EditSettings.prototype, "footerTemplate", void 0);
    __decorate([
        Property('Top')
    ], EditSettings.prototype, "newRowPosition", void 0);
    __decorate([
        Property({})
    ], EditSettings.prototype, "dialog", void 0);
    __decorate([
        Property(false)
    ], EditSettings.prototype, "allowNextRowEdit", void 0);
    return EditSettings;
}(ChildProperty));
export { EditSettings };
/**
 * Represents the Grid component.
 * ```html
 * <div id="grid"></div>
 * <script>
 *  var gridObj = new Grid({ allowPaging: true });
 *  gridObj.appendTo("#grid");
 * </script>
 * ```
 */
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    /**
     * Constructor for creating the component
     * @hidden
     */
    function Grid(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isPreventScrollEvent = false;
        _this.inViewIndexes = [];
        _this.keyA = false;
        _this.frozenRightCount = 0;
        _this.frozenLeftCount = 0;
        _this.tablesCount = 1;
        _this.movableCount = 0;
        _this.visibleFrozenLeft = 0;
        _this.visibleFrozenRight = 0;
        _this.visibleMovable = 0;
        _this.frozenLeftColumns = [];
        _this.frozenRightColumns = [];
        _this.movableColumns = [];
        _this.media = {};
        _this.isFreezeRefresh = false;
        /** @hidden */
        _this.tableIndex = 0;
        _this.componentRefresh = Component.prototype.refresh;
        /** @hidden */
        _this.isVirtualAdaptive = false;
        /** @hidden */
        _this.vRows = [];
        /** @hidden */
        _this.vcRows = [];
        /** @hidden */
        _this.vGroupOffsets = {};
        /** @hidden */
        _this.rowUid = 0;
        /**
         * Gets the currently visible records of the Grid.
         */
        _this.currentViewData = [];
        /** @hidden */
        _this.lockcolPositionCount = 0;
        /** @hidden */
        _this.prevPageMoving = false;
        /** @hidden */
        _this.pageTemplateChange = false;
        /** @hidden */
        _this.isAutoGen = false;
        _this.mediaBindInstance = {};
        /** @hidden */
        _this.commandDelIndex = undefined;
        /** @hidden */
        _this.asyncTimeOut = 50;
        // enable/disable logger for MVC & Core
        _this.enableLogger = true;
        _this.needsID = true;
        Grid_1.Inject(Selection);
        setValue('mergePersistData', _this.mergePersistGridData, _this);
        return _this;
    }
    Grid_1 = Grid;
    /**
     * Get the properties to be maintained in the persisted state.
     * @return {string}
     */
    Grid.prototype.getPersistData = function () {
        var keyEntity = ['pageSettings', 'sortSettings',
            'filterSettings', 'groupSettings', 'columns', 'searchSettings', 'selectedRowIndex', 'scrollPosition'];
        var ignoreOnPersist = {
            pageSettings: ['template', 'pageSizes', 'enableQueryString', 'totalRecordsCount', 'pageCount'],
            filterSettings: ['type', 'mode', 'showFilterBarStatus', 'immediateModeDelay', 'ignoreAccent'],
            groupSettings: ['showDropArea', 'showToggleButton', 'showGroupedColumn', 'showUngroupButton',
                'disablePageWiseAggregates', 'hideCaptionCount'],
            searchSettings: ['fields', 'operator', 'ignoreCase'],
            sortSettings: [], columns: [], selectedRowIndex: [], scrollPosition: []
        };
        var ignoreOnColumn = ['filter', 'edit', 'filterBarTemplate', 'headerTemplate', 'template',
            'commandTemplate', 'commands', 'dataSource', 'headerText'];
        for (var i = 0; i < keyEntity.length; i++) {
            var currentObject = this[keyEntity[i]];
            for (var _i = 0, _a = ignoreOnPersist[keyEntity[i]]; _i < _a.length; _i++) {
                var val = _a[_i];
                delete currentObject[val];
            }
        }
        this.pageSettings.template = undefined;
        /* tslint:disable-next-line:no-any */
        if (this.isAngular) {
            /* tslint:disable:no-string-literal */
            delete this.groupSettings['properties']['captionTemplate'];
        }
        this.pageTemplateChange = !isNullOrUndefined(this.pagerTemplate);
        return this.addOnPersist(keyEntity);
    };
    /**
     * To provide the array of modules needed for component rendering
     * @return {ModuleDeclaration[]}
     * @hidden
     */
    // tslint:disable-next-line:max-func-body-length
    Grid.prototype.requiredModules = function () {
        this.setFrozenCount();
        var modules = [];
        if (this.isDestroyed) {
            return modules;
        }
        if (this.allowFiltering) {
            modules.push({
                member: 'filter',
                args: [this, this.filterSettings, this.serviceLocator]
            });
        }
        if (this.allowExcelExport) {
            modules.push({
                member: 'ExcelExport',
                args: [this, this.serviceLocator]
            });
        }
        if (this.allowPdfExport) {
            modules.push({
                member: 'PdfExport',
                args: [this]
            });
        }
        if (this.allowSorting) {
            modules.push({
                member: 'sort',
                args: [this, this.sortSettings, this.sortedColumns, this.serviceLocator]
            });
        }
        if (this.allowPaging) {
            modules.push({
                member: 'pager',
                args: [this, this.pageSettings]
            });
        }
        if (this.allowSelection) {
            modules.push({
                member: 'selection',
                args: [this, this.selectionSettings, this.serviceLocator]
            });
        }
        modules.push({
            member: 'resize',
            args: [this]
        });
        if (this.allowReordering) {
            modules.push({
                member: 'reorder',
                args: [this]
            });
        }
        if (this.allowRowDragAndDrop) {
            modules.push({
                member: 'rowDragAndDrop',
                args: [this]
            });
        }
        if (this.allowGrouping) {
            modules.push({
                member: 'group',
                args: [this, this.groupSettings, this.sortedColumns, this.serviceLocator]
            });
        }
        if (this.aggregates.length) {
            modules.push({ member: 'aggregate', args: [this, this.serviceLocator] });
        }
        if (this.isDetail()) {
            modules.push({
                member: 'detailRow',
                args: [this, this.serviceLocator]
            });
        }
        if (this.toolbar || this.toolbarTemplate) {
            modules.push({
                member: 'toolbar',
                args: [this, this.serviceLocator]
            });
        }
        if (this.enableVirtualization || this.enableColumnVirtualization) {
            modules.push({
                member: 'virtualscroll',
                args: [this, this.serviceLocator]
            });
        }
        if (this.getFrozenColumns() || this.frozenRows || this.frozenRightCount || this.frozenLeftCount) {
            modules.push({ member: 'freeze', args: [this, this.serviceLocator] });
        }
        if (this.isCommandColumn(this.columns)) {
            modules.push({
                member: 'commandColumn',
                args: [this, this.serviceLocator]
            });
        }
        if (this.editSettings.allowAdding || this.editSettings.allowDeleting || this.editSettings.allowEditing) {
            modules.push({
                member: 'edit',
                args: [this, this.serviceLocator]
            });
        }
        this.extendRequiredModules(modules);
        return modules;
    };
    Grid.prototype.extendRequiredModules = function (modules) {
        if (this.enableInfiniteScrolling) {
            modules.push({
                member: 'infiniteScroll',
                args: [this, this.serviceLocator]
            });
        }
        if (this.groupSettings.enableLazyLoading) {
            modules.push({
                member: 'lazyLoadGroup',
                args: [this, this.serviceLocator]
            });
        }
        if (this.contextMenuItems) {
            modules.push({
                member: 'contextMenu',
                args: [this, this.serviceLocator]
            });
        }
        if (this.showColumnMenu) {
            modules.push({
                member: 'columnMenu',
                args: [this, this.serviceLocator]
            });
        }
        if (this.showColumnChooser) {
            modules.push({
                member: 'columnChooser',
                args: [this, this.serviceLocator]
            });
        }
        if (this.isForeignKeyEnabled(this.columns)) {
            modules.push({ member: 'foreignKey', args: [this, this.serviceLocator] });
        }
        if (this.enableLogger) {
            modules.push({ member: 'logger', args: [this] });
        }
    };
    /**
     * For internal use only - Initialize the event handler;
     * @private
     */
    Grid.prototype.preRender = function () {
        this.serviceLocator = new ServiceLocator;
        this.initProperties();
        this.initializeServices();
    };
    Grid.prototype.initProperties = function () {
        /* tslint:disable */
        this.isInitial = true;
        this.sortedColumns = [];
        this.inViewIndexes = [];
        this.mediaCol = [];
        this.isInitialLoad = false;
        this.allowServerDataBinding = false;
        this.ignoreCollectionWatch = true;
        this.mergeCells = {};
        this.isEdit = false;
        this.checkAllRows = 'None';
        this.isCheckBoxSelection = false;
        this.isPersistSelection = false;
        this.componentRefresh = Component.prototype.refresh;
        this.filterOperators = {
            contains: 'contains', endsWith: 'endswith', equal: 'equal', greaterThan: 'greaterthan', greaterThanOrEqual: 'greaterthanorequal',
            lessThan: 'lessthan', lessThanOrEqual: 'lessthanorequal', notEqual: 'notequal', startsWith: 'startswith'
        };
        this.defaultLocale = {
            EmptyRecord: 'No records to display',
            True: 'true',
            False: 'false',
            InvalidFilterMessage: 'Invalid Filter Data',
            GroupDropArea: 'Drag a column header here to group its column',
            UnGroup: 'Click here to ungroup',
            UnGroupButton: 'Click here to ungroup',
            GroupDisable: 'Grouping is disabled for this column',
            FilterbarTitle: '\'s filter bar cell',
            EmptyDataSourceError: 'DataSource must not be empty at initial load since columns are generated from dataSource in AutoGenerate Column Grid',
            // Toolbar Items
            Add: 'Add',
            Edit: 'Edit',
            Cancel: 'Cancel',
            Update: 'Update',
            Delete: 'Delete',
            Print: 'Print',
            Pdfexport: 'PDF Export',
            Excelexport: 'Excel Export',
            Wordexport: 'Word Export',
            Csvexport: 'CSV Export',
            Search: 'Search',
            Columnchooser: 'Columns',
            Save: 'Save',
            Item: 'item',
            Items: 'items',
            EditOperationAlert: 'No records selected for edit operation',
            DeleteOperationAlert: 'No records selected for delete operation',
            SaveButton: 'Save',
            OKButton: 'OK',
            CancelButton: 'Cancel',
            EditFormTitle: 'Details of ',
            AddFormTitle: 'Add New Record',
            BatchSaveConfirm: 'Are you sure you want to save changes?',
            BatchSaveLostChanges: 'Unsaved changes will be lost. Are you sure you want to continue?',
            ConfirmDelete: 'Are you sure you want to Delete Record?',
            CancelEdit: 'Are you sure you want to Cancel the changes?',
            ChooseColumns: 'Choose Column',
            SearchColumns: 'search columns',
            Matchs: 'No matches found',
            FilterButton: 'Filter',
            ClearButton: 'Clear',
            StartsWith: 'Starts With',
            EndsWith: 'Ends With',
            Contains: 'Contains',
            Equal: 'Equal',
            NotEqual: 'Not Equal',
            LessThan: 'Less Than',
            LessThanOrEqual: 'Less Than Or Equal',
            GreaterThan: 'Greater Than',
            GreaterThanOrEqual: 'Greater Than Or Equal',
            ChooseDate: 'Choose a Date',
            EnterValue: 'Enter the value',
            Copy: 'Copy',
            Group: 'Group by this column',
            Ungroup: 'Ungroup by this column',
            autoFitAll: 'Autofit all columns',
            autoFit: 'Autofit this column',
            AutoFitAll: 'Autofit all columns',
            AutoFit: 'Autofit this column',
            Export: 'Export',
            FirstPage: 'First Page',
            LastPage: 'Last Page',
            PreviousPage: 'Previous Page',
            NextPage: 'Next Page',
            SortAscending: 'Sort Ascending',
            SortDescending: 'Sort Descending',
            EditRecord: 'Edit Record',
            DeleteRecord: 'Delete Record',
            FilterMenu: 'Filter',
            SelectAll: 'Select All',
            Blanks: 'Blanks',
            FilterTrue: 'True',
            FilterFalse: 'False',
            NoResult: 'No matches found',
            ClearFilter: 'Clear Filter',
            Clear: 'Clear',
            NumberFilter: 'Number Filters',
            TextFilter: 'Text Filters',
            DateFilter: 'Date Filters',
            DateTimeFilter: 'DateTime Filters',
            MatchCase: 'Match Case',
            Between: 'Between',
            CustomFilter: 'Custom Filter',
            CustomFilterPlaceHolder: 'Enter the value',
            CustomFilterDatePlaceHolder: 'Choose a date',
            AND: 'AND',
            OR: 'OR',
            ShowRowsWhere: 'Show rows where:',
            FilterMenuDialogARIA: 'Filter menu dialog',
            ExcelFilterDialogARIA: 'Excel filter dialog',
            DialogEditARIA: 'Edit dialog',
            ColumnChooserDialogARIA: 'Column chooser dialog',
            ColumnMenuDialogARIA: 'Column menu dialog',
            CustomFilterDialogARIA: 'Customer filter dialog',
            SortAtoZ: 'Sort A to Z',
            SortZtoA: 'Sort Z to A',
            SortByOldest: 'Sort by Oldest',
            SortByNewest: 'Sort by Newest',
            SortSmallestToLargest: 'Sort Smallest to Largest',
            SortLargestToSmallest: 'Sort Largest to Smallest',
            Sort: 'Sort'
        };
        this.keyConfigs = {
            downArrow: 'downarrow',
            upArrow: 'uparrow',
            rightArrow: 'rightarrow',
            leftArrow: 'leftarrow',
            shiftDown: 'shift+downarrow',
            shiftUp: 'shift+uparrow',
            shiftRight: 'shift+rightarrow',
            shiftLeft: 'shift+leftarrow',
            home: 'home',
            end: 'end',
            escape: 'escape',
            ctrlHome: 'ctrl+home',
            ctrlEnd: 'ctrl+end',
            pageUp: 'pageup',
            pageDown: 'pagedown',
            ctrlAltPageUp: 'ctrl+alt+pageup',
            ctrlAltPageDown: 'ctrl+alt+pagedown',
            altPageUp: 'alt+pageup',
            altPageDown: 'alt+pagedown',
            altDownArrow: 'alt+downarrow',
            altUpArrow: 'alt+uparrow',
            ctrlDownArrow: 'ctrl+downarrow',
            ctrlUpArrow: 'ctrl+uparrow',
            ctrlPlusA: 'ctrl+A',
            ctrlPlusP: 'ctrl+P',
            insert: 'insert',
            delete: 'delete',
            f2: 'f2',
            enter: 'enter',
            ctrlEnter: 'ctrl+enter',
            shiftEnter: 'shift+enter',
            tab: 'tab',
            shiftTab: 'shift+tab',
            space: 'space',
            ctrlPlusC: 'ctrl+C',
            ctrlShiftPlusH: 'ctrl+shift+H',
            ctrlSpace: 'ctrl+space',
            ctrlLeftArrow: 'ctrl+leftarrow',
            ctrlRightArrow: 'ctrl+rightarrow'
        };
        /* tslint:enable */
    };
    /**
     * For internal use only - To Initialize the component rendering.
     * @private
     */
    Grid.prototype.render = function () {
        this.log(['module_missing', 'promise_enabled', 'locale_missing', 'check_datasource_columns']);
        this.ariaService.setOptions(this.element, { role: 'grid' });
        createSpinner({ target: this.element }, this.createElement);
        this.renderModule = new Render(this, this.serviceLocator);
        this.searchModule = new Search(this);
        this.scrollModule = new Scroll(this);
        this.notify(events.initialLoad, {});
        if (this.getDataModule().dataManager.dataSource.offline === true || this.getDataModule().dataManager.dataSource.url === undefined) {
            this.isVirtualAdaptive = true;
        }
        this.trigger(events.load);
        prepareColumns(this.columns, this.enableColumnVirtualization, this);
        if (this.enablePersistence) {
            this.notify(events.columnsPrepared, {});
        }
        this.getMediaColumns();
        setColumnIndex(this.columns);
        this.checkLockColumns(this.columns);
        this.getColumns();
        this.processModel();
        this.gridRender();
        this.wireEvents();
        this.addListener();
        this.updateDefaultCursor();
        this.updateStackedFilter();
        this.showSpinner();
        this.notify(events.initialEnd, {});
    };
    /**
     * By default, grid shows the spinner for all its actions. You can use this method to show spinner at your needed time.
     */
    Grid.prototype.showSpinner = function () {
        showSpinner(this.element);
    };
    /**
     * Manually showed spinner needs to hide by `hideSpinnner`.
     */
    Grid.prototype.hideSpinner = function () {
        hideSpinner(this.element);
    };
    Grid.prototype.updateStackedFilter = function () {
        if (this.allowFiltering && this.filterSettings.type === 'FilterBar' &&
            this.getHeaderContent().getElementsByClassName('e-stackedheadercell').length) {
            this.getHeaderContent().classList.add('e-stackedfilter');
        }
        else {
            this.getHeaderContent().classList.remove('e-stackedfilter');
        }
    };
    Grid.prototype.getMediaColumns = function () {
        if (!this.enableColumnVirtualization) {
            var gcol = this.getColumns();
            this.getShowHideService = this.serviceLocator.getService('showHideService');
            if (!isNullOrUndefined(gcol)) {
                for (var index = 0; index < gcol.length; index++) {
                    if (!isNullOrUndefined(gcol[index].hideAtMedia) && (isNullOrUndefined(gcol[index].visible) || gcol[index].visible)) {
                        this.pushMediaColumn(gcol[index], index);
                    }
                }
            }
        }
    };
    Grid.prototype.pushMediaColumn = function (col, index) {
        this.mediaCol.push(col);
        this.media[col.uid] = window.matchMedia(col.hideAtMedia);
        this.mediaQueryUpdate(index, this.media[col.uid]);
        this.mediaBindInstance[index] = this.mediaQueryUpdate.bind(this, index);
        this.media[col.uid].addListener(this.mediaBindInstance[index]);
    };
    /**
     * @hidden
     */
    Grid.prototype.updateMediaColumns = function (col) {
        if (!this.enableColumnVirtualization) {
            var index = this.getColumnIndexByUid(col.uid);
            for (var i = 0; i < this.mediaCol.length; i++) {
                if (col.uid === this.mediaCol[i].uid) {
                    this.mediaCol.splice(i, 1);
                    return;
                }
            }
            this.pushMediaColumn(col, index);
        }
    };
    /**
     * @hidden
     */
    Grid.prototype.mediaQueryUpdate = function (columnIndex, e) {
        var col = this.getColumns()[columnIndex];
        if (this.mediaCol.some(function (mediaColumn) { return mediaColumn.uid === col.uid; })) {
            col.visible = e.matches;
            if (this.isInitialLoad) {
                this.invokedFromMedia = true;
                if (col.visible) {
                    this.showHider.show(col.headerText, 'headerText');
                }
                else {
                    this.showHider.hide(col.headerText, 'headerText');
                }
            }
        }
    };
    Grid.prototype.refreshMediaCol = function () {
        this.isInitialLoad = true;
        var footerContent = this.element.querySelector('.' + literals.gridFooter);
        if (this.aggregates.length && this.element.scrollHeight > this.height && footerContent) {
            addClass([footerContent], ['e-footerpadding']);
        }
        var checkboxColumn = this.getColumns().filter(function (col) { return col.type === 'checkbox'; });
        if (checkboxColumn.length && this.selectionSettings.checkboxMode === 'ResetOnRowClick') {
            this.isCheckBoxSelection = false;
        }
        if (this.rowRenderingMode === 'Vertical') {
            if (this.enableHover) {
                this.setProperties({ enableAdaptiveUI: true, enableHover: false }, true);
                removeClass([this.element], 'e-gridhover');
            }
        }
    };
    Grid.prototype.removeMediaListener = function () {
        for (var i = 0; i < this.mediaCol.length; i++) {
            this.media[this.mediaCol[i].uid].removeListener(this.mediaBindInstance[this.mediaCol[i].index]);
        }
    };
    /**
     * For internal use only - Initialize the event handler
     * @private
     */
    Grid.prototype.eventInitializer = function () {
        //eventInitializer
    };
    /**
     * Destroys the component (detaches/removes all event handlers, attributes, classes, and empties the component element).
     * @method destroy
     * @return {void}
     */
    Grid.prototype.destroy = function () {
        var gridElement = this.element;
        if (!gridElement) {
            return;
        }
        var hasGridChild = gridElement.querySelector('.' + literals.gridHeader) &&
            gridElement.querySelector('.' + literals.gridContent) ? true : false;
        if (hasGridChild) {
            this.unwireEvents();
        }
        this.removeListener();
        this.removeMediaListener();
        this.notify(events.destroy, {});
        this.destroyDependentModules();
        if (hasGridChild) {
            _super.prototype.destroy.call(this);
        }
        this.toolTipObj.destroy();
        var modules = ['renderModule', 'headerModule', 'contentModule', 'valueFormatterService',
            'serviceLocator', 'ariaService', 'keyboardModule', 'widthService', 'searchModule', 'showHider',
            'scrollModule', 'printModule', 'clipboardModule', 'focusModule'];
        for (var i = 0; i < modules.length; i++) {
            if (this[modules[i]]) {
                this[modules[i]] = null;
            }
        }
        this.element.innerHTML = '';
        classList(this.element, [], ['e-rtl', 'e-gridhover', 'e-responsive', 'e-default', 'e-device', 'e-grid-min-height']);
        if (this.isAngular && !this.isFreezeRefresh) {
            this.element = null;
        }
        this.isFreezeRefresh = false;
    };
    Grid.prototype.destroyDependentModules = function () {
        var gridElement = this.element;
        if (!gridElement || (!gridElement.querySelector('.' + literals.gridHeader) && !gridElement.querySelector('.' + literals.gridContent))) {
            return;
        }
        this.scrollModule.destroy();
        this.keyboardModule.destroy();
        this.focusModule.destroy();
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    Grid.prototype.getModuleName = function () {
        return 'grid';
    };
    Grid.prototype.enableBoxSelection = function () {
        if (this.enableAutoFill) {
            this.selectionSettings.cellSelectionMode = 'BoxWithBorder';
            this.element.classList.add('e-afenabled');
        }
        else {
            this.element.classList.remove('e-afenabled');
        }
    };
    /**
     * Called internally if any of the property value changed.
     * @hidden
     */
    /* tslint:disable-next-line:max-line-length */
    // tslint:disable-next-line:max-func-body-length
    Grid.prototype.onPropertyChanged = function (newProp, oldProp) {
        var requireRefresh = false;
        var requireGridRefresh = false;
        var freezeRefresh = false;
        var checkCursor;
        var args = { requestType: 'refresh' };
        if (this.isDestroyed) {
            return;
        }
        this.log('module_missing');
        if (this.isEllipsisTooltip()) {
            this.toolTipObj.close();
        }
        var properties = Object.keys(newProp);
        if (properties.indexOf('columns') > -1) {
            this.updateColumnObject();
            requireGridRefresh = true;
        }
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var prop = properties_1[_i];
            switch (prop) {
                case 'allowPaging':
                    this.notify(events.uiUpdate, { module: 'pager', enable: this.allowPaging });
                    requireRefresh = true;
                    break;
                case 'pageSettings':
                    if (this.pageTemplateChange) {
                        this.pageTemplateChange = false;
                        this.notify(events.inBoundModelChanged, { module: 'pager', properties: newProp.pageSettings });
                        break;
                    }
                    this.notify(events.inBoundModelChanged, { module: 'pager', properties: newProp.pageSettings });
                    if (isNullOrUndefined(newProp.pageSettings.currentPage) && isNullOrUndefined(newProp.pageSettings.pageSize)
                        && isNullOrUndefined(newProp.pageSettings.totalRecordsCount)
                        || !isNullOrUndefined(oldProp.pageSettings) &&
                            ((newProp.pageSettings.currentPage !== oldProp.pageSettings.currentPage)
                                && !this.enableColumnVirtualization && !this.enableVirtualization
                                && this.pageSettings.totalRecordsCount <= this.pageSettings.pageSize)) {
                        requireRefresh = true;
                    }
                    break;
                case 'allowSorting':
                    this.notify(events.uiUpdate, { module: 'sort', enable: this.allowSorting });
                    requireRefresh = true;
                    checkCursor = true;
                    break;
                case 'allowFiltering':
                    this.updateStackedFilter();
                    this.notify(events.uiUpdate, { module: 'filter', enable: this.allowFiltering });
                    requireRefresh = true;
                    if (this.filterSettings.type !== 'FilterBar') {
                        this.refreshHeader();
                    }
                    break;
                case 'height':
                case 'width':
                    this.notify(events.uiUpdate, { module: 'scroll', properties: { width: newProp.width, height: newProp.height } });
                    break;
                case 'allowReordering':
                    this.headerModule.refreshUI();
                    checkCursor = true;
                    break;
                case 'allowRowDragAndDrop':
                    this.notify(events.uiUpdate, { module: 'rowDragAndDrop', enable: this.allowRowDragAndDrop });
                    this.renderModule.refresh();
                    this.headerModule.refreshUI();
                    break;
                case 'allowSelection':
                    this.notify(events.uiUpdate, { module: 'selection', enable: this.allowSelection });
                    break;
                case 'enableAutoFill':
                    if (this.selectionModule) {
                        this.enableBoxSelection();
                        this.selectionModule.updateAutoFillPosition();
                    }
                    break;
                case 'rowTemplate':
                    this.rowTemplateFn = templateCompiler(this.rowTemplate);
                    requireRefresh = true;
                    break;
                case 'detailTemplate':
                    this.detailTemplateFn = templateCompiler(this.detailTemplate);
                    requireRefresh = true;
                    break;
                case 'allowGrouping':
                    this.notify(events.uiUpdate, { module: 'group', enable: this.allowGrouping });
                    this.headerModule.refreshUI();
                    requireRefresh = true;
                    checkCursor = true;
                    break;
                case 'enableInfiniteScrolling':
                case 'childGrid':
                    requireRefresh = true;
                    break;
                case 'toolbar':
                    this.notify(events.uiUpdate, { module: 'toolbar' });
                    break;
                case 'groupSettings':
                    this.notify(events.inBoundModelChanged, {
                        module: 'group', properties: newProp.groupSettings,
                        oldProperties: oldProp.groupSettings
                    });
                    break;
                case 'aggregates':
                    if (!this.aggregates.length && this.allowGrouping && this.groupSettings.columns.length) {
                        requireRefresh = true;
                    }
                    this.notify(events.uiUpdate, { module: 'aggregate', properties: newProp });
                    break;
                case 'frozenColumns':
                case 'frozenRows':
                case 'enableVirtualization':
                case 'currencyCode':
                case 'locale':
                    this.log('frozen_rows_columns');
                    freezeRefresh = true;
                    requireGridRefresh = true;
                    break;
                case 'query':
                    if (!this.getDataModule().isQueryInvokedFromData) {
                        requireRefresh = true;
                    }
                    this.getDataModule().isQueryInvokedFromData = false;
                    break;
                default:
                    this.extendedPropertyChange(prop, newProp, requireGridRefresh);
            }
        }
        if (checkCursor) {
            this.updateDefaultCursor();
        }
        if (requireGridRefresh) {
            if (freezeRefresh || this.getFrozenColumns() || this.frozenRows) {
                if (!(isBlazor() && this.isServerRendered)) {
                    this.freezeRefresh();
                }
            }
            else {
                this.refresh();
            }
        }
        else if (requireRefresh) {
            this.notify(events.modelChanged, args);
            requireRefresh = false;
            this.maintainSelection(newProp.selectedRowIndex);
        }
    };
    /* tslint:disable */
    Grid.prototype.extendedPropertyChange = function (prop, newProp, requireGridRefresh) {
        switch (prop) {
            case 'enableRtl':
                this.updateRTL();
                if (this.allowPaging) {
                    this.element.querySelector('.e-gridpager').ej2_instances[0].enableRtl = newProp.enableRtl;
                    this.element.querySelector('.e-gridpager').ej2_instances[0].dataBind();
                }
                if (this.height !== 'auto') {
                    this.scrollModule.removePadding(!newProp.enableRtl);
                    this.scrollModule.setPadding();
                }
                if (this.toolbar && this.toolbarModule) {
                    this.toolbarModule.getToolbar().ej2_instances[0].enableRtl = newProp.enableRtl;
                    this.toolbarModule.getToolbar().ej2_instances[0].dataBind();
                }
                if (this.contextMenuItems && this.contextMenuModule) {
                    this.contextMenuModule.getContextMenu().ej2_instances[0].enableRtl = newProp.enableRtl;
                    this.contextMenuModule.getContextMenu().ej2_instances[0].dataBind();
                }
                if (this.showColumnMenu && this.columnMenuModule) {
                    this.columnMenuModule.getColumnMenu().ej2_instances[0].enableRtl = newProp.enableRtl;
                    this.columnMenuModule.getColumnMenu().ej2_instances[0].dataBind();
                }
                if (this.filterSettings.type === 'FilterBar' && this.filterSettings.showFilterBarOperator) {
                    this.refreshHeader();
                }
                this.notify(events.rtlUpdated, {});
                break;
            case 'enableAltRow':
                this.renderModule.refresh();
                break;
            case 'allowResizing':
                this.headerModule.refreshUI();
                this.updateResizeLines();
                break;
            case 'rowHeight':
                if (this.rowHeight) {
                    addClass([this.element], 'e-grid-min-height');
                }
                else {
                    removeClass([this.element], 'e-grid-min-height');
                }
                this.renderModule.refresh();
                this.headerModule.refreshUI();
                break;
            case 'gridLines':
                this.updateGridLines();
                break;
            case 'showColumnMenu':
                this.headerModule.refreshUI();
                this.notify(events.uiUpdate, { module: 'columnMenu', enable: true });
                break;
            case 'columnMenuItems':
                this.notify(events.uiUpdate, { module: 'columnMenu', enable: this.columnMenuItems });
                break;
            case 'contextMenuItems':
                this.notify(events.uiUpdate, { module: 'contextMenu', enable: this.contextMenuItems });
                break;
            case 'showColumnChooser':
                this.notify(events.uiUpdate, { module: 'columnChooser', enable: this.showColumnChooser });
                break;
            case 'filterSettings':
                this.updateStackedFilter();
                this.notify(events.inBoundModelChanged, { module: 'filter', properties: newProp.filterSettings });
                break;
            case 'searchSettings':
                this.notify(events.inBoundModelChanged, { module: 'search', properties: newProp.searchSettings });
                break;
            case 'sortSettings':
                this.notify(events.inBoundModelChanged, { module: 'sort' });
                break;
            case 'selectionSettings':
                this.notify(events.inBoundModelChanged, { module: 'selection', properties: newProp.selectionSettings });
                break;
            case 'editSettings':
                this.notify(events.inBoundModelChanged, { module: 'edit', properties: newProp.editSettings });
                break;
            case 'allowTextWrap':
            case 'textWrapSettings':
                if (this.allowTextWrap) {
                    this.applyTextWrap();
                }
                else {
                    this.removeTextWrap();
                }
                this.notify(events.freezeRender, { case: 'textwrap', isModeChg: (prop === 'textWrapSettings') });
                break;
            case 'dataSource':
                var pending_1 = this.getDataModule().getState();
                if (Object.getPrototypeOf(newProp).deepWatch) {
                    var pKeyField = this.getPrimaryKeyFieldNames()[0];
                    for (var i = 0, props = Object.keys(newProp.dataSource); i < props.length; i++) {
                        this.setRowData(getValue(pKeyField, this.dataSource[props[i]]), this.dataSource[props[i]]);
                    }
                }
                else if (pending_1.isPending) {
                    var gResult = !isNullOrUndefined(this.dataSource) ? this.dataSource.result : [];
                    var names = (pending_1.group || []);
                    for (var i = 0; i < names.length; i++) {
                        gResult = DataUtil.group(gResult, names[i], pending_1.aggregates || []);
                    }
                    this.dataSource = {
                        result: gResult, count: this.dataSource.count,
                        aggregates: this.dataSource.aggregates
                    };
                    this.getDataModule().setState({});
                    pending_1.resolver(this.dataSource);
                }
                else {
                    this.getDataModule().setState({ isDataChanged: false });
                    this.notify(events.dataSourceModified, {});
                    if (!requireGridRefresh) {
                        this.renderModule.refresh();
                        if (this.isCheckBoxSelection) {
                            this.notify(events.beforeRefreshOnDataChange, {});
                        }
                    }
                }
                this.scrollRefresh();
                break;
            case 'enableHover':
                var action = newProp.enableHover ? addClass : removeClass;
                action([this.element], 'e-gridhover');
                break;
            case 'selectedRowIndex':
                if (!this.isSelectedRowIndexUpdating) {
                    this.selectRow(newProp.selectedRowIndex);
                }
                this.isSelectedRowIndexUpdating = false;
                break;
            case 'resizeSettings':
                this.widthService.setWidthToTable();
                break;
            case 'enableAdaptiveUI':
                this.notify(events.setFullScreenDialog, {});
                break;
            case 'rowRenderingMode':
                this.enableVerticalRendering();
                this.notify(events.rowModeChange, {});
                this.refresh();
                break;
        }
    };
    Grid.prototype.maintainSelection = function (index) {
        var _this = this;
        if (index !== -1) {
            var fn_1 = function () {
                _this.selectRow(index);
                _this.off(events.contentReady, fn_1);
            };
            this.on(events.contentReady, fn_1, this);
        }
    };
    /**
     * @private
     */
    Grid.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
        var filterSettings = 'filterSettings';
        if (prop[filterSettings] && this.filterModule && muteOnChange) {
            this.filterModule.refreshFilter();
        }
    };
    /**
     * @hidden
     */
    Grid.prototype.setTablesCount = function () {
        var frozenCols = this.getFrozenColumns();
        var frozenLeft = this.getFrozenLeftColumnsCount();
        var frozenRight = this.getFrozenRightColumnsCount();
        if (frozenCols && !frozenLeft && !frozenRight) {
            this.tablesCount = 2;
        }
        else if (!frozenCols && (frozenLeft || frozenRight)) {
            if ((frozenLeft && !frozenRight) || (frozenRight && !frozenLeft)) {
                this.tablesCount = 2;
            }
            else if (frozenLeft && frozenRight) {
                this.tablesCount = 3;
            }
        }
    };
    /**
     * @hidden
     */
    Grid.prototype.getTablesCount = function () {
        return this.tablesCount;
    };
    /**
     * @hidden
     */
    Grid.prototype.updateDefaultCursor = function () {
        var headerCells = [].slice.call(this.getHeaderContent().querySelectorAll('.e-headercell:not(.e-stackedheadercell)'));
        var stdHdrCell = [].slice.call(this.getHeaderContent().getElementsByClassName('e-stackedheadercell'));
        var cols = this.getColumns();
        if (this.enableColumnVirtualization && this.getFrozenColumns()) {
            var cells = this.contentModule.getHeaderCells();
            headerCells = cells.length ? cells : headerCells;
        }
        for (var i = 0; i < headerCells.length; i++) {
            var cell = headerCells[i];
            if (this.allowGrouping || this.allowReordering || this.allowSorting) {
                if (!cols[i].allowReordering || !cols[i].allowSorting || !cols[i].allowGrouping) {
                    cell.classList.add('e-defaultcursor');
                }
                else {
                    cell.classList.add('e-mousepointer');
                }
            }
        }
        for (var count = 0; count < stdHdrCell.length; count++) {
            if (this.allowReordering) {
                stdHdrCell[count].classList.add('e-mousepointer');
            }
        }
    };
    Grid.prototype.updateColumnModel = function (columns) {
        for (var i = 0, len = columns.length; i < len; i++) {
            if (columns[i].columns) {
                this.updateColumnModel(columns[i].columns);
            }
            else {
                this.columnModel.push(columns[i]);
            }
        }
        this.updateColumnLevelFrozen();
        this.updateFrozenColumns();
        this.updateLockableColumns();
    };
    Grid.prototype.updateColumnLevelFrozen = function () {
        var cols = this.columnModel;
        var leftCols = [];
        var rightCols = [];
        var movableCols = [];
        if (this.frozenLeftCount || this.frozenRightCount) {
            for (var i = 0, len = cols.length; i < len; i++) {
                /* tslint:disable-next-line:no-any */
                var col = cols[i];
                if (col.freeze === 'Left') {
                    col.freezeTable = literals.frozenLeft;
                    leftCols.push(col);
                }
                else if (col.freeze === 'Right') {
                    col.freezeTable = literals.frozenRight;
                    rightCols.push(col);
                }
                else {
                    col.freezeTable = 'movable';
                    movableCols.push(col);
                }
            }
            this.columnModel = leftCols.concat(movableCols).concat(rightCols);
        }
    };
    Grid.prototype.updateFrozenColumns = function () {
        if (this.frozenLeftCount || this.frozenRightCount) {
            return;
        }
        var cols = this.columnModel;
        var directFrozenCount = this.frozenColumns;
        var totalFrozenCount = this.getFrozenColumns();
        var count = 0;
        for (var i = 0, len = cols.length; i < len; i++) {
            /* tslint:disable-next-line:no-any */
            var col = cols[i];
            if (directFrozenCount) {
                if (i < directFrozenCount) {
                    col.freezeTable = literals.frozenLeft;
                }
                else {
                    col.freezeTable = 'movable';
                }
            }
            if (col.isFrozen && i >= directFrozenCount) {
                col.freezeTable = literals.frozenLeft;
                cols.splice(this.frozenColumns + count, 0, cols.splice(i, 1)[0]);
                count++;
            }
            else if (totalFrozenCount && !directFrozenCount) {
                col.freezeTable = 'movable';
            }
        }
    };
    Grid.prototype.getFrozenLeftCount = function () {
        return this.getFrozenColumns() || this.getFrozenLeftColumnsCount();
    };
    Grid.prototype.isFrozenGrid = function () {
        return this.getFrozenColumns() !== 0 || this.getFrozenLeftColumnsCount() !== 0 || this.getFrozenRightColumnsCount() !== 0;
    };
    Grid.prototype.getFrozenMode = function () {
        return this.frozenName;
    };
    Grid.prototype.updateLockableColumns = function () {
        var cols = this.columnModel;
        var frozenCount = 0;
        var movableCount = 0;
        var frozenColumns = this.getFrozenColumns();
        for (var i = 0; i < cols.length; i++) {
            if (cols[i].lockColumn) {
                if (i < frozenColumns) {
                    cols.splice(frozenCount, 0, cols.splice(i, 1)[0]);
                    frozenCount++;
                }
                else {
                    cols.splice(frozenColumns + movableCount, 0, cols.splice(i, 1)[0]);
                    movableCount++;
                }
            }
        }
    };
    Grid.prototype.checkLockColumns = function (cols) {
        for (var i = 0; i < cols.length; i++) {
            if (cols[i].columns) {
                this.checkLockColumns(cols[i].columns);
            }
            else if (cols[i].lockColumn) {
                this.lockcolPositionCount++;
            }
        }
    };
    /**
     * Gets the columns from the Grid.
     * @return {Column[]}
     * @blazorType List<GridColumn>
     */
    Grid.prototype.getColumns = function (isRefresh) {
        var _this = this;
        var inview = this.inViewIndexes.map(function (v) { return v - _this.groupSettings.columns.length; }).filter(function (v) { return v > -1; });
        var vLen = inview.length;
        if (!this.enableColumnVirtualization || isNullOrUndefined(this.columnModel) || this.columnModel.length === 0 || isRefresh) {
            this.columnModel = [];
            this.updateColumnModel(this.columns);
        }
        var columns = vLen === 0 ? this.columnModel :
            this.columnModel.slice(inview[0], inview[vLen - 1] + 1);
        if (this.contentModule && this.enableColumnVirtualization && this.isFrozenGrid() && inview.length
            && inview[0] > 0) {
            var frozenCols = this.contentModule.ensureFrozenCols(columns);
            columns = frozenCols;
        }
        return columns;
    };
    /**
     * @private
     */
    Grid.prototype.getStackedHeaderColumnByHeaderText = function (stackedHeader, col) {
        for (var i = 0; i < col.length; i++) {
            var individualColumn = col[i];
            if (individualColumn.field === stackedHeader || individualColumn.headerText === stackedHeader) {
                this.stackedColumn = individualColumn;
                break;
            }
            else if (individualColumn.columns) {
                this.getStackedHeaderColumnByHeaderText(stackedHeader, individualColumn.columns);
            }
        }
        return this.stackedColumn;
    };
    /**
     * @private
     */
    Grid.prototype.getColumnIndexesInView = function () {
        return this.inViewIndexes;
    };
    /**
     * @private
     */
    Grid.prototype.getQuery = function () {
        return this.query;
    };
    /**
     * @private
     */
    Grid.prototype.getLocaleConstants = function () {
        return this.defaultLocale;
    };
    /**
     * @private
     */
    Grid.prototype.setColumnIndexesInView = function (indexes) {
        this.inViewIndexes = indexes;
    };
    /**
     * Gets the visible columns from the Grid.
     * @return {Column[]}
     * @blazorType List<GridColumn>
     */
    Grid.prototype.getVisibleColumns = function () {
        var cols = [];
        for (var _i = 0, _a = this.columnModel; _i < _a.length; _i++) {
            var col = _a[_i];
            if (col.visible) {
                cols.push(col);
            }
        }
        return cols;
    };
    /**
     * Gets the header div of the Grid.
     * @return {Element}
     */
    Grid.prototype.getHeaderContent = function () {
        return this.headerModule.getPanel();
    };
    /**
     * Sets the header div of the Grid to replace the old header.
     * @param  {Element} element - Specifies the Grid header.
     * @return {void}
     */
    Grid.prototype.setGridHeaderContent = function (element) {
        this.headerModule.setPanel(element);
    };
    /**
     * Gets the content table of the Grid.
     * @return {Element}
     */
    Grid.prototype.getContentTable = function () {
        return this.contentModule.getTable();
    };
    /**
     * Sets the content table of the Grid to replace the old content table.
     * @param  {Element} element - Specifies the Grid content table.
     * @return {void}
     */
    Grid.prototype.setGridContentTable = function (element) {
        this.contentModule.setTable(element);
    };
    /**
     * Gets the content div of the Grid.
     * @return {Element}
     */
    Grid.prototype.getContent = function () {
        return this.contentModule.getPanel();
    };
    /**
     * Sets the content div of the Grid to replace the old Grid content.
     * @param  {Element} element - Specifies the Grid content.
     * @return {void}
     */
    Grid.prototype.setGridContent = function (element) {
        this.contentModule.setPanel(element);
    };
    /**
     * Gets the header table element of the Grid.
     * @return {Element}
     */
    Grid.prototype.getHeaderTable = function () {
        return this.headerModule.getTable();
    };
    /**
     * Sets the header table of the Grid to replace the old one.
     * @param  {Element} element - Specifies the Grid header table.
     * @return {void}
     */
    Grid.prototype.setGridHeaderTable = function (element) {
        this.headerModule.setTable(element);
    };
    /**
     * Gets the footer div of the Grid.
     * @return {Element}
     */
    Grid.prototype.getFooterContent = function () {
        this.footerElement = this.element.getElementsByClassName(literals.gridFooter)[0];
        return this.footerElement;
    };
    /**
     * Gets the footer table element of the Grid.
     * @return {Element}
     */
    Grid.prototype.getFooterContentTable = function () {
        this.footerElement = this.element.getElementsByClassName(literals.gridFooter)[0];
        return this.footerElement.firstChild.firstChild;
    };
    /**
     * Gets the pager of the Grid.
     * @return {Element}
     */
    Grid.prototype.getPager = function () {
        return this.gridPager; //get element from pager
    };
    /**
     * Sets the pager of the Grid to replace the old pager.
     * @param  {Element} element - Specifies the Grid pager.
     * @return {void}
     */
    Grid.prototype.setGridPager = function (element) {
        this.gridPager = element;
    };
    /**
     * Gets a row by index.
     * @param  {number} index - Specifies the row index.
     * @return {Element}
     */
    Grid.prototype.getRowByIndex = function (index) {
        return this.contentModule.getRowByIndex(index);
    };
    /**
     * Gets a movable tables row by index.
     * @param  {number} index - Specifies the row index.
     * @return {Element}
     */
    Grid.prototype.getMovableRowByIndex = function (index) {
        return this.contentModule.getMovableRowByIndex(index);
    };
    /**
     * Gets a frozen tables row by index.
     * @param  {number} index - Specifies the row index.
     * @return {Element}
     */
    Grid.prototype.getFrozenRowByIndex = function (index) {
        return this.getFrozenDataRows()[index];
    };
    /**
     * Gets all the data rows of the Grid.
     * @return {Element[]}
     */
    Grid.prototype.getRows = function () {
        return this.contentModule.getRowElements();
    };
    /**
    * Gets a frozen right tables row element by index.
    * @param  {number} index - Specifies the row index.
    * @return {Element}
    */
    Grid.prototype.getFrozenRightRowByIndex = function (index) {
        return this.contentModule.getFrozenRightRowByIndex(index);
    };
    /**
     * Get a row information based on cell
     * @param {Element}
     * @return RowInfo
     */
    Grid.prototype.getRowInfo = function (target) {
        var ele = target;
        var args = { target: target };
        if (!isNullOrUndefined(target) && isNullOrUndefined(parentsUntil(ele, 'e-detailrowcollapse')
            && isNullOrUndefined(parentsUntil(ele, 'e-recordplusexpand')))) {
            var cell = closest(ele, '.' + literals.rowCell);
            if (!cell) {
                var row = closest(ele, '.' + literals.row);
                if (!isNullOrUndefined(row)) {
                    var rowObj = this.getRowObjectFromUID(row.getAttribute('data-uid'));
                    var rowIndex = parseInt(row.getAttribute(literals.ariaRowIndex), 10);
                    args = { row: row, rowData: rowObj.data, rowIndex: rowIndex };
                }
                return args;
            }
            var cellIndex = parseInt(cell.getAttribute(literals.ariaColIndex), 10);
            if (!isNullOrUndefined(cell) && !isNaN(cellIndex)) {
                var row_1 = closest(cell, '.' + literals.row);
                var rowIndex = parseInt(row_1.getAttribute(literals.ariaRowIndex), 10);
                var frzCols = this.getFrozenColumns();
                var tableName = this.columnModel[cellIndex].getFreezeTableName();
                var rows = this.contentModule.getRows();
                var index = cellIndex + this.getIndentCount();
                if (this.isFrozenGrid()) {
                    if (tableName === literals.frozenLeft) {
                        rows = this.contentModule.getRows();
                    }
                    else if (tableName === 'movable') {
                        index = cellIndex - frzCols - this.frozenLeftCount;
                        rows = this.contentModule.getMovableRows();
                    }
                    else if (tableName === literals.frozenRight) {
                        index = cellIndex - (this.frozenLeftCount + this.movableCount);
                        rows = this.contentModule.getFrozenRightRows();
                    }
                }
                var rowsObject = rows.filter(function (r) { return r.uid === row_1.getAttribute('data-uid'); });
                var rowData = {};
                var column = void 0;
                if (Object.keys(rowsObject).length) {
                    rowData = rowsObject[0].data;
                    column = rowsObject[0].cells[index].column;
                }
                args = { cell: cell, cellIndex: cellIndex, row: row_1, rowIndex: rowIndex, rowData: rowData, column: column, target: target };
            }
        }
        return args;
    };
    /**
     * Gets the Grid's movable content rows from frozen grid.
     * @return {Element[]}
     */
    Grid.prototype.getMovableRows = function () {
        return this.contentModule.getMovableRowElements();
    };
    /**
     * Gets the Grid's frozen right content rows from frozen grid.
     * @return {Element[]}
     */
    Grid.prototype.getFrozenRightRows = function () {
        return this.contentModule.getFrozenRightRowElements();
    };
    /**
     * Gets all the Grid's data rows.
     * @return {Element[]}
     */
    Grid.prototype.getDataRows = function () {
        return this.getAllDataRows();
    };
    /**
     * @hidden
     */
    Grid.prototype.getAllDataRows = function (includeAdd) {
        if (isNullOrUndefined(this.getContentTable().querySelector(literals.tbody))) {
            return [];
        }
        var tbody = this.isFrozenGrid() ? this.getFrozenLeftContentTbody() : this.getContentTable().querySelector(literals.tbody);
        var rows = [].slice.call(tbody.children);
        if (this.frozenRows) {
            var hdrTbody = this.isFrozenGrid() ? this.getHeaderContent().querySelector('.' + literals.frozenHeader).querySelector(literals.tbody)
                : this.getHeaderTable().querySelector(literals.tbody);
            var freezeRows = [].slice.call(hdrTbody.children);
            rows = this.addMovableRows(freezeRows, rows);
        }
        var dataRows = this.generateDataRows(rows, includeAdd);
        return dataRows;
    };
    /**
     * @hidden
     */
    Grid.prototype.addMovableRows = function (fRows, mrows) {
        for (var i = 0, len = mrows.length; i < len; i++) {
            fRows.push(mrows[i]);
        }
        return fRows;
    };
    Grid.prototype.generateDataRows = function (rows, includAdd) {
        var dRows = [];
        for (var i = 0, len = rows.length; i < len; i++) {
            if (rows[i].classList.contains(literals.row) && (!rows[i].classList.contains('e-hiddenrow') || includAdd)) {
                if (this.isCollapseStateEnabled()) {
                    dRows[parseInt(rows[i].getAttribute("aria-rowindex"))] = rows[i];
                }
                else {
                    dRows.push(rows[i]);
                }
            }
        }
        return dRows;
    };
    /**
     * Gets all the Grid's movable table data rows.
     * @return {Element[]}
     */
    Grid.prototype.getMovableDataRows = function () {
        return this.getAllMovableDataRows();
    };
    /**
     * @hidden
     */
    Grid.prototype.getAllMovableDataRows = function (includeAdd) {
        if (!this.isFrozenGrid()) {
            return [];
        }
        var rows = [].slice.call(this.getContent().querySelector('.' + literals.movableContent).querySelector(literals.tbody).children);
        if (this.frozenRows) {
            var freezeRows = [].slice.call(this.getHeaderContent().querySelector('.' + literals.movableHeader).querySelector(literals.tbody).children);
            rows = this.addMovableRows(freezeRows, rows);
        }
        var dataRows = this.generateDataRows(rows, includeAdd);
        return dataRows;
    };
    /**
     * Gets all the Grid's frozen table data rows.
     * @return {Element[]}
     */
    Grid.prototype.getFrozenDataRows = function () {
        return this.getAllFrozenDataRows();
    };
    /**
     * @hidden
     */
    Grid.prototype.getAllFrozenDataRows = function (includeAdd) {
        var rows = [].slice.call(this.getContent().querySelector('.' + literals.frozenContent).querySelector(literals.tbody).children);
        if (this.frozenRows) {
            var freezeRows = [].slice.call(this.getHeaderContent().querySelector('.' + literals.frozenHeader).querySelector(literals.tbody).children);
            rows = this.addMovableRows(freezeRows, rows);
        }
        var dataRows = this.generateDataRows(rows, includeAdd);
        return dataRows;
    };
    /**
     * Gets all the Grid's frozen right table data rows.
     * @return {Element[]}
     */
    Grid.prototype.getFrozenRightDataRows = function () {
        return this.getAllFrozenRightDataRows();
    };
    /**
     * @hidden
     */
    Grid.prototype.getAllFrozenRightDataRows = function (includeAdd) {
        if (this.getFrozenMode() !== 'Right' && this.getFrozenMode() !== 'Left-Right') {
            return [];
        }
        var rows = [].slice.call(this.getContent().querySelector('.e-frozen-right-content').querySelector(literals.tbody).children);
        if (this.frozenRows) {
            var freezeRows = [].slice.call(this.getHeaderContent().querySelector('.e-frozen-right-header').querySelector(literals.tbody).children);
            rows = this.addMovableRows(freezeRows, rows);
        }
        var dataRows = this.generateDataRows(rows, includeAdd);
        return dataRows;
    };
    /**
     * Updates particular cell value based on the given primary key value.
     * > Primary key column must be specified using `columns.isPrimaryKey` property.
     * @param {string| number} key - Specifies the PrimaryKey value of dataSource.
     * @param {string } field - Specifies the field name which you want to update.
     * @param {string | number | boolean | Date} value - To update new value for the particular cell.
     */
    Grid.prototype.setCellValue = function (key, field, value) {
        var cells = 'cells';
        var rowData = 'data';
        var rowIdx = 'index';
        var rowuID = 'uid';
        var fieldIdx;
        var col;
        var tr;
        var mTr;
        var pkName = this.getPrimaryKeyFieldNames()[0];
        var cell = new CellRenderer(this, this.serviceLocator);
        var selectedRow = {};
        var movableSelectedRow = {};
        var rowObjects = this.contentModule.getRows();
        var movableRowObjects = this.contentModule.getMovableRows();
        fieldIdx = this.getColumnIndexByField(field);
        if (this.groupSettings.columns.length) {
            fieldIdx = fieldIdx + this.groupSettings.columns.length;
        }
        if (this.childGrid || this.detailTemplate) {
            fieldIdx++;
        }
        if (this.isRowDragable()) {
            fieldIdx++;
        }
        col = this.getColumnByField(field);
        selectedRow = rowObjects.filter(function (r) {
            return getValue(pkName, r.data) === key;
        })[0];
        movableSelectedRow = movableRowObjects.filter(function (r) {
            return getValue(pkName, r.data) === key;
        })[0];
        tr = !isNullOrUndefined(selectedRow) ? this.element.querySelector('[data-uid=' + selectedRow[rowuID] + ']') : null;
        mTr = !isNullOrUndefined(movableSelectedRow) ? this.element.querySelector('[data-uid=' + movableSelectedRow[rowuID] + ']') : null;
        if (!isNullOrUndefined(tr)) {
            setValue(field, value, selectedRow[rowData]);
            var td = !isNullOrUndefined(tr[cells][fieldIdx]) ?
                tr[cells][fieldIdx] : mTr[cells][fieldIdx - this.frozenColumns];
            if (!isNullOrUndefined(td)) {
                var sRow = selectedRow[cells][fieldIdx];
                var mRow = void 0;
                if (this.frozenColumns) {
                    mRow = movableSelectedRow[cells][fieldIdx - this.frozenColumns];
                }
                cell.refreshTD(td, !isNullOrUndefined(sRow) ? sRow : mRow, selectedRow[rowData], { index: selectedRow[rowIdx] });
                if (this.aggregates.length > 0) {
                    this.notify(events.refreshFooterRenderer, {});
                    if (this.groupSettings.columns.length > 0) {
                        this.notify(events.groupAggregates, {});
                    }
                }
                /* tslint:disable:no-string-literal */
                if (!isNullOrUndefined(movableSelectedRow) && !isNullOrUndefined(movableSelectedRow['changes'])) {
                    movableSelectedRow['changes'][field] = value;
                }
                /* tslint:disable:no-string-literal */
                this.trigger(events.queryCellInfo, {
                    cell: td, column: col, data: selectedRow[rowData]
                });
            }
        }
        else {
            return;
        }
    };
    /**
     * @hidden
     */
    Grid.prototype.refreshReactColumnTemplateByUid = function (columnUid) {
        var _this = this;
        if (this.isReact) {
            //tslint:disable-next-line:no-any
            this.clearTemplate(['columnTemplate'], undefined, function () {
                var cells = 'cells';
                var rowIdx = 'index';
                var rowsObj = _this.getRowsObject();
                var indent = _this.getIndentCount();
                var cellIndex = _this.getNormalizedColumnIndex(columnUid);
                for (var j = 0; j < rowsObj.length; j++) {
                    if (rowsObj[j].isDataRow && !isNullOrUndefined(rowsObj[j].index)) {
                        var cell = rowsObj[j][cells][cellIndex];
                        var cellRenderer = new CellRenderer(_this, _this.serviceLocator);
                        var td = _this.getCellFromIndex(rowsObj[j].index, cellIndex - indent);
                        cellRenderer.refreshTD(td, cell, rowsObj[j].data, { index: rowsObj[j][rowIdx] });
                    }
                }
            });
        }
    };
    /**
     * Updates and refresh the particular row values based on the given primary key value.
     * > Primary key column must be specified using `columns.isPrimaryKey` property.
     *  @param {string| number} key - Specifies the PrimaryKey value of dataSource.
     *  @param {Object} rowData - To update new data for the particular row.
     */
    Grid.prototype.setRowData = function (key, rowData) {
        var rwdata = 'data';
        var rowuID = 'uid';
        var rowObjects = this.contentModule.getRows();
        var selectedRow;
        var pkName = this.getPrimaryKeyFieldNames()[0];
        var rowRenderer = new RowRenderer(this.serviceLocator, null, this);
        if (this.groupSettings.columns.length > 0 && this.aggregates.length > 0) {
            rowObjects = rowObjects.filter(function (row) { return row.isDataRow; });
        }
        selectedRow = rowObjects.filter(function (r) {
            return getValue(pkName, r.data) === key;
        })[0];
        if (!isNullOrUndefined(selectedRow) && this.element.querySelectorAll('[data-uid=' + selectedRow[rowuID] + ']').length) {
            selectedRow.changes = rowData;
            refreshForeignData(selectedRow, this.getForeignKeyColumns(), selectedRow.changes);
            rowRenderer.refresh(selectedRow, this.getColumns(), true);
            if (this.aggregates.length > 0) {
                this.notify(events.refreshFooterRenderer, {});
                if (this.groupSettings.columns.length > 0) {
                    this.notify(events.groupAggregates, {});
                }
            }
        }
        else {
            return;
        }
    };
    /**
     * Gets a cell by row and column index.
     * @param  {number} rowIndex - Specifies the row index.
     * @param  {number} columnIndex - Specifies the column index.
     * @return {Element}
     */
    Grid.prototype.getCellFromIndex = function (rowIndex, columnIndex) {
        var col = this.getColumnByIndex(columnIndex);
        return getCellByColAndRowIndex(this, col, rowIndex, columnIndex);
    };
    /**
     * Gets a movable table cell by row and column index.
     * @param  {number} rowIndex - Specifies the row index.
     * @param  {number} columnIndex - Specifies the column index.
     * @return {Element}
     */
    Grid.prototype.getMovableCellFromIndex = function (rowIndex, columnIndex) {
        if (this.frozenName === 'Left-Right' && columnIndex >= this.movableCount) {
            return undefined;
        }
        var index = this.getFrozenColumns() || this.getFrozenLeftColumnsCount();
        return this.getMovableDataRows()[rowIndex] &&
            this.getMovableDataRows()[rowIndex].getElementsByClassName(literals.rowCell)[columnIndex - index];
    };
    /**
     * Gets a frozen right table cell by row and column index.
     * @param  {number} rowIndex - Specifies the row index.
     * @param  {number} columnIndex - Specifies the column index.
     * @return {Element}
     */
    Grid.prototype.getFrozenRightCellFromIndex = function (rowIndex, columnIndex) {
        var index = this.getFrozenLeftColumnsCount() + this.getMovableColumnsCount();
        var rows = this.getFrozenRightDataRows();
        return rows[rowIndex] && rows[rowIndex].getElementsByClassName(literals.rowCell)[columnIndex - index];
    };
    /**
     * Gets a column header by column index.
     * @param  {number} index - Specifies the column index.
     * @return {Element}
     */
    Grid.prototype.getColumnHeaderByIndex = function (index) {
        return this.getHeaderTable().getElementsByClassName('e-headercell')[index];
    };
    /**
     * Gets a movable column header by column index.
     * @param  {number} index - Specifies the column index.
     * @return {Element}
     */
    Grid.prototype.getMovableColumnHeaderByIndex = function (index) {
        var left = this.getFrozenColumns() || this.getFrozenLeftColumnsCount();
        return this.getMovableVirtualHeader().getElementsByClassName('e-headercell')[index - left];
    };
    /**
     * Gets a frozen right column header by column index.
     * @param  {number} index - Specifies the column index.
     * @return {Element}
     */
    Grid.prototype.getFrozenRightColumnHeaderByIndex = function (index) {
        var left = this.getFrozenLeftColumnsCount() + this.getMovableColumnsCount();
        return this.getFrozenRightHeader().getElementsByClassName('e-headercell')[index - left];
    };
    /**
     * Gets a frozen left column header by column index.
     * @param  {number} index - Specifies the column index.
     * @return {Element}
     */
    Grid.prototype.getFrozenLeftColumnHeaderByIndex = function (index) {
        return this.getFrozenVirtualHeader().getElementsByClassName('e-headercell')[index];
    };
    /**
     * @hidden
     */
    Grid.prototype.getRowObjectFromUID = function (uid, isMovable, isFrozenRight) {
        var rows = this.contentModule.getRows();
        var row = this.rowObject(rows, uid);
        if (this.isFrozenGrid()) {
            if (!row || isMovable || isFrozenRight) {
                row = this.rowObject(this.contentModule.getMovableRows(), uid);
                if ((!row && this.getFrozenMode() === 'Left-Right') || isFrozenRight) {
                    row = this.rowObject(this.contentModule.getFrozenRightRows(), uid);
                }
                return row;
            }
        }
        if (isNullOrUndefined(row) && this.enableVirtualization && this.groupSettings.columns.length > 0) {
            row = this.rowObject(this.vRows, uid);
            return row;
        }
        return row;
    };
    Grid.prototype.rowObject = function (rows, uid) {
        for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
            var row = rows_1[_i];
            if (row.uid === uid) {
                return row;
            }
        }
        return null;
    };
    /**
     * @hidden
     */
    Grid.prototype.getRowsObject = function () {
        return this.contentModule.getRows();
    };
    /**
     * @hidden
     */
    Grid.prototype.getMovableRowsObject = function () {
        var rows = [];
        if (this.isFrozenGrid()) {
            rows = this.contentModule.getMovableRows();
        }
        return rows;
    };
    /**
     * @hidden
     */
    Grid.prototype.getFrozenRightRowsObject = function () {
        var rows = [];
        if (this.getFrozenMode() === 'Right' || this.getFrozenMode() === 'Left-Right') {
            rows = this.contentModule.getFrozenRightRows();
        }
        return rows;
    };
    /**
     * Gets a column header by column name.
     * @param  {string} field - Specifies the column name.
     * @return {Element}
     */
    Grid.prototype.getColumnHeaderByField = function (field) {
        var column = this.getColumnByField(field);
        return column ? this.getColumnHeaderByUid(column.uid) : undefined;
    };
    /**
     * Gets a column header by UID.
     * @param  {string} field - Specifies the column uid.
     * @return {Element}
     */
    Grid.prototype.getColumnHeaderByUid = function (uid) {
        var element = this.getHeaderContent().querySelector('[e-mappinguid=' + uid + ']');
        return element ? element.parentElement : undefined;
    };
    /**
     * @hidden
     * @blazorType GridColumn
     */
    Grid.prototype.getColumnByIndex = function (index) {
        var column;
        this.getColumns().some(function (col, i) {
            column = col;
            return i === index;
        });
        return column;
    };
    /**
     * Gets a Column by column name.
     * @param  {string} field - Specifies the column name.
     * @return {Column}
     * @blazorType GridColumn
     */
    Grid.prototype.getColumnByField = function (field) {
        return iterateArrayOrObject(this.getColumns(), function (item, index) {
            if (item.field === field) {
                return item;
            }
            return undefined;
        })[0];
    };
    /**
     * Gets a column index by column name.
     * @param  {string} field - Specifies the column name.
     * @return {number}
     */
    Grid.prototype.getColumnIndexByField = function (field) {
        var cols = this.getColumns();
        for (var i = 0; i < cols.length; i++) {
            if (cols[i].field === field) {
                return i;
            }
        }
        return -1;
    };
    /**
     * Gets a column by UID.
     * @param  {string} uid - Specifies the column UID.
     * @return {Column}
     * @blazorType GridColumn
     */
    Grid.prototype.getColumnByUid = function (uid) {
        return iterateArrayOrObject(this.getColumns().concat(this.getStackedColumns(this.columns)), function (item, index) {
            if (item.uid === uid) {
                return item;
            }
            return undefined;
        })[0];
    };
    /**
     * @hidden
     */
    Grid.prototype.getStackedColumns = function (columns, stackedColumn) {
        if (stackedColumn === void 0) { stackedColumn = []; }
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var column = columns_1[_i];
            if (column.columns) {
                stackedColumn.push(column);
                this.getStackedColumns(column.columns, stackedColumn);
            }
        }
        return stackedColumn;
    };
    /**
     * Gets a column index by UID.
     * @param  {string} uid - Specifies the column UID.
     * @return {number}
     */
    Grid.prototype.getColumnIndexByUid = function (uid) {
        var index = iterateArrayOrObject(this.getColumns(), function (item, index) {
            if (item.uid === uid) {
                return index;
            }
            return undefined;
        })[0];
        return !isNullOrUndefined(index) ? index : -1;
    };
    /**
     * Gets UID by column name.
     * @param  {string} field - Specifies the column name.
     * @return {string}
     */
    Grid.prototype.getUidByColumnField = function (field) {
        return iterateArrayOrObject(this.getColumns(), function (item, index) {
            if (item.field === field) {
                return item.uid;
            }
            return undefined;
        })[0];
    };
    /**
     * Gets TH index by column uid value.
     * @private
     * @param  {string} uid - Specifies the column uid.
     * @return {number}
     */
    Grid.prototype.getNormalizedColumnIndex = function (uid) {
        var index = this.getColumnIndexByUid(uid);
        return index + this.getIndentCount();
    };
    /**
    * Gets indent cell count.
    * @private
    * @return {number}
    */
    Grid.prototype.getIndentCount = function () {
        var index = 0;
        if (this.allowGrouping) {
            index += this.groupSettings.columns.length;
        }
        if (this.isDetail()) {
            index++;
        }
        if (this.isRowDragable() && isNullOrUndefined(this.rowDropSettings.targetID)) {
            index++;
        }
        /**
         * TODO: index normalization based on the stacked header, grouping and detailTemplate
         * and frozen should be handled here
         */
        return index;
    };
    /**
     * Gets the collection of column fields.
     * @return {string[]}
     */
    Grid.prototype.getColumnFieldNames = function () {
        var columnNames = [];
        var column;
        for (var i = 0, len = this.getColumns().length; i < len; i++) {
            column = this.getColumns()[i];
            if (column.visible) {
                columnNames.push(column.field);
            }
        }
        return columnNames;
    };
    /**
     * Gets a compiled row template.
     * @return {Function}
     * @private
     */
    Grid.prototype.getRowTemplate = function () {
        return this.rowTemplateFn;
    };
    /**
     * Gets a compiled detail row template.
     * @private
     * @return {Function}
     */
    Grid.prototype.getDetailTemplate = function () {
        return this.detailTemplateFn;
    };
    /**
     * Gets a compiled detail row template.
     * @private
     * @return {Function}
     */
    Grid.prototype.getEditTemplate = function () {
        return this.editTemplateFn;
    };
    /**
     * Gets a compiled dialog edit header template.
     * @private
     * @return {Function}
     */
    Grid.prototype.getEditHeaderTemplate = function () {
        return this.editHeaderTemplateFn;
    };
    /**
     * Gets a compiled dialog edit footer template.
     * @private
     * @return {Function}
     */
    Grid.prototype.getEditFooterTemplate = function () {
        return this.editFooterTemplateFn;
    };
    /**
     * Get the names of the primary key columns of the Grid.
     * @return {string[]}
     */
    Grid.prototype.getPrimaryKeyFieldNames = function () {
        var keys = [];
        for (var k = 0; k < this.columnModel.length; k++) {
            if (this.columnModel[k].isPrimaryKey) {
                keys.push(this.columnModel[k].field);
            }
        }
        return keys;
    };
    /**
     * Refreshes the Grid header and content.
     */
    Grid.prototype.refresh = function () {
        if (!this.isDestroyed) {
            this.headerModule.refreshUI();
            this.updateStackedFilter();
            this.renderModule.refresh();
        }
    };
    /**
     * Refreshes the Grid header.
     */
    Grid.prototype.refreshHeader = function () {
        this.headerModule.refreshUI();
    };
    /**
     * Gets the collection of selected rows.
     * @return {Element[]}
     */
    Grid.prototype.getSelectedRows = function () {
        return this.selectionModule ? this.selectionModule.selectedRecords : [];
    };
    /**
     * Gets the collection of selected row indexes.
     * @return {number[]}
     */
    Grid.prototype.getSelectedRowIndexes = function () {
        return this.selectionModule ? this.selectionModule.selectedRowIndexes : [];
    };
    /**
     * Gets the collection of selected row and cell indexes.
     * @return {number[]}
     */
    Grid.prototype.getSelectedRowCellIndexes = function () {
        return this.selectionModule ? this.selectionModule.selectedRowCellIndexes : [];
    };
    /**
     * Gets the collection of selected records.
     * @return {Object[]}
     * @isGenericType true
     */
    Grid.prototype.getSelectedRecords = function () {
        return this.selectionModule ? this.selectionModule.getSelectedRecords() : [];
    };
    /**
     * Gets the collection of selected columns uid.
     * @return {string[]}
     * @isGenericType true
     */
    Grid.prototype.getSelectedColumnsUid = function () {
        var _this = this;
        var uid = [];
        if (this.selectionModule) {
            this.selectionModule.selectedColumnsIndexes.filter(function (i) { return uid.push(_this.getColumns()[i].uid); });
        }
        return uid;
    };
    /**
     * Gets the data module.
     * @return {Data}
     */
    Grid.prototype.getDataModule = function () {
        return this.renderModule.data;
    };
    /**
     * Shows a column by its column name.
     * @param  {string|string[]} keys - Defines a single or collection of column names.
     * @param  {string} showBy - Defines the column key either as field name or header text.
     * @return {void}
     */
    Grid.prototype.showColumns = function (keys, showBy) {
        showBy = showBy ? showBy : 'headerText';
        this.showHider.show(keys, showBy);
    };
    /**
     * Hides a column by column name.
     * @param  {string|string[]} keys - Defines a single or collection of column names.
     * @param  {string} hideBy - Defines the column key either as field name or header text.
     * @return {void}
     */
    Grid.prototype.hideColumns = function (keys, hideBy) {
        hideBy = hideBy ? hideBy : 'headerText';
        this.showHider.hide(keys, hideBy);
    };
    /**
     * @hidden
     */
    Grid.prototype.getFrozenColumns = function () {
        return this.frozenColumns + this.getFrozenCount(this.columns, 0, 0);
    };
    /**
     * @hidden
     */
    Grid.prototype.getFrozenRightColumnsCount = function () {
        return this.frozenRightCount;
    };
    /**
     * @hidden
     */
    Grid.prototype.getFrozenLeftColumnsCount = function () {
        return this.frozenLeftCount;
    };
    /**
     * @hidden
     */
    Grid.prototype.getMovableColumnsCount = function () {
        return this.movableCount;
    };
    /**
     * @hidden
     */
    Grid.prototype.setFrozenCount = function () {
        this.frozenLeftCount = this.frozenRightCount = this.movableCount = 0;
        this.visibleFrozenLeft = this.visibleFrozenRight = this.visibleMovable = 0;
        this.frozenLeftColumns = [];
        this.frozenRightColumns = [];
        this.movableColumns = [];
        this.splitFrozenCount(this.columns);
        if (this.frozenColumns && (this.frozenLeftCount || this.frozenRightCount)) {
            this.setProperties({ frozenColumns: 0 }, true);
        }
        this.setTablesCount();
        if (this.frozenLeftCount && !this.frozenRightCount) {
            this.frozenName = 'Left';
        }
        else if (this.frozenRightCount && !this.frozenLeftCount) {
            this.frozenName = 'Right';
        }
        else if (this.frozenLeftCount && this.frozenRightCount) {
            this.frozenName = 'Left-Right';
        }
    };
    /**
     * @hidden
     */
    Grid.prototype.getVisibleFrozenLeftCount = function () {
        return this.visibleFrozenLeft;
    };
    /**
     * @hidden
     */
    Grid.prototype.getVisibleFrozenRightCount = function () {
        return this.visibleFrozenRight;
    };
    /**
     * @hidden
     */
    Grid.prototype.getVisibleMovableCount = function () {
        return this.visibleMovable;
    };
    /**
     * @hidden
     */
    Grid.prototype.getFrozenRightColumns = function () {
        return this.frozenRightColumns;
    };
    /**
     * @hidden
     */
    Grid.prototype.getFrozenLeftColumns = function () {
        return this.frozenLeftColumns;
    };
    /**
     * @hidden
     */
    Grid.prototype.getMovableColumns = function () {
        return this.movableColumns;
    };
    Grid.prototype.splitFrozenCount = function (columns) {
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].columns) {
                this.splitFrozenCount(columns[i].columns);
            }
            else {
                if (columns[i].freeze === 'Right') {
                    if (columns[i].visible !== false) {
                        this.visibleFrozenRight++;
                    }
                    ;
                    this.frozenRightColumns.push(columns[i]);
                    this.frozenRightCount++;
                }
                else if (columns[i].freeze === 'Left') {
                    if (columns[i].visible !== false) {
                        this.visibleFrozenLeft++;
                    }
                    ;
                    this.frozenLeftColumns.push(columns[i]);
                    this.frozenLeftCount++;
                }
                else {
                    if (columns[i].visible !== false) {
                        this.visibleMovable++;
                    }
                    ;
                    this.movableColumns.push(columns[i]);
                    this.movableCount++;
                }
            }
        }
    };
    /**
     * @hidden
     */
    Grid.prototype.getVisibleFrozenColumns = function () {
        return this.getVisibleFrozenColumnsCount() + this.getVisibleFrozenCount(this.columns, 0);
    };
    /**
     * Get the current Filter operator and field.
     * @return {Object}
     */
    Grid.prototype.getFilterUIInfo = function () {
        return this.filterModule ? this.filterModule.getFilterUIInfo() : {};
    };
    Grid.prototype.getVisibleFrozenColumnsCount = function () {
        var visibleFrozenColumns = 0;
        var columns = this.columnModel;
        for (var i = 0; i < this.frozenColumns; i++) {
            if (columns[i].visible) {
                visibleFrozenColumns++;
            }
        }
        if (this.frozenLeftCount || this.frozenRightCount) {
            for (var i = 0; i < columns.length; i++) {
                if (columns[i].visible && (columns[i].freeze === 'Left' || columns[i].freeze === 'Right')) {
                    visibleFrozenColumns++;
                }
            }
        }
        return visibleFrozenColumns;
    };
    Grid.prototype.getVisibleFrozenCount = function (cols, cnt) {
        if (!this.frozenLeftCount && !this.frozenRightCount) {
            for (var i = 0, len = cols.length; i < len; i++) {
                if (cols[i].columns) {
                    cnt = this.getVisibleFrozenCount(cols[i].columns, cnt);
                }
                else {
                    if (cols[i].isFrozen && cols[i].visible) {
                        cnt++;
                    }
                }
            }
        }
        return cnt;
    };
    Grid.prototype.getFrozenCount = function (cols, cnt, index) {
        for (var i = 0, len = cols.length; i < len; i++) {
            if (cols[i].columns) {
                cnt = this.getFrozenCount(cols[i].columns, cnt, index);
            }
            else {
                if (cols[i].isFrozen && index > this.frozenColumns - 1) {
                    cnt++;
                }
                index++;
            }
        }
        return cnt;
    };
    /**
     * Navigates to the specified target page.
     * @param  {number} pageNo - Defines the page number to navigate.
     * @return {void}
     */
    Grid.prototype.goToPage = function (pageNo) {
        if (this.pagerModule) {
            this.pagerModule.goToPage(pageNo);
        }
    };
    /**
     * Defines the text of external message.
     * @param  {string} message - Defines the message to update.
     * @return {void}
     */
    Grid.prototype.updateExternalMessage = function (message) {
        if (this.pagerModule) {
            this.pagerModule.updateExternalMessage(message);
        }
    };
    /**
     * Sorts a column with the given options.
     * @param {string} columnName - Defines the column name to be sorted.
     * @param {SortDirection} direction - Defines the direction of sorting field.
     * @param {boolean} isMultiSort - Specifies whether the previous sorted columns are to be maintained.
     * @return {void}
     */
    Grid.prototype.sortColumn = function (columnName, direction, isMultiSort) {
        if (this.sortModule) {
            this.sortModule.sortColumn(columnName, direction, isMultiSort);
        }
    };
    /**
     * Clears all the sorted columns of the Grid.
     * @return {void}
     */
    Grid.prototype.clearSorting = function () {
        if (this.sortModule) {
            this.sortModule.clearSorting();
        }
    };
    /**
     * Remove sorted column by field name.
     * @param {string} field - Defines the column field name to remove sort.
     * @return {void}
     * @hidden
     */
    Grid.prototype.removeSortColumn = function (field) {
        if (this.sortModule) {
            this.sortModule.removeSortColumn(field);
        }
    };
    /**
     * Filters grid row by column name with the given options.
     * @param  {string} fieldName - Defines the field name of the column.
     * @param  {string} filterOperator - Defines the operator to filter records.
     * @param  {string | number | Date | boolean} filterValue - Defines the value used to filter records.
     * @param  {string} predicate - Defines the relationship between one filter query and another by using AND or OR predicate.
     * @param  {boolean} matchCase - If match case is set to true, the grid filters the records with exact match. if false, it filters case
     * insensitive records (uppercase and lowercase letters treated the same).
     * @param  {boolean} ignoreAccent - If ignoreAccent set to true,
     * then filter ignores the diacritic characters or accents while filtering.
     * @param  {string} actualFilterValue - Defines the actual filter value for the filter column.
     * @param  {string} actualOperator - Defines the actual filter operator for the filter column.
     * @return {void}
     */
    Grid.prototype.filterByColumn = function (fieldName, filterOperator, filterValue, predicate, matchCase, ignoreAccent, actualFilterValue, actualOperator) {
        if (this.filterModule) {
            this.filterModule.filterByColumn(fieldName, filterOperator, filterValue, predicate, matchCase, ignoreAccent, actualFilterValue, actualOperator);
        }
    };
    /**
     * Clears all the filtered rows of the Grid.
     * @return {void}
     */
    Grid.prototype.clearFiltering = function (fields) {
        if (this.filterModule) {
            this.filterModule.clearFiltering(fields);
        }
    };
    /**
     * Removes filtered column by field name.
     * @param  {string} field - Defines column field name to remove filter.
     * @param  {boolean} isClearFilterBar -  Specifies whether the filter bar value needs to be cleared.
     * @return {void}
     * @hidden
     */
    Grid.prototype.removeFilteredColsByField = function (field, isClearFilterBar) {
        if (this.filterModule) {
            this.filterModule.removeFilteredColsByField(field, isClearFilterBar);
        }
    };
    /**
     * Selects a row by given index.
     * @param  {number} index - Defines the row index.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @return {void}
     */
    Grid.prototype.selectRow = function (index, isToggle) {
        if (this.selectionModule) {
            this.selectionModule.selectRow(index, isToggle);
        }
    };
    /**
     * Selects a collection of rows by indexes.
     * @param  {number[]} rowIndexes - Specifies the row indexes.
     * @return {void}
     */
    Grid.prototype.selectRows = function (rowIndexes) {
        if (this.selectionModule) {
            this.selectionModule.selectRows(rowIndexes);
        }
    };
    /**
     * Deselects the current selected rows and cells.
     * @return {void}
     */
    Grid.prototype.clearSelection = function () {
        if (this.selectionModule) {
            this.selectionModule.clearSelection();
        }
    };
    /**
     * Selects a cell by the given index.
     * @param  {IIndex} cellIndex - Defines the row and column indexes.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @return {void}
     */
    Grid.prototype.selectCell = function (cellIndex, isToggle) {
        if (this.selectionModule) {
            this.selectionModule.selectCell(cellIndex, isToggle);
        }
    };
    /**
     * Selects a range of cells from start and end indexes.
     * @param  {IIndex} startIndex - Specifies the row and column's start index.
     * @param  {IIndex} endIndex - Specifies the row and column's end index.
     * @return {void}
     */
    Grid.prototype.selectCellsByRange = function (startIndex, endIndex) {
        this.selectionModule.selectCellsByRange(startIndex, endIndex);
    };
    /**
     * Searches Grid records using the given key.
     * You can customize the default search option by using the
     * [`searchSettings`](./#searchsettings/).
     * @param  {string} searchString - Defines the key.
     * @return {void}
     */
    Grid.prototype.search = function (searchString) {
        if (this.searchModule) {
            this.searchModule.search(searchString);
        }
    };
    /**
     * By default, prints all the pages of the Grid and hides the pager.
     * > You can customize print options using the
     * [`printMode`](./#printmode).
     * @return {void}
     */
    Grid.prototype.print = function () {
        if (this.printModule) {
            this.printModule.print();
        }
    };
    /**
     * Delete a record with Given options. If fieldname and data is not given then grid will delete the selected record.
     * > `editSettings.allowDeleting` should be true.
     * @param {string} fieldname - Defines the primary key field, 'Name of the column'.
     * @param {Object} data - Defines the JSON data of the record to be deleted.
     */
    Grid.prototype.deleteRecord = function (fieldname, data) {
        if (this.editModule) {
            this.editModule.deleteRecord(fieldname, data);
        }
    };
    /**
     * Starts edit the selected row. At least one row must be selected before invoking this method.
     * `editSettings.allowEditing` should be true.
     * {% codeBlock src='grid/startEdit/index.md' %}{% endcodeBlock %}
     * @return {void}
     */
    Grid.prototype.startEdit = function () {
        if (this.editModule) {
            this.editModule.startEdit();
        }
    };
    /**
     * If Grid is in editable state, you can save a record by invoking endEdit.
     */
    Grid.prototype.endEdit = function () {
        if (this.editModule) {
            this.editModule.endEdit();
        }
    };
    /**
     * Cancels edited state.
     */
    Grid.prototype.closeEdit = function () {
        if (this.editModule) {
            this.editModule.closeEdit();
        }
    };
    /**
     * Adds a new record to the Grid. Without passing parameters, it adds empty rows.
     * > `editSettings.allowEditing` should be true.
     * @param {Object} data - Defines the new add record data.
     * @param {number} index - Defines the row index to be added
     */
    Grid.prototype.addRecord = function (data, index) {
        if (this.editModule) {
            this.editModule.addRecord(data, index);
        }
    };
    /**
     * Delete any visible row by TR element.
     * @param {HTMLTableRowElement} tr - Defines the table row element.
     */
    Grid.prototype.deleteRow = function (tr) {
        if (this.editModule) {
            this.editModule.deleteRow(tr);
        }
    };
    /**
     * Changes a particular cell into edited state based on the row index and field name provided in the `batch` mode.
     * @param {number} index - Defines row index to edit a particular cell.
     * @param {string} field - Defines the field name of the column to perform batch edit.
     */
    Grid.prototype.editCell = function (index, field) {
        if (this.editModule) {
            this.editModule.editCell(index, field);
        }
    };
    /**
     * Saves the cell that is currently edited. It does not save the value to the DataSource.
     * {% codeBlock src='grid/saveCell/index.md' %}{% endcodeBlock %}
     */
    Grid.prototype.saveCell = function () {
        if (this.editModule) {
            this.editModule.saveCell();
        }
    };
    /**
     * To update the specified cell by given value without changing into edited state.
     * @param {number} rowIndex Defines the row index.
     * @param {string} field Defines the column field.
     * @param {string | number | boolean | Date} value - Defines the value to be changed.
     */
    Grid.prototype.updateCell = function (rowIndex, field, value) {
        if (this.editModule) {
            this.editModule.updateCell(rowIndex, field, value);
        }
    };
    /**
     * To update the specified row by given values without changing into edited state.
     *
     * {% codeBlock src='grid/updateRow/index.md' %}{% endcodeBlock %}
     *
     * @param {number} index Defines the row index.
     * @param {Object} data Defines the data object to be updated.
     */
    Grid.prototype.updateRow = function (index, data) {
        if (this.editModule) {
            this.editModule.updateRow(index, data);
        }
    };
    /**
     * Gets the added, edited,and deleted data before bulk save to the DataSource in batch mode.
     * @return {Object}
     */
    Grid.prototype.getBatchChanges = function () {
        if (this.editModule) {
            return this.editModule.getBatchChanges();
        }
        return {};
    };
    /**
     * Enables or disables ToolBar items.
     * @param {string[]} items - Defines the collection of itemID of ToolBar items.
     * @param {boolean} isEnable - Defines the items to be enabled or disabled.
     * @return {void}
     */
    Grid.prototype.enableToolbarItems = function (items, isEnable) {
        if (this.toolbarModule) {
            this.toolbarModule.enableItems(items, isEnable);
        }
    };
    /**
     * Copy the selected rows or cells data into clipboard.
     * @param {boolean} withHeader - Specifies whether the column header text needs to be copied along with rows or cells.
     */
    Grid.prototype.copy = function (withHeader) {
        if (this.clipboardModule) {
            this.clipboardModule.copy(withHeader);
        }
    };
    /**
     * @hidden
     */
    Grid.prototype.recalcIndentWidth = function () {
        var _this = this;
        if (!this.getHeaderTable().querySelector('.e-emptycell')) {
            return;
        }
        if ((!this.groupSettings.columns.length && !this.isDetail() && !this.isRowDragable()) ||
            this.getHeaderTable().querySelector('.e-emptycell').getAttribute('indentRefreshed') ||
            !this.getContentTable()) {
            return;
        }
        var indentWidth = this.getHeaderTable().querySelector('.e-emptycell').parentElement.offsetWidth;
        var headerCol = [].slice.call(this.getHeaderTable().querySelector(literals.colGroup).childNodes);
        var contentCol = [].slice.call(this.getContentTable().querySelector(literals.colGroup).childNodes);
        var perPixel = indentWidth / 30;
        var i = this.getFrozenMode() === 'Right' ? this.frozenRightCount : 0;
        var parentOffset = this.element.offsetWidth;
        var applyWidth = function (index, width) {
            if (ispercentageWidth(_this)) {
                var newWidth = (width / parentOffset * 100).toFixed(1) + '%';
                headerCol[index].style.width = newWidth;
                contentCol[index].style.width = newWidth;
            }
            else {
                headerCol[index].style.width = width + 'px';
                contentCol[index].style.width = width + 'px';
            }
            _this.notify(events.columnWidthChanged, { index: index, width: width });
        };
        if (perPixel >= 1) {
            indentWidth = (30 / perPixel);
        }
        if (indentWidth < 1) {
            indentWidth = 1;
        }
        if (this.enableColumnVirtualization || this.isAutoGen) {
            indentWidth = 30;
        }
        while (i < this.groupSettings.columns.length) {
            applyWidth(i, indentWidth);
            i++;
        }
        if (this.isDetail()) {
            applyWidth(i, indentWidth);
            i++;
        }
        if (this.isRowDragable()) {
            applyWidth(i, indentWidth);
        }
        this.isAutoGen = false;
        this.getHeaderTable().querySelector('.e-emptycell').setAttribute('indentRefreshed', 'true');
    };
    /**
     * @hidden
     */
    Grid.prototype.resetIndentWidth = function () {
        if (ispercentageWidth(this)) {
            this.getHeaderTable().querySelector('.e-emptycell').removeAttribute('indentRefreshed');
            this.widthService.setWidthToColumns();
            this.recalcIndentWidth();
        }
        if ((this.width === 'auto' || typeof (this.width) === 'string' && this.width.indexOf('%') !== -1)
            && this.getColumns().filter(function (col) { return (!col.width || col.width === 'auto') && col.minWidth; }).length > 0) {
            var tgridWidth = this.widthService.getTableWidth(this.getColumns());
            this.widthService.setMinwidthBycalculation(tgridWidth);
        }
        if (this.isFrozenGrid() && this.widthService) {
            this.widthService.refreshFrozenScrollbar();
        }
        if (this.allowTextWrap && this.textWrapSettings.wrapMode != 'Content') {
            this.notify(events.refreshHandlers, {});
        }
    };
    /**
     * @hidden
     */
    Grid.prototype.isRowDragable = function () {
        return this.allowRowDragAndDrop && !this.rowDropSettings.targetID;
    };
    /**
     * Changes the Grid column positions by field names.
     * @param  {string} fromFName - Defines the origin field name.
     * @param  {string} toFName - Defines the destination field name.
     * @return {void}
     */
    Grid.prototype.reorderColumns = function (fromFName, toFName) {
        if (this.reorderModule) {
            this.reorderModule.reorderColumns(fromFName, toFName);
        }
    };
    /**
     * Changes the Grid column positions by field index. If you invoke reorderColumnByIndex multiple times,
     * then you won't get the same results every time.
     * @param  {number} fromIndex - Defines the origin field index.
     * @param  {number} toIndex - Defines the destination field index.
     * @return {void}
     */
    Grid.prototype.reorderColumnByIndex = function (fromIndex, toIndex) {
        if (this.reorderModule) {
            this.reorderModule.reorderColumnByIndex(fromIndex, toIndex);
        }
    };
    /**
     * Changes the Grid column positions by field index. If you invoke reorderColumnByTargetIndex multiple times,
     * then you will get the same results every time.
     * @param  {string} fieldName - Defines the field name.
     * @param  {number} toIndex - Defines the destination field index.
     * @return {void}
     */
    Grid.prototype.reorderColumnByTargetIndex = function (fieldName, toIndex) {
        if (this.reorderModule) {
            this.reorderModule.reorderColumnByTargetIndex(fieldName, toIndex);
        }
    };
    /**
     * Changes the Grid Row position with given indexes.
     * @param  {number} fromIndexes - Defines the origin Indexes.
     * @param  {number} toIndex - Defines the destination Index.
     * @return {void}
     */
    Grid.prototype.reorderRows = function (fromIndexes, toIndex) {
        if (this.rowDragAndDropModule) {
            this.rowDragAndDropModule.reorderRows(fromIndexes, toIndex);
        }
    };
    /**
     * @hidden
     */
    Grid.prototype.refreshDataSource = function (e, args) {
        this.notify('refreshdataSource', e);
    };
    /**
     * @hidden
     */
    Grid.prototype.disableRowDD = function (enable) {
        var headerTable = this.getHeaderTable();
        var contentTable = this.getContentTable();
        var headerRows = headerTable.querySelectorAll('th.e-rowdragheader, th.e-mastercell');
        var rows = this.getRows();
        var disValue = enable ? 'none' : '';
        setStyleAttribute(headerTable.querySelector(literals.colGroup).childNodes[0], { 'display': disValue });
        setStyleAttribute(contentTable.querySelector(literals.colGroup).childNodes[0], { 'display': disValue });
        for (var i = 0; i < this.getRows().length; i++) {
            var ele = rows[i].firstElementChild;
            enable ? addClass([ele], 'e-hide') : removeClass([ele], ['e-hide']);
        }
        for (var j = 0; j < headerTable.querySelectorAll('th.e-rowdragheader, th.e-mastercell').length; j++) {
            var ele = headerRows[j];
            enable ? addClass([ele], 'e-hide') : removeClass([ele], ['e-hide']);
        }
    };
    /**
     * Changes the column width to automatically fit its content to ensure that the width shows the content without wrapping/hiding.
     * > * This method ignores the hidden columns.
     * > * Uses the `autoFitColumns` method in the `dataBound` event to resize at initial rendering.
     * @param  {string |string[]} fieldNames - Defines the column names.
     * @return {void}
     *
     *
     * ```typescript
     * <div id="Grid"></div>
     * <script>
     * let gridObj: Grid = new Grid({
     *     dataSource: employeeData,
     *     columns: [
     *         { field: 'OrderID', headerText: 'Order ID', width:100 },
     *         { field: 'EmployeeID', headerText: 'Employee ID' }],
     *     dataBound: () => gridObj.autoFitColumns('EmployeeID')
     * });
     * gridObj.appendTo('#Grid');
     * </script>
     * ```
     *
     */
    Grid.prototype.autoFitColumns = function (fieldNames) {
        if (this.resizeModule) {
            this.resizeModule.autoFitColumns(fieldNames);
        }
    };
    /**
     * @hidden
     */
    Grid.prototype.createColumnchooser = function (x, y, target) {
        if (this.columnChooserModule) {
            this.columnChooserModule.renderColumnChooser(x, y, target);
        }
    };
    Grid.prototype.initializeServices = function () {
        this.serviceLocator.register('widthService', this.widthService = new ColumnWidthService(this));
        this.serviceLocator.register('cellRendererFactory', new CellRendererFactory);
        this.serviceLocator.register('rendererFactory', new RendererFactory);
        this.serviceLocator.register('localization', this.localeObj = new L10n(this.getModuleName(), this.defaultLocale, this.locale));
        this.serviceLocator.register('valueFormatter', this.valueFormatterService = new ValueFormatter(this.locale));
        this.serviceLocator.register('showHideService', this.showHider = new ShowHide(this));
        this.serviceLocator.register('ariaService', this.ariaService = new AriaService());
        this.serviceLocator.register('focus', this.focusModule = new FocusStrategy(this));
    };
    Grid.prototype.processModel = function () {
        var gCols = this.groupSettings.columns;
        var sCols = this.sortSettings.columns;
        var flag;
        var j;
        if (this.allowGrouping) {
            var _loop_1 = function (i, len) {
                j = 0;
                for (var sLen = sCols.length; j < sLen; j++) {
                    if (sCols[j].field === gCols[i]) {
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    sCols.push({ field: gCols[i], direction: 'Ascending', isFromGroup: true });
                }
                else {
                    if (this_1.allowSorting) {
                        this_1.sortedColumns.push(sCols[j].field);
                    }
                    else {
                        sCols[j].direction = 'Ascending';
                    }
                }
                if (!this_1.groupSettings.showGroupedColumn) {
                    var column = this_1.enableColumnVirtualization ?
                        this_1.columns.filter(function (c) { return c.field === gCols[i]; })[0] : this_1.getColumnByField(gCols[i]);
                    if (column) {
                        column.visible = false;
                    }
                    else {
                        this_1.log('initial_action', { moduleName: 'group', columnName: gCols[i] });
                    }
                }
            };
            var this_1 = this;
            for (var i = 0, len = gCols.length; i < len; i++) {
                _loop_1(i, len);
            }
        }
        if (!gCols.length) {
            for (var i = 0; i < sCols.length; i++) {
                this.sortedColumns.push(sCols[i].field);
            }
        }
        this.rowTemplateFn = templateCompiler(this.rowTemplate);
        this.detailTemplateFn = templateCompiler(this.detailTemplate);
        this.editTemplateFn = templateCompiler(this.editSettings.template);
        this.editHeaderTemplateFn = templateCompiler(this.editSettings.headerTemplate);
        this.editFooterTemplateFn = templateCompiler(this.editSettings.footerTemplate);
        if (!isNullOrUndefined(this.parentDetails)) {
            var value = isNullOrUndefined(this.parentDetails.parentKeyFieldValue) ? 'undefined' :
                this.parentDetails.parentKeyFieldValue;
            this.query.where(this.queryString, 'equal', value, true);
        }
        this.initForeignColumn();
    };
    Grid.prototype.initForeignColumn = function () {
        if (this.isForeignKeyEnabled(this.getColumns())) {
            this.notify(events.initForeignKeyColumn, this.getForeignKeyColumns());
        }
    };
    Grid.prototype.enableVerticalRendering = function () {
        if (this.rowRenderingMode === 'Vertical') {
            this.element.classList.add('e-row-responsive');
        }
        else {
            this.element.classList.remove('e-row-responsive');
        }
    };
    Grid.prototype.gridRender = function () {
        this.updateRTL();
        if (this.rowRenderingMode === 'Vertical') {
            this.element.classList.add('e-row-responsive');
        }
        if (this.enableHover) {
            this.element.classList.add('e-gridhover');
        }
        if (Browser.isDevice) {
            this.element.classList.add('e-device');
        }
        if (this.rowHeight) {
            this.element.classList.add('e-grid-min-height');
        }
        classList(this.element, ['e-responsive', 'e-default'], []);
        var rendererFactory = this.serviceLocator.getService('rendererFactory');
        this.headerModule = rendererFactory.getRenderer(RenderType.Header);
        this.contentModule = rendererFactory.getRenderer(RenderType.Content);
        this.printModule = new Print(this, this.scrollModule);
        this.clipboardModule = new Clipboard(this);
        this.renderModule.render();
        this.eventInitializer();
        this.createGridPopUpElement();
        this.widthService.setWidthToColumns();
        this.updateGridLines();
        this.applyTextWrap();
        this.createTooltip(); //for clip mode ellipsis
        this.enableBoxSelection();
    };
    Grid.prototype.dataReady = function () {
        this.scrollModule.setWidth();
        this.scrollModule.setHeight();
        if (this.height !== 'auto') {
            this.scrollModule.setPadding();
        }
    };
    Grid.prototype.updateRTL = function () {
        if (this.enableRtl) {
            this.element.classList.add('e-rtl');
        }
        else {
            this.element.classList.remove('e-rtl');
        }
    };
    Grid.prototype.createGridPopUpElement = function () {
        var popup = this.createElement('div', { className: 'e-gridpopup', styles: 'display:none;' });
        var content = this.createElement('div', { className: literals.content, attrs: { tabIndex: '-1' } });
        append([content, this.createElement('div', { className: 'e-uptail e-tail' })], popup);
        content.appendChild(this.createElement('span'));
        append([content, this.createElement('div', { className: 'e-downtail e-tail' })], popup);
        this.element.appendChild(popup);
    };
    Grid.prototype.updateGridLines = function () {
        classList(this.element, [], ['e-verticallines', 'e-horizontallines', 'e-hidelines', 'e-bothlines']);
        switch (this.gridLines) {
            case 'Horizontal':
                this.element.classList.add('e-horizontallines');
                break;
            case 'Vertical':
                this.element.classList.add('e-verticallines');
                break;
            case 'None':
                this.element.classList.add('e-hidelines');
                break;
            case 'Both':
                this.element.classList.add('e-bothlines');
                break;
        }
        this.updateResizeLines();
    };
    Grid.prototype.updateResizeLines = function () {
        if (this.allowResizing &&
            !(this.gridLines === 'Vertical' || this.gridLines === 'Both')) {
            this.element.classList.add('e-resize-lines');
        }
        else {
            this.element.classList.remove('e-resize-lines');
        }
    };
    /**
     * The function is used to apply text wrap
     * @return {void}
     * @hidden
     */
    Grid.prototype.applyTextWrap = function () {
        if (this.allowTextWrap) {
            var headerRows = [].slice.call(this.element.getElementsByClassName('e-columnheader'));
            switch (this.textWrapSettings.wrapMode) {
                case 'Header':
                    wrap(this.element, false);
                    wrap(this.getContent(), false);
                    wrap(headerRows, true);
                    break;
                case 'Content':
                    wrap(this.getContent(), true);
                    wrap(this.element, false);
                    wrap(headerRows, false);
                    break;
                default:
                    wrap(this.element, true);
                    wrap(this.getContent(), false);
                    wrap(headerRows, false);
            }
            if (this.textWrapSettings.wrapMode !== 'Content') {
                this.notify(events.refreshHandlers, {});
            }
        }
    };
    /**
     * The function is used to remove text wrap
     * @return {void}
     * @hidden
     */
    Grid.prototype.removeTextWrap = function () {
        wrap(this.element, false);
        var headerRows = [].slice.call(this.element.getElementsByClassName('e-columnheader'));
        wrap(headerRows, false);
        wrap(this.getContent(), false);
        if (this.textWrapSettings.wrapMode !== 'Content') {
            this.notify(events.refreshHandlers, {});
        }
    };
    /**
     * The function is used to add Tooltip to the grid cell that has ellipsiswithtooltip clip mode.
     * @return {void}
     * @hidden
     */
    Grid.prototype.createTooltip = function () {
        this.toolTipObj = new Tooltip({ opensOn: 'custom', content: '' }, this.element);
    };
    /** @hidden */
    Grid.prototype.freezeRefresh = function () {
        this.isFreezeRefresh = true;
        if (this.enableVirtualization) {
            this.pageSettings.currentPage = 1;
        }
        this.componentRefresh();
    };
    Grid.prototype.getTooltipStatus = function (element) {
        var width;
        var headerTable = this.getHeaderTable();
        var contentTable = this.getContentTable();
        var headerDivTag = 'e-gridheader';
        var contentDivTag = literals.gridContent;
        var htable = this.createTable(headerTable, headerDivTag, 'header');
        var ctable = this.createTable(headerTable, headerDivTag, 'content');
        var td = element;
        var table = element.classList.contains('e-headercell') ? htable : ctable;
        var ele = element.classList.contains('e-headercell') ? 'th' : 'tr';
        table.querySelector(ele).className = element.className;
        table.querySelector(ele).innerHTML = element.innerHTML;
        width = table.querySelector(ele).getBoundingClientRect().width;
        document.body.removeChild(htable);
        document.body.removeChild(ctable);
        if (width > element.getBoundingClientRect().width) {
            return true;
        }
        return false;
    };
    Grid.prototype.mouseMoveHandler = function (e) {
        if (this.isEllipsisTooltip()) {
            var element = parentsUntil(e.target, 'e-ellipsistooltip');
            if (this.prevElement !== element || e.type === 'mouseout') {
                this.toolTipObj.close();
            }
            var tagName = e.target.tagName;
            var elemNames = ['A', 'BUTTON', 'INPUT'];
            if (element && e.type !== 'mouseout' && !(Browser.isDevice && elemNames.indexOf(tagName) !== -1)) {
                if (element.getAttribute('aria-describedby')) {
                    return;
                }
                if (this.getTooltipStatus(element)) {
                    if (element.getElementsByClassName('e-headertext').length) {
                        this.toolTipObj.content = element.getElementsByClassName('e-headertext')[0].innerText;
                    }
                    else {
                        this.toolTipObj.content = element.innerText;
                    }
                    this.prevElement = element;
                    this.toolTipObj.open(element);
                }
            }
        }
        this.hoverFrozenRows(e);
    };
    /** @hidden */
    Grid.prototype.hoverFrozenRows = function (e) {
        if (this.isFrozenGrid()) {
            var row = parentsUntil(e.target, literals.row);
            if ([].slice.call(this.element.getElementsByClassName('e-frozenhover')).length && e.type === 'mouseout') {
                var rows = [].slice.call(this.element.getElementsByClassName('e-frozenhover'));
                for (var i = 0; i < rows.length; i++) {
                    rows[i].classList.remove('e-frozenhover');
                }
            }
            else if (row) {
                var rows = [].slice.call(this.element.querySelectorAll('tr[aria-rowindex="' + row.getAttribute(literals.ariaRowIndex) + '"]'));
                rows.splice(rows.indexOf(row), 1);
                for (var i = 0; i < rows.length; i++) {
                    if (row.getAttribute('aria-selected') != 'true' && rows[i]) {
                        rows[i].classList.add('e-frozenhover');
                    }
                    else if (rows[i]) {
                        rows[i].classList.remove('e-frozenhover');
                    }
                }
            }
        }
    };
    Grid.prototype.isEllipsisTooltip = function () {
        var cols = this.getColumns();
        if (this.clipMode === 'EllipsisWithTooltip') {
            return true;
        }
        for (var i = 0; i < cols.length; i++) {
            if (cols[i].clipMode === 'EllipsisWithTooltip') {
                return true;
            }
        }
        return false;
    };
    Grid.prototype.scrollHandler = function () {
        if (this.isEllipsisTooltip()) {
            this.toolTipObj.close();
        }
    };
    /**
     * To create table for ellipsiswithtooltip
     * @hidden
     */
    Grid.prototype.createTable = function (table, tag, type) {
        var myTableDiv = this.createElement('div');
        myTableDiv.className = this.element.className;
        myTableDiv.style.cssText = 'display: inline-block;visibility:hidden;position:absolute';
        var mySubDiv = this.createElement('div');
        mySubDiv.className = tag;
        var myTable = this.createElement('table');
        myTable.className = table.className;
        myTable.style.cssText = 'table-layout: auto;width: auto';
        var ele = (type === 'header') ? 'th' : 'td';
        var myTr = this.createElement('tr');
        var mytd = this.createElement(ele);
        myTr.appendChild(mytd);
        myTable.appendChild(myTr);
        mySubDiv.appendChild(myTable);
        myTableDiv.appendChild(mySubDiv);
        document.body.appendChild(myTableDiv);
        return myTableDiv;
    };
    Grid.prototype.onKeyPressed = function (e) {
        if (e.action === 'tab' || e.action === 'shiftTab') {
            this.toolTipObj.close();
        }
    };
    /**
     * Binding events to the element while component creation.
     * @hidden
     */
    Grid.prototype.wireEvents = function () {
        EventHandler.add(this.element, 'click', this.mouseClickHandler, this);
        EventHandler.add(this.element, 'touchend', this.mouseClickHandler, this);
        EventHandler.add(this.element, 'focusout', this.focusOutHandler, this);
        EventHandler.add(this.element, 'dblclick', this.dblClickHandler, this);
        EventHandler.add(this.element, 'keydown', this.keyPressHandler, this);
        /* tslint:disable-next-line:no-any */
        EventHandler.add(window, 'resize', this.resetIndentWidth, this);
        if (this.allowKeyboard) {
            this.element.tabIndex = this.element.tabIndex === -1 ? 0 : this.element.tabIndex;
        }
        this.keyboardModule = new KeyboardEvents(this.element, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
        EventHandler.add(this.getContent().firstElementChild, 'scroll', this.scrollHandler, this);
        EventHandler.add(this.element, 'mousemove', this.mouseMoveHandler, this);
        EventHandler.add(this.element, 'mouseout', this.mouseMoveHandler, this);
        EventHandler.add(this.getContent(), 'touchstart', this.tapEvent, this);
        EventHandler.add(document.body, 'keydown', this.keyDownHandler, this);
    };
    /**
     * Unbinding events from the element while component destroy.
     * @hidden
     */
    Grid.prototype.unwireEvents = function () {
        EventHandler.remove(this.element, 'click', this.mouseClickHandler);
        EventHandler.remove(this.element, 'touchend', this.mouseClickHandler);
        EventHandler.remove(this.element, 'focusout', this.focusOutHandler);
        EventHandler.remove(this.element, 'dblclick', this.dblClickHandler);
        EventHandler.remove(this.getContent().firstElementChild, 'scroll', this.scrollHandler);
        EventHandler.remove(this.element, 'mousemove', this.mouseMoveHandler);
        EventHandler.remove(this.element, 'mouseout', this.mouseMoveHandler);
        EventHandler.remove(this.element, 'keydown', this.keyPressHandler);
        EventHandler.remove(this.getContent(), 'touchstart', this.tapEvent);
        EventHandler.remove(document.body, 'keydown', this.keyDownHandler);
        /* tslint:disable-next-line:no-any */
        EventHandler.remove(window, 'resize', this.resetIndentWidth);
    };
    /**
     * @hidden
     */
    Grid.prototype.addListener = function () {
        if (this.isDestroyed) {
            return;
        }
        this.on(events.dataReady, this.dataReady, this);
        this.on(events.contentReady, this.recalcIndentWidth, this);
        this.on(events.headerRefreshed, this.recalcIndentWidth, this);
        this.dataBoundFunction = this.refreshMediaCol.bind(this);
        this.addEventListener(events.dataBound, this.dataBoundFunction);
        this.on(events.keyPressed, this.onKeyPressed, this);
    };
    /**
     * @hidden
     */
    Grid.prototype.removeListener = function () {
        if (this.isDestroyed) {
            return;
        }
        this.off(events.dataReady, this.dataReady);
        this.off(events.contentReady, this.recalcIndentWidth);
        this.off(events.headerRefreshed, this.recalcIndentWidth);
        this.removeEventListener(events.dataBound, this.dataBoundFunction);
        this.off(events.keyPressed, this.onKeyPressed);
    };
    /**
     * Get current visible data of grid.
     * @return {Object[]}
     * @isGenericType true
     */
    Grid.prototype.getCurrentViewRecords = function () {
        if (isGroupAdaptive(this)) {
            return isNullOrUndefined(this.currentViewData.records) ?
                this.currentViewData : this.currentViewData.records;
        }
        if (this.groupSettings.enableLazyLoading) {
            return this.currentViewData;
        }
        ;
        return (this.allowGrouping && this.groupSettings.columns.length && this.currentViewData.length && this.currentViewData.records) ?
            this.currentViewData.records : this.currentViewData;
    };
    Grid.prototype.mouseClickHandler = function (e) {
        if (this.isChildGrid(e) || (parentsUntil(e.target, 'e-gridpopup') && e.touches) ||
            this.element.getElementsByClassName('e-cloneproperties').length || this.checkEdit(e)) {
            return;
        }
        if (((!this.allowRowDragAndDrop && (parentsUntil(e.target, literals.gridContent) ||
            e.target.tagName === 'TD')) || (!(this.allowGrouping || this.allowReordering) &&
            parentsUntil(e.target, 'e-gridheader'))) && e.touches) {
            return;
        }
        if (parentsUntil(e.target, 'e-gridheader') && this.allowRowDragAndDrop &&
            !(parentsUntil(e.target, 'e-filterbarcell'))) {
            e.preventDefault();
        }
        var args = this.getRowInfo(e.target);
        var cancel = 'cancel';
        args[cancel] = false;
        var isDataRow = false;
        var tr = closest(e.target, 'tr');
        if (tr && tr.getAttribute('data-uid')) {
            var rowObj = this.getRowObjectFromUID(tr.getAttribute('data-uid'));
            isDataRow = rowObj ? rowObj.isDataRow : false;
        }
        if (isDataRow) {
            this.trigger(events.recordClick, args);
        }
        this.notify(events.click, e);
    };
    Grid.prototype.checkEdit = function (e) {
        var tr = parentsUntil(e.target, literals.row);
        var isEdit = this.editSettings.mode !== 'Batch' &&
            this.isEdit && tr && (tr.classList.contains(literals.editedRow) || tr.classList.contains(literals.addedRow));
        return !parentsUntil(e.target, 'e-unboundcelldiv') && (isEdit || (parentsUntil(e.target, literals.rowCell) &&
            parentsUntil(e.target, literals.rowCell).classList.contains('e-editedbatchcell')));
    };
    Grid.prototype.dblClickHandler = function (e) {
        var grid = parentsUntil(e.target, 'e-grid');
        if (isNullOrUndefined(grid) || grid.id !== this.element.id || closest(e.target, '.e-unboundcelldiv')) {
            return;
        }
        var dataRow = false;
        var tr = closest(e.target, 'tr');
        if (tr && tr.getAttribute('data-uid')) {
            var rowObj = this.getRowObjectFromUID(tr.getAttribute('data-uid'));
            dataRow = rowObj ? rowObj.isDataRow : false;
        }
        var args = this.getRowInfo(e.target);
        args.target = e.target;
        if (dataRow) {
            this.trigger(events.recordDoubleClick, args);
        }
        this.notify(events.dblclick, e);
    };
    Grid.prototype.focusOutHandler = function (e) {
        if (this.isChildGrid(e)) {
            return;
        }
        if (!parentsUntil(e.target, 'e-grid')) {
            this.element.querySelector('.e-gridpopup').style.display = 'None';
        }
        var filterClear = this.element.querySelector('.e-cancel:not(.e-hide)');
        if (filterClear) {
            filterClear.classList.add('e-hide');
        }
        var relatedTarget = e.relatedTarget;
        var ariaOwns = relatedTarget ? relatedTarget.getAttribute('aria-owns') : null;
        if ((!relatedTarget || (!parentsUntil(relatedTarget, 'e-grid') &&
            (!isNullOrUndefined(ariaOwns) &&
                (ariaOwns)) !== e.target.getAttribute('aria-owns')))
            && !this.keyPress && this.isEdit && !Browser.isDevice) {
            if (this.editSettings.mode === 'Batch') {
                this.editModule.saveCell();
                this.notify(events.editNextValCell, {});
            }
            if (this.editSettings.mode === 'Normal') {
                this.editModule.editFormValidate();
            }
        }
        this.keyPress = false;
    };
    Grid.prototype.isChildGrid = function (e) {
        var gridElement = parentsUntil(e.target, 'e-grid');
        if (gridElement && gridElement.id !== this.element.id) {
            return true;
        }
        return false;
    };
    /**
     * @hidden
     */
    Grid.prototype.mergePersistGridData = function (persistedData) {
        var data = this.getLocalData();
        if (!(isNullOrUndefined(data) || (data === '')) || !isNullOrUndefined(persistedData)) {
            var dataObj = !isNullOrUndefined(persistedData) ? persistedData : JSON.parse(data);
            if (this.enableVirtualization) {
                dataObj.pageSettings.currentPage = 1;
            }
            var keys = Object.keys(dataObj);
            this.isProtectedOnChange = true;
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                if ((typeof this[key] === 'object') && !isNullOrUndefined(this[key])) {
                    if (Array.isArray(this[key]) && key === 'columns') {
                        setColumnIndex(this[key]);
                        this.mergeColumns(dataObj[key], this[key]);
                        this[key] = dataObj[key];
                    }
                    else {
                        extend(this[key], dataObj[key]);
                    }
                }
                else {
                    this[key] = dataObj[key];
                }
            }
            this.isProtectedOnChange = false;
        }
    };
    Grid.prototype.mergeColumns = function (storedColumn, columns) {
        var storedColumns = storedColumn;
        var _loop_2 = function (i) {
            var localCol = columns.filter(function (tCol) { return tCol.index === storedColumns[i].index; })[0];
            if (!isNullOrUndefined(localCol)) {
                if (localCol.columns && localCol.columns.length) {
                    this_2.mergeColumns(storedColumns[i].columns, localCol.columns);
                    storedColumns[i] = extend(localCol, storedColumns[i], {}, true);
                }
                else {
                    storedColumns[i] = extend(localCol, storedColumns[i], {}, true);
                }
            }
        };
        var this_2 = this;
        for (var i = 0; i < storedColumns.length; i++) {
            _loop_2(i);
        }
    };
    /**
     * @hidden
     */
    Grid.prototype.isDetail = function () {
        return !isNullOrUndefined(this.detailTemplate) || !isNullOrUndefined(this.childGrid);
    };
    Grid.prototype.isCommandColumn = function (columns) {
        var _this = this;
        return columns.some(function (col) {
            if (col.columns) {
                return _this.isCommandColumn(col.columns);
            }
            return !!(col.commands || col.commandsTemplate);
        });
    };
    Grid.prototype.isForeignKeyEnabled = function (columns) {
        var _this = this;
        return columns.some(function (col) {
            if (col.columns) {
                return _this.isForeignKeyEnabled(col.columns);
            }
            return !!(col.dataSource && col.foreignKeyValue);
        });
    };
    Grid.prototype.keyPressHandler = function (e) {
        var presskey = extend(e, { cancel: false, });
        this.trigger("keyPressed", presskey);
        if (presskey.cancel === true) {
            e.stopImmediatePropagation();
        }
    };
    Grid.prototype.keyDownHandler = function (e) {
        if (e.altKey) {
            if (e.keyCode === 74) { //alt j
                if (this.keyA) { //alt A J
                    this.notify(events.groupCollapse, { target: e.target, collapse: false });
                    this.keyA = false;
                }
                else {
                    this.focusModule.focusHeader();
                    this.focusModule.addOutline();
                }
            }
            if (e.keyCode === 87) { //alt w
                this.focusModule.focusContent();
                this.focusModule.addOutline();
            }
            if (e.keyCode === 65) { //alt A
                this.keyA = true;
            }
            if (e.keyCode === 72 && this.keyA) { //alt A H
                this.notify(events.groupCollapse, { target: e.target, collapse: true });
                this.keyA = false;
            }
        }
        if (e.keyCode === 13) {
            this.notify(events.enterKeyHandler, e);
        }
    };
    Grid.prototype.keyActionHandler = function (e) {
        if (this.isChildGrid(e) ||
            (this.isEdit && e.action !== 'escape' && e.action !== 'enter' && e.action !== 'shiftEnter'
                && e.action !== 'tab' && e.action !== 'shiftTab')) {
            return;
        }
        else {
            this.keyPress = true;
        }
        if (this.allowKeyboard) {
            if (e.action === 'ctrlPlusP') {
                e.preventDefault();
                this.print();
            }
            this.notify(events.keyPressed, e);
        }
    };
    /**
     * @hidden
     */
    Grid.prototype.setInjectedModules = function (modules) {
        this.injectedModules = modules;
    };
    Grid.prototype.updateColumnObject = function () {
        prepareColumns(this.columns, this.enableColumnVirtualization, this);
        setColumnIndex(this.columns);
        this.initForeignColumn();
        this.notify(events.autoCol, {});
    };
    /**
     * Gets the foreign columns from Grid.
     * @return {Column[]}
     * @blazorType List<GridColumn>
     */
    Grid.prototype.getForeignKeyColumns = function () {
        return this.getColumns().filter(function (col) {
            return col.isForeignColumn();
        });
    };
    /**
     * @hidden
     */
    Grid.prototype.getRowHeight = function () {
        return this.rowHeight ? this.rowHeight : getRowHeight(this.element);
    };
    /**
     * Refreshes the Grid column changes.
     */
    Grid.prototype.refreshColumns = function () {
        this.setFrozenCount();
        var fCnt = this.getContent().querySelector('.e-frozen-left-content');
        var frCnt = this.getContent().querySelector('.e-frozen-right-content');
        var isColFrozen = !this.frozenRightCount && !this.frozenLeftCount;
        var isFrozen = this.getFrozenColumns() !== 0;
        if (!isFrozen && ((!fCnt && this.frozenLeftCount) || (!frCnt && this.frozenRightCount) || (fCnt && !this.frozenLeftCount)
            || (frCnt && !this.frozenRightCount))) {
            this.tableIndex = 0;
            this.tablesCount = 1;
            if (this.enableColumnVirtualization) {
                this.columnModel = [];
                this.updateColumnModel(this.columns);
            }
            this.freezeRefresh();
        }
        else if (isColFrozen && ((this.getFrozenColumns() === 1 && !fCnt) || (this.getFrozenColumns() === 0 && fCnt))) {
            this.tableIndex = 0;
            this.tablesCount = 1;
            if (this.enableColumnVirtualization) {
                this.columnModel = [];
                this.updateColumnModel(this.columns);
            }
            this.freezeRefresh();
        }
        else {
            this.isPreventScrollEvent = true;
            this.updateColumnObject();
            this.checkLockColumns(this.getColumns());
            this.refresh();
            if (this.isFrozenGrid()) {
                var mTbl = this.contentModule.getMovableContent().querySelector('.' + literals.table);
                remove(mTbl.querySelector(literals.colGroup));
                var colGroup = ((this.getHeaderContent()
                    .querySelector('.' + literals.movableHeader).querySelector(literals.colGroup)).cloneNode(true));
                mTbl.insertBefore(colGroup, mTbl.querySelector(literals.tbody));
                if (this.getFrozenMode() === 'Left-Right') {
                    var frTbl = this.contentModule.getFrozenRightContent().querySelector('.' + literals.table);
                    remove(frTbl.querySelector(literals.colGroup));
                    var colGrp = ((this.getHeaderContent()
                        .querySelector('.e-frozen-right-header').querySelector(literals.colGroup)).cloneNode(true));
                    frTbl.insertBefore(colGrp, frTbl.querySelector(literals.tbody));
                }
            }
        }
        if (this.isFrozenGrid()) {
            var left = this.getContent().querySelector('.e-movablescrollbar').scrollLeft;
            this.headerModule.getMovableHeader().scrollLeft = left;
            this.contentModule.getMovableContent().scrollLeft = left;
        }
    };
    /**
     * Export Grid data to Excel file(.xlsx).
     * @param  {ExcelExportProperties} excelExportProperties - Defines the export properties of the Grid.
     * @param  {boolean} isMultipleExport - Define to enable multiple export.
     * @param  {workbook} workbook - Defines the Workbook if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @return {Promise<any>}
     * @blazorType void
     */
    Grid.prototype.excelExport = function (excelExportProperties, isMultipleExport, 
    /* tslint:disable-next-line:no-any */
    workbook, isBlob) {
        return this.excelExportModule ?
            this.excelExportModule.Map(this, excelExportProperties, isMultipleExport, workbook, false, isBlob) : null;
    };
    /**
     * Export Grid data to CSV file.
     * @param  {ExcelExportProperties} excelExportProperties - Defines the export properties of the Grid.
     * @param  {boolean} isMultipleExport - Define to enable multiple export.
     * @param  {workbook} workbook - Defines the Workbook if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @return {Promise<any>}
     * @blazorType void
     */
    Grid.prototype.csvExport = function (excelExportProperties, 
    /* tslint:disable-next-line:no-any */
    isMultipleExport, workbook, isBlob) {
        return this.excelExportModule ?
            this.excelExportModule.Map(this, excelExportProperties, isMultipleExport, workbook, true, isBlob) : null;
    };
    /**
     * Export Grid data to PDF document.
     * @param  {pdfExportProperties} PdfExportProperties - Defines the export properties of the Grid.
     * @param  {isMultipleExport} isMultipleExport - Define to enable multiple export.
     * @param  {pdfDoc} pdfDoc - Defined the Pdf Document if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @return {Promise<any>}
     * @blazorType void
     */
    Grid.prototype.pdfExport = function (pdfExportProperties, 
    /* tslint:disable-next-line:no-any */
    isMultipleExport, pdfDoc, isBlob) {
        return this.pdfExportModule ? this.pdfExportModule.Map(this, pdfExportProperties, isMultipleExport, pdfDoc, isBlob) : null;
    };
    /**
     * Groups a column by column name.
     * @param  {string} columnName - Defines the column name to group.
     * @return {void}
     */
    Grid.prototype.groupColumn = function (columnName) {
        if (this.groupModule) {
            this.groupModule.groupColumn(columnName);
        }
    };
    /**
     * Expands all the grouped rows of the Grid.
     * @return {void}
     */
    Grid.prototype.groupExpandAll = function () {
        if (this.groupModule) {
            this.groupModule.expandAll();
        }
    };
    /**
    * Collapses all the grouped rows of the Grid.
    * @return {void}
    */
    Grid.prototype.groupCollapseAll = function () {
        if (this.groupModule) {
            this.groupModule.collapseAll();
        }
    };
    /**
     * Expands or collapses grouped rows by target element.
     * @param  {Element} target - Defines the target element of the grouped row.
     * @return {void}
     */
    // public expandCollapseRows(target: Element): void {
    //     if (this.groupModule) {
    //         this.groupModule.expandCollapseRows(target);
    //     }
    // }
    /**
     * Clears all the grouped columns of the Grid.
     * @return {void}
     */
    Grid.prototype.clearGrouping = function () {
        if (this.groupModule) {
            this.groupModule.clearGrouping();
        }
    };
    /**
     * Ungroups a column by column name.
     *
     * {% codeBlock src='grid/ungroupColumn/index.md' %}{% endcodeBlock %}
     *
     * @param  {string} columnName - Defines the column name to ungroup.
     * @return {void}
     */
    Grid.prototype.ungroupColumn = function (columnName) {
        if (this.groupModule) {
            this.groupModule.ungroupColumn(columnName);
        }
    };
    /**
     * Column chooser can be displayed on screen by given position(X and Y axis).
     * @param  {number} X - Defines the X axis.
     * @param  {number} Y - Defines the Y axis.
     * @return {void}
     */
    Grid.prototype.openColumnChooser = function (x, y) {
        if (this.columnChooserModule) {
            this.columnChooserModule.openColumnChooser(x, y);
        }
    };
    Grid.prototype.scrollRefresh = function () {
        var _this = this;
        var refresh = function () {
            _this.scrollModule.refresh();
            _this.off(events.contentReady, refresh);
        };
        this.on(events.contentReady, refresh, this);
    };
    /**
     * Collapses a detail row with the given target.
     * @param  {Element} target - Defines the expanded element to collapse.
     * @return {void}
     */
    // public detailCollapse(target: number | Element): void {
    //     if (this.detailRowModule) {
    //         this.detailRowModule.collapse(target);
    //     }
    // }
    /**
     * Collapses all the detail rows of the Grid.
     * @return {void}
     */
    Grid.prototype.detailCollapseAll = function () {
        if (this.detailRowModule) {
            this.detailRowModule.collapseAll();
        }
    };
    /**
     * Expands a detail row with the given target.
     * @param  {Element} target - Defines the collapsed element to expand.
     * @return {void}
     */
    // public detailExpand(target: number | Element): void {
    //     if (this.detailRowModule) {
    //         this.detailRowModule.expand(target);
    //     }
    // }
    /**
    * Expands all the detail rows of the Grid.
    * @return {void}
    */
    Grid.prototype.detailExpandAll = function () {
        if (this.detailRowModule) {
            this.detailRowModule.expandAll();
        }
    };
    /**
     * Deselects the currently selected cells.
     * @return {void}
     */
    Grid.prototype.clearCellSelection = function () {
        if (this.selectionModule) {
            this.selectionModule.clearCellSelection();
        }
    };
    /**
     * Deselects the currently selected rows.
     * @return {void}
     */
    Grid.prototype.clearRowSelection = function () {
        if (this.selectionModule) {
            this.selectionModule.clearRowSelection();
        }
    };
    /**
     * Selects a collection of cells by row and column indexes.
     * @param  {ISelectedCell[]} rowCellIndexes - Specifies the row and column indexes.
     * @return {void}
     */
    Grid.prototype.selectCells = function (rowCellIndexes) {
        if (this.selectionModule) {
            this.selectionModule.selectCells(rowCellIndexes);
        }
    };
    /**
     * Selects a range of rows from start and end row indexes.
     * @param  {number} startIndex - Specifies the start row index.
     * @param  {number} endIndex - Specifies the end row index.
     * @return {void}
     */
    Grid.prototype.selectRowsByRange = function (startIndex, endIndex) {
        if (this.selectionModule) {
            this.selectionModule.selectRowsByRange(startIndex, endIndex);
        }
    };
    /**
     * @hidden
     */
    Grid.prototype.isContextMenuOpen = function () {
        return this.contextMenuModule && this.contextMenuModule.isOpen;
    };
    /**
     * @hidden
     */
    Grid.prototype.ensureModuleInjected = function (module) {
        return this.getInjectedModules().indexOf(module) >= 0;
    };
    /**
     * Destroys the given template reference.
     * @param {string[]} propertyNames - Defines the collection of template name.
     */
    //tslint:disable-next-line:no-any
    Grid.prototype.destroyTemplate = function (propertyNames, index) {
        this.clearTemplate(propertyNames, index);
    };
    /**
     * @hidden
     * @private
     */
    Grid.prototype.log = function (type, args) {
        this.loggerModule ? this.loggerModule.log(type, args) : (function () { return 0; })();
    };
    /**
     * @hidden
     */
    Grid.prototype.applyBiggerTheme = function (element) {
        if (this.element.classList.contains('e-bigger')) {
            element.classList.add('e-bigger');
        }
    };
    /**
     * @hidden
     */
    Grid.prototype.getPreviousRowData = function () {
        var previousRowData = this.getRowsObject()[this.getRows().length - 1].data;
        return previousRowData;
    };
    /**
     * Hides the scrollbar placeholder of Grid content when grid content is not overflown.
     * @return {void}
     */
    Grid.prototype.hideScroll = function () {
        var content = this.getContent().querySelector('.' + literals.content);
        var scrollBar = this.getContent().querySelector('.e-scrollbar');
        if (content.scrollHeight <= content.clientHeight) {
            this.scrollModule.removePadding();
            content.style.overflowY = 'auto';
        }
        if (this.isFrozenGrid() && scrollBar) {
            var mvblScrollBar = this.getContent().querySelector('.e-movablescrollbar');
            var mvblChild = this.getContent().querySelector('.e-movablechild');
            scrollBar.style.display = 'flex';
            if (mvblScrollBar.offsetWidth >= mvblChild.offsetWidth) {
                scrollBar.style.display = 'none';
                this.notify(events.frozenHeight, 0);
            }
        }
    };
    /**
     * Get row index by primary key or row data.
     * @param  {string} value - Defines the primary key value.
     * @param  {Object} value - Defines the row data.
     */
    Grid.prototype.getRowIndexByPrimaryKey = function (value) {
        var pkName = this.getPrimaryKeyFieldNames()[0];
        value = typeof value === 'object' ? value[pkName] : value;
        var rows = this.getRowsObject();
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].isDetailRow || rows[i].isCaptionRow) {
                continue;
            }
            var pKvalue = rows[i].data[pkName];
            if (pkName.split('.').length > 1) {
                pKvalue = performComplexDataOperation(pkName, rows[i].data);
            }
            if (pKvalue === value) {
                return rows[i].index;
            }
        }
        return -1;
    };
    ;
    /**
    * @hidden
    */
    // Need to have all columns while filtering with ColumnVirtualization.
    Grid.prototype.grabColumnByFieldFromAllCols = function (field) {
        var column;
        this.columnModel = [];
        this.updateColumnModel(this.columns);
        var gCols = this.columnModel;
        for (var i = 0; i < gCols.length; i++) {
            if (field === gCols[i].field) {
                column = gCols[i];
            }
        }
        return column;
    };
    /**
    * @hidden
    */
    // Need to have all columns while filtering with ColumnVirtualization.
    Grid.prototype.grabColumnByUidFromAllCols = function (uid) {
        var column;
        this.columnModel = [];
        this.updateColumnModel(this.columns);
        var gCols = this.columnModel;
        for (var i = 0; i < gCols.length; i++) {
            if (uid === gCols[i].uid) {
                column = gCols[i];
            }
        }
        return column;
    };
    /**
     * Get all filtered records from the Grid and it returns array of objects for the local dataSource, returns a promise object if the Grid has remote data.
     * @return {Object[] | Promise<Object>}

     */
    Grid.prototype.getFilteredRecords = function () {
        if (this.allowFiltering && this.filterSettings.columns.length) {
            var query = this.renderModule.data.generateQuery(true);
            if (this.dataSource && this.renderModule.data.isRemote() && this.dataSource instanceof DataManager) {
                return this.renderModule.data.getData(this.dataSource, query);
            }
            else {
                if (this.dataSource instanceof DataManager) {
                    return this.dataSource.executeLocal(query);
                }
                else {
                    return new DataManager(this.dataSource, query).executeLocal(query);
                }
            }
        }
        return [];
    };
    Grid.prototype.getUserAgent = function () {
        var userAgent = Browser.userAgent.toLowerCase();
        return /iphone|ipod|ipad/.test(userAgent);
    };
    /**
     * @hidden
     */
    // Need to have all columns while filtering with ColumnVirtualization.
    Grid.prototype.tapEvent = function (e) {
        if (this.getUserAgent()) {
            if (!Global.timer) {
                Global.timer = setTimeout(function () {
                    Global.timer = null;
                }, 300);
            }
            else {
                clearTimeout(Global.timer);
                Global.timer = null;
                this.dblClickHandler(e);
                this.notify(events.doubleTap, e);
            }
        }
    };
    /**
     * @hidden
     */
    Grid.prototype.getRowUid = function (prefix) {
        return "" + prefix + this.rowUid++;
    };
    /**
     * @hidden
     */
    Grid.prototype.getMovableVirtualContent = function () {
        return this.getContent().querySelector('.' + literals.movableContent);
    };
    /**
     * @hidden
     */
    Grid.prototype.getFrozenVirtualContent = function () {
        return this.getContent().querySelector('.' + literals.frozenContent);
    };
    /**
     * @hidden
     */
    Grid.prototype.getMovableVirtualHeader = function () {
        return this.getHeaderContent().querySelector('.' + literals.movableHeader);
    };
    /**
     * @hidden
     */
    Grid.prototype.getFrozenVirtualHeader = function () {
        return this.getHeaderContent().querySelector('.' + literals.frozenHeader);
    };
    /**
     * @hidden
     */
    Grid.prototype.getRowElementByUID = function (uid) {
        var rowEle;
        var rows = [];
        if (this.isFrozenGrid()) {
            var fRows = [].slice.call(this.getFrozenVirtualContent().querySelector(literals.tbody).children);
            var mRows = [].slice.call(this.getMovableVirtualContent().querySelector(literals.tbody).children);
            var frozenRigtRows = [];
            if (this.tablesCount === 3) {
                frozenRigtRows = [].slice.call(this.getContent().querySelector('.e-frozen-right-content').querySelector(literals.tbody).children);
            }
            if (this.frozenRows) {
                rows = [].slice.call(this.getFrozenVirtualHeader().querySelector(literals.tbody).children);
                rows = rows.concat([].slice.call(this.getMovableVirtualHeader().querySelector(literals.tbody).children));
                if (this.tablesCount === 3) {
                    var frHdr = this.getHeaderContent().querySelector('.e-frozen-right-header');
                    rows = rows.concat([].slice.call(frHdr.querySelector(literals.tbody).children)).concat(frozenRigtRows);
                }
                ;
                rows = rows.concat(fRows).concat(mRows);
            }
            else {
                rows = fRows.concat(mRows).concat(frozenRigtRows);
            }
        }
        else {
            var cntRows = [].slice.call(this.getContent().querySelector(literals.tbody).children);
            if (this.frozenRows) {
                rows = [].slice.call(this.getHeaderContent().querySelector(literals.tbody).children);
                rows = rows.concat(cntRows);
            }
            else {
                rows = cntRows;
            }
        }
        for (var _i = 0, rows_2 = rows; _i < rows_2.length; _i++) {
            var row = rows_2[_i];
            if (row.getAttribute('data-uid') === uid) {
                rowEle = row;
                break;
            }
        }
        return rowEle;
    };
    /**
    * Gets the hidden columns from the Grid.
    * @return {Column[]}
    * @blazorType List<GridColumn>
    */
    Grid.prototype.getHiddenColumns = function () {
        var cols = [];
        for (var _i = 0, _a = this.columnModel; _i < _a.length; _i++) {
            var col = _a[_i];
            if (col.visible === false) {
                cols.push(col);
            }
        }
        return cols;
    };
    /**
     *  calculatePageSizeByParentHeight

     */
    Grid.prototype.calculatePageSizeByParentHeight = function (containerHeight) {
        if (this.allowPaging) {
            if ((this.allowTextWrap && this.textWrapSettings.wrapMode == 'Header') || (!this.allowTextWrap)) {
                var pagesize = 0;
                if (containerHeight.indexOf('%') != -1) {
                    containerHeight = parseInt(containerHeight) / 100 * this.element.clientHeight;
                }
                var nonContentHeight = this.getNoncontentHeight() + this.getRowHeight();
                if (containerHeight > nonContentHeight) {
                    var contentHeight = 0;
                    contentHeight = containerHeight - this.getNoncontentHeight();
                    pagesize = (contentHeight / this.getRowHeight());
                }
                if (pagesize > 0) {
                    return Math.floor(pagesize);
                }
            }
        }
        return 0;
    };
    Grid.prototype.getNoncontentHeight = function () {
        var height = 0;
        if (!isNullOrUndefined(this.getHeaderContent().clientHeight)) {
            height += this.getHeaderContent().clientHeight;
        }
        if (this.toolbar && !isNullOrUndefined(this.element.querySelector('.e-toolbar').clientHeight)) {
            height += this.element.querySelector('.e-toolbar').clientHeight;
        }
        if (this.allowPaging && !isNullOrUndefined(this.element.querySelector('.e-gridpager').clientHeight)) {
            height += this.element.querySelector('.e-gridpager').clientHeight;
        }
        if (this.showColumnChooser && !isNullOrUndefined(this.element.querySelector(".e-columnheader").clientHeight)) {
            height += this.element.querySelector(".e-columnheader").clientHeight;
        }
        if (this.allowGrouping && this.groupSettings.showDropArea && !isNullOrUndefined(this.element.querySelector('.e-groupdroparea').clientHeight)) {
            height += this.element.querySelector('.e-groupdroparea').clientHeight;
        }
        if (this.aggregates.length > 0 && !isNullOrUndefined(this.element.querySelector('.e-summaryrow').clientHeight)) {
            for (var i = 0; i < this.element.getElementsByClassName('e-summaryrow').length; i++) {
                height += this.element.getElementsByClassName('e-summaryrow')[i].clientHeight;
            }
        }
        return height;
    };
    /**
     *To perform aggregate operation on a column.
     *@param  {AggregateColumnModel} summaryCol - Pass Aggregate Column details.
     *@param  {Object} summaryData - Pass JSON Array for which its field values to be calculated.

     */
    Grid.prototype.getSummaryValues = function (summaryCol, summaryData) {
        return DataUtil.aggregates[summaryCol.type.toLowerCase()](summaryData, summaryCol.field);
    };
    /**
     * Sends a Post request to export Grid to Excel file in server side.
     * @param  {string} url - Pass Url for server side excel export action.
     * @return {void}
     */
    Grid.prototype.serverExcelExport = function (url) {
        this.isExcel = true;
        this.exportGrid(url);
    };
    /**
     * Sends a Post request to export Grid to Pdf file in server side.
     * @param  {string} url - Pass Url for server side pdf export action.
     * @return {void}
     */
    Grid.prototype.serverPdfExport = function (url) {
        this.isExcel = false;
        this.exportGrid(url);
    };
    /**
     * Sends a Post request to export Grid to CSV file in server side.
     * @param  {string} url - Pass Url for server side pdf export action.
     * @return {void}
     */
    Grid.prototype.serverCsvExport = function (url) {
        this.isExcel = true;
        this.exportGrid(url);
    };
    /**
     * @hidden
     */
    Grid.prototype.exportGrid = function (url) {
        var grid = this;
        var query = grid.getDataModule().generateQuery(true);
        var state = new UrlAdaptor().processQuery(new DataManager({ url: '' }), query);
        var queries = JSON.parse(state.data);
        var gridModel = JSON.parse(this.addOnPersist(['allowGrouping', 'allowPaging', 'pageSettings', 'sortSettings', 'allowPdfExport', 'allowExcelExport', 'aggregates',
            'filterSettings', 'groupSettings', 'columns', 'locale', 'searchSettings']));
        var include = ['field', 'headerText', 'type', 'format', 'visible', 'foreignKeyValue', 'foreignKeyField',
            'template', 'index', 'width', 'textAlign', 'headerTextAlign', 'columns'];
        gridModel.filterSettings.columns = queries.where;
        gridModel.searchSettings.fields = queries.search && queries.search[0]['fields'] || [];
        gridModel.sortSettings.columns = queries.sorted;
        gridModel.columns = this.setHeaderText(gridModel.columns, include);
        var form = this.createElement('form', { id: 'ExportForm', styles: 'display:none;' });
        var gridInput = this.createElement('input', { id: 'gridInput', attrs: { name: "gridModel" } });
        gridInput.value = JSON.stringify(gridModel);
        form.method = "POST";
        form.action = url;
        form.appendChild(gridInput);
        document.body.appendChild(form);
        form.submit();
        form.remove();
    };
    /**
     * @hidden
     */
    Grid.prototype.setHeaderText = function (columns, include) {
        for (var i = 0; i < columns.length; i++) {
            var column = this.getColumnByUid(columns[i].uid);
            columns[i].headerText = column.headerText;
            if (!isNullOrUndefined(column.template)) {
                columns[i].template = "true";
            }
            ;
            if (columns[i].format) {
                columns[i].format = getNumberFormat(this.getFormat(columns[i].format), columns[i].type, this.isExcel);
            }
            if (columns[i].columns) {
                this.setHeaderText(columns[i].columns, include);
            }
            var keys = Object.keys(columns[i]);
            for (var j = 0; j < keys.length; j++) {
                if (include.indexOf(keys[j]) < 0) {
                    delete columns[i][keys[j]];
                }
            }
        }
        return columns;
    };
    Grid.prototype.getFormat = function (format) {
        return typeof (format) === 'object' ? !isNullOrUndefined(format.format) ?
            format.format : format.skeleton : format;
    };
    /**
     * @hidden
     */
    Grid.prototype.isCollapseStateEnabled = function () {
        var isExpanded = 'isExpanded';
        return this[isExpanded] === false;
    };
    /**
     * @param {number} key - Defines the primary key value.
     * @param {Object} value - Defines the row data.

     */
    Grid.prototype.updateRowValue = function (key, rowData) {
        var args = {
            requestType: 'save', data: rowData,
        };
        this.showSpinner();
        this.notify(events.updateData, args);
        this.refresh();
    };
    /**
     * @hidden
     */
    Grid.prototype.setForeignKeyData = function () {
        this.dataBind();
        var colpending = this.getDataModule().getForeignKeyDataState();
        if (colpending.isPending) {
            this.getDataModule().setForeignKeyDataState({});
            colpending.resolver();
        }
        else {
            this.getDataModule().setForeignKeyDataState({ isDataChanged: false });
            if (this.contentModule || this.headerModule) {
                this.renderModule.render();
            }
        }
    };
    /**
     * @hidden
     */
    Grid.prototype.resetFilterDlgPosition = function (field) {
        var header = this.getColumnHeaderByField(field);
        if (header) {
            var target = header.querySelector('.e-filtermenudiv');
            var filterDlg = this.element.querySelector('.e-filter-popup');
            if (target && filterDlg) {
                var gClient = this.element.getBoundingClientRect();
                var fClient = target.getBoundingClientRect();
                if (filterDlg) {
                    filterDlg.style.left = (fClient.right - gClient.left).toString() + 'px';
                }
            }
        }
    };
    /**
     * @hidden
     */
    Grid.prototype.renderTemplates = function () {
        var portals = 'portals';
        this.notify('reactTemplateRender', this[portals]);
        this.renderReactTemplates();
    };
    /**
     * Apply the changes to the Grid without refreshing the rows.
     * @param  {BatchChanges} changes - Defines changes to be updated.
     * @return {void}
     */
    Grid.prototype.batchUpdate = function (changes) {
        this.processRowChanges(changes);
    };
    /**
     * Apply the changes to the Grid in one batch after 50ms without refreshing the rows.
     * @param  {BatchChanges} changes - Defines changes to be updated.
     * @return {void}
     */
    Grid.prototype.batchAsyncUpdate = function (changes) {
        this.processBulkRowChanges(changes);
    };
    Grid.prototype.processBulkRowChanges = function (changes) {
        var _this = this;
        if (!this.dataToBeUpdated) {
            this.dataToBeUpdated = Object.assign({ addedRecords: [], changedRecords: [], deletedRecords: [] }, changes);
            setTimeout(function () {
                _this.processRowChanges(_this.dataToBeUpdated);
                _this.dataToBeUpdated = null;
            }, this.asyncTimeOut);
        }
        else {
            var loopstring = [literals.addedRecords, literals.changedRecords, literals.deletedRecords];
            var keyField = this.getPrimaryKeyFieldNames()[0];
            for (var i = 0; i < loopstring.length; i++) {
                if (changes[loopstring[i]]) {
                    compareChanges(this, changes, loopstring[i], keyField);
                }
            }
        }
    };
    Grid.prototype.processRowChanges = function (changes) {
        var _this = this;
        var keyField = this.getPrimaryKeyFieldNames()[0];
        changes = Object.assign({ addedRecords: [], changedRecords: [], deletedRecords: [] }, changes);
        var promise = this.getDataModule().saveChanges(changes, keyField, {}, this.getDataModule().generateQuery().requiresCount());
        if (this.getDataModule().isRemote()) {
            promise.then(function (e) {
                _this.setNewData();
            });
        }
        else {
            this.setNewData();
        }
    };
    Grid.prototype.setNewData = function () {
        var _this = this;
        var oldValues = JSON.parse(JSON.stringify(this.getCurrentViewRecords()));
        var getData = this.getDataModule().getData({}, this.getDataModule().generateQuery().requiresCount());
        getData.then(function (e) {
            _this.bulkRefresh(e.result, oldValues, e.count);
        });
    };
    Grid.prototype.deleteRowElement = function (row) {
        var tr = this.getRowElementByUID(row.uid);
        var index = parseInt(tr.getAttribute(literals.ariaRowIndex), 10);
        remove(tr);
        if (this.getFrozenColumns()) {
            var mtr = this.getMovableRows()[index];
            remove(mtr);
        }
    };
    Grid.prototype.bulkRefresh = function (result, oldValues, count) {
        var _this = this;
        var rowObj = this.getRowsObject();
        var keyField = this.getPrimaryKeyFieldNames()[0];
        var _loop_3 = function (i) {
            if (!result.filter(function (e) { return e[keyField] === rowObj[i].data[keyField]; }).length) {
                this_3.deleteRowElement(rowObj[i]);
                rowObj.splice(i, 1);
                i--;
            }
            out_i_1 = i;
        };
        var this_3 = this, out_i_1;
        for (var i = 0; i < rowObj.length; i++) {
            _loop_3(i);
            i = out_i_1;
        }
        var _loop_4 = function (i) {
            var isRowExist;
            oldValues.filter(function (e) {
                if (e[keyField] === result[i][keyField]) {
                    if (e !== result[i]) {
                        _this.setRowData(result[i][keyField], result[i]);
                    }
                    isRowExist = true;
                }
            });
            if (!isRowExist) {
                this_4.renderRowElement(result[i], i);
            }
        };
        var this_4 = this;
        for (var i = 0; i < result.length; i++) {
            _loop_4(i);
        }
        this.currentViewData = result;
        var rows = [].slice.call(this.getContentTable().getElementsByClassName(literals.row));
        resetRowIndex(this, this.getRowsObject(), rows);
        setRowElements(this);
        if (this.allowPaging) {
            this.notify(events.inBoundModelChanged, { module: 'pager', properties: { totalRecordsCount: count } });
        }
    };
    Grid.prototype.renderRowElement = function (data, index) {
        var row = new RowRenderer(this.serviceLocator, null, this);
        var model = new RowModelGenerator(this);
        var modelData = model.generateRows([data]);
        var tr = row.render(modelData[0], this.getColumns());
        var mTr;
        var mTbody;
        this.addRowObject(modelData[0], index);
        var tbody = this.getContentTable().querySelector(literals.tbody);
        if (tbody.querySelector('.e-emptyrow')) {
            var emptyRow = tbody.querySelector('.e-emptyrow');
            emptyRow.parentNode.removeChild(emptyRow);
            if (this.getFrozenColumns()) {
                var moveTbody = this.getContent().querySelector('.' + literals.movableContent).querySelector(literals.tbody);
                (moveTbody.firstElementChild).parentNode.removeChild(moveTbody.firstElementChild);
            }
        }
        if (this.getFrozenColumns()) {
            mTr = renderMovable(tr, this.getFrozenColumns(), this);
            if (this.frozenRows && index < this.frozenRows) {
                mTbody = this.getHeaderContent().querySelector('.' + literals.movableHeader).querySelector(literals.tbody);
            }
            else {
                mTbody = this.getContent().querySelector('.' + literals.movableContent).querySelector(literals.tbody);
            }
            mTbody.appendChild(mTr);
            if (this.height === 'auto') {
                this.notify(events.frozenHeight, {});
            }
        }
        if (this.frozenRows && index < this.frozenRows) {
            tbody = this.getHeaderContent().querySelector(literals.tbody);
        }
        else {
            tbody = this.getContent().querySelector(literals.tbody);
        }
        tbody = this.getContent().querySelector(literals.tbody);
        tbody.appendChild(tr);
    };
    Grid.prototype.addRowObject = function (row, index) {
        var frzCols = this.getFrozenColumns();
        if (frzCols) {
            var mRows = this.getMovableRowsObject();
            var mRow = row.clone();
            mRow.cells = mRow.cells.slice(frzCols);
            row.cells = row.cells.slice(0, frzCols);
            mRows.splice(index, 1, mRow);
        }
        this.getRowsObject().splice(index, 1, row);
    };
    /**
     * @hidden
     */
    Grid.prototype.getHeight = function (height) {
        if (!Number.isInteger(height) && height.indexOf('%') != -1) {
            height = parseInt(height) / 100 * this.element.clientHeight;
        }
        else if (!Number.isInteger(height) && this.height !== 'auto') {
            height = parseInt(height);
        }
        else {
            height = this.height;
        }
        return height;
    };
    /** @hidden */
    Grid.prototype.getFrozenRightContent = function () {
        return this.getContent().querySelector('.e-frozen-right-content');
    };
    /** @hidden */
    Grid.prototype.getFrozenRightHeader = function () {
        return this.getHeaderContent().querySelector('.e-frozen-right-header');
    };
    /** @hidden */
    Grid.prototype.getMovableHeaderTbody = function () {
        return this.getMovableVirtualHeader().querySelector(literals.tbody);
    };
    /** @hidden */
    Grid.prototype.getMovableContentTbody = function () {
        return this.getMovableVirtualContent().querySelector(literals.tbody);
    };
    /** @hidden */
    Grid.prototype.getFrozenHeaderTbody = function () {
        return this.getFrozenVirtualHeader().querySelector(literals.tbody);
    };
    /** @hidden */
    Grid.prototype.getFrozenLeftContentTbody = function () {
        return this.getFrozenVirtualContent().querySelector(literals.tbody);
    };
    /** @hidden */
    Grid.prototype.getFrozenRightHeaderTbody = function () {
        return this.getFrozenRightHeader().querySelector(literals.tbody);
    };
    /** @hidden */
    Grid.prototype.getFrozenRightContentTbody = function () {
        var cnt = this.getFrozenRightContent();
        var tbody;
        if (cnt) {
            tbody = this.getFrozenRightContent().querySelector(literals.tbody);
        }
        return tbody;
    };
    /** @hidden */
    Grid.prototype.showResponsiveCustomFilter = function () {
        if (this.filterModule) {
            this.filterModule.showCustomFilter();
        }
    };
    /** @hidden */
    Grid.prototype.showResponsiveCustomSort = function () {
        if (this.sortModule) {
            this.sortModule.showCustomFilter();
        }
    };
    var Grid_1;
    __decorate([
        Property()
    ], Grid.prototype, "parentDetails", void 0);
    __decorate([
        Property([])
    ], Grid.prototype, "columns", void 0);
    __decorate([
        Property(true)
    ], Grid.prototype, "enableAltRow", void 0);
    __decorate([
        Property(true)
    ], Grid.prototype, "enableHover", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "enableAutoFill", void 0);
    __decorate([
        Property(true)
    ], Grid.prototype, "allowKeyboard", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "allowTextWrap", void 0);
    __decorate([
        Complex({}, TextWrapSettings)
    ], Grid.prototype, "textWrapSettings", void 0);
    __decorate([
        Complex({}, ResizeSettings)
    ], Grid.prototype, "resizeSettings", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "allowPaging", void 0);
    __decorate([
        Complex({}, PageSettings)
    ], Grid.prototype, "pageSettings", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "enableVirtualization", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "enableColumnVirtualization", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "enableInfiniteScrolling", void 0);
    __decorate([
        Complex({}, SearchSettings)
    ], Grid.prototype, "searchSettings", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "allowSorting", void 0);
    __decorate([
        Property('Ellipsis')
    ], Grid.prototype, "clipMode", void 0);
    __decorate([
        Property(true)
    ], Grid.prototype, "allowMultiSorting", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "allowExcelExport", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "allowPdfExport", void 0);
    __decorate([
        Complex({}, SortSettings)
    ], Grid.prototype, "sortSettings", void 0);
    __decorate([
        Complex({}, InfiniteScrollSettings)
    ], Grid.prototype, "infiniteScrollSettings", void 0);
    __decorate([
        Property(true)
    ], Grid.prototype, "allowSelection", void 0);
    __decorate([
        Property(-1)
    ], Grid.prototype, "selectedRowIndex", void 0);
    __decorate([
        Complex({}, SelectionSettings)
    ], Grid.prototype, "selectionSettings", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "allowFiltering", void 0);
    __decorate([
        Property('Horizontal')
    ], Grid.prototype, "rowRenderingMode", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "enableAdaptiveUI", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "allowReordering", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "allowResizing", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "allowRowDragAndDrop", void 0);
    __decorate([
        Complex({}, RowDropSettings)
    ], Grid.prototype, "rowDropSettings", void 0);
    __decorate([
        Complex({}, FilterSettings)
    ], Grid.prototype, "filterSettings", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "allowGrouping", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "enableImmutableMode", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "showColumnMenu", void 0);
    __decorate([
        Complex({}, GroupSettings)
    ], Grid.prototype, "groupSettings", void 0);
    __decorate([
        Complex({}, EditSettings)
    ], Grid.prototype, "editSettings", void 0);
    __decorate([
        Collection([], AggregateRow)
    ], Grid.prototype, "aggregates", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "showColumnChooser", void 0);
    __decorate([
        Complex({}, ColumnChooserSettings)
    ], Grid.prototype, "columnChooserSettings", void 0);
    __decorate([
        Property(false)
    ], Grid.prototype, "enableHeaderFocus", void 0);
    __decorate([
        Property('auto')
    ], Grid.prototype, "height", void 0);
    __decorate([
        Property('auto')
    ], Grid.prototype, "width", void 0);
    __decorate([
        Property('Default')
    ], Grid.prototype, "gridLines", void 0);
    __decorate([
        Property()
    ], Grid.prototype, "rowTemplate", void 0);
    __decorate([
        Property()
    ], Grid.prototype, "detailTemplate", void 0);
    __decorate([
        Property()
    ], Grid.prototype, "childGrid", void 0);
    __decorate([
        Property()
    ], Grid.prototype, "queryString", void 0);
    __decorate([
        Property('AllPages')
    ], Grid.prototype, "printMode", void 0);
    __decorate([
        Property('Expanded')
    ], Grid.prototype, "hierarchyPrintMode", void 0);
    __decorate([
        Property([])
    ], Grid.prototype, "dataSource", void 0);
    __decorate([
        Property(null)
    ], Grid.prototype, "rowHeight", void 0);
    __decorate([
        Property()
    ], Grid.prototype, "query", void 0);
    __decorate([
        Property('USD')
    ], Grid.prototype, "currencyCode", void 0);
    __decorate([
        Property()
    ], Grid.prototype, "toolbar", void 0);
    __decorate([
        Property()
    ], Grid.prototype, "contextMenuItems", void 0);
    __decorate([
        Property()
    ], Grid.prototype, "columnMenuItems", void 0);
    __decorate([
        Property()
    ], Grid.prototype, "toolbarTemplate", void 0);
    __decorate([
        Property()
    ], Grid.prototype, "pagerTemplate", void 0);
    __decorate([
        Property(0)
    ], Grid.prototype, "frozenRows", void 0);
    __decorate([
        Property(0)
    ], Grid.prototype, "frozenColumns", void 0);
    __decorate([
        Property('All')
    ], Grid.prototype, "columnQueryMode", void 0);
    __decorate([
        Property({})
    ], Grid.prototype, "currentAction", void 0);
    __decorate([
        Property('19.1.63')
    ], Grid.prototype, "ej2StatePersistenceVersion", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "created", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "destroyed", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "load", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "rowDataBound", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "queryCellInfo", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "headerCellInfo", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "actionBegin", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "actionComplete", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "actionFailure", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "dataBound", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "recordDoubleClick", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "recordClick", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "rowSelecting", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "rowSelected", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "rowDeselecting", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "rowDeselected", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "cellSelecting", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "cellSelected", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "cellDeselecting", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "cellDeselected", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "columnSelecting", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "columnSelected", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "columnDeselecting", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "columnDeselected", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "columnDragStart", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "columnDrag", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "columnDrop", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "printComplete", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "beforePrint", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "pdfQueryCellInfo", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "pdfHeaderQueryCellInfo", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "pdfAggregateQueryCellInfo", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "excelAggregateQueryCellInfo", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "exportDetailDataBound", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "excelQueryCellInfo", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "excelHeaderQueryCellInfo", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "beforeExcelExport", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "excelExportComplete", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "beforePdfExport", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "pdfExportComplete", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "rowDragStartHelper", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "detailDataBound", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "rowDragStart", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "rowDrag", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "rowDrop", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "toolbarClick", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "beforeOpenColumnChooser", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "batchAdd", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "batchDelete", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "batchCancel", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "beforeBatchAdd", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "beforeBatchDelete", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "beforeBatchSave", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "beginEdit", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "commandClick", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "cellEdit", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "cellSave", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "cellSaved", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "resizeStart", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "resizing", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "resizeStop", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "keyPressed", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "beforeDataBound", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "contextMenuOpen", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "contextMenuClick", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "columnMenuOpen", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "columnMenuClick", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "checkBoxChange", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "beforeCopy", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "beforePaste", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "beforeAutoFill", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "columnDataStateChange", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "dataStateChange", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "dataSourceChanged", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "exportGroupCaption", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "lazyLoadGroupExpand", void 0);
    __decorate([
        Event()
    ], Grid.prototype, "lazyLoadGroupCollapse", void 0);
    Grid = Grid_1 = __decorate([
        NotifyPropertyChanges
    ], Grid);
    return Grid;
}(Component));
export { Grid };
