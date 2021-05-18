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
import { extend, isNullOrUndefined, select } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, DataUtil, Predicate } from '@syncfusion/ej2-data';
import { isEditable, getComplexFieldID, getObject } from '../base/util';
import { parentsUntil } from '../base/util';
import { EditCellBase } from './edit-cell-base';
/**
 * `DropDownEditCell` is used to handle dropdown cell type editing.
 * @hidden
 */
var DropDownEditCell = /** @class */ (function (_super) {
    __extends(DropDownEditCell, _super);
    function DropDownEditCell(parent) {
        var _this = 
        //constructor
        _super.call(this) || this;
        _this.parent = parent;
        _this.flag = false;
        return _this;
    }
    DropDownEditCell.prototype.write = function (args) {
        var isInline = this.parent.editSettings.mode !== 'Dialog';
        this.column = args.column;
        var pred = new Predicate(args.column.field, 'notequal', null, true, false);
        var params = {};
        if (args.column.edit.params) {
            var keys = Object.keys(args.column.edit.params);
            for (var i = 0; i < keys.length; i++) {
                params[keys[i]] = keys[i] === 'query' ? args.column.edit.params[keys[i]].clone() : args.column.edit.params[keys[i]];
            }
        }
        this.obj = new DropDownList(extend({
            dataSource: this.parent.dataSource instanceof DataManager ?
                this.parent.dataSource : new DataManager(this.parent.dataSource),
            query: new Query().where(pred).select(args.column.field), enabled: isEditable(args.column, args.requestType, args.element),
            fields: { value: args.column.field },
            value: getObject(args.column.field, args.rowData),
            enableRtl: this.parent.enableRtl, actionComplete: this.ddActionComplete.bind(this),
            created: this.dropdownCreated.bind(this),
            placeholder: isInline ? '' : args.column.headerText, popupHeight: '200px',
            floatLabelType: isInline ? 'Never' : 'Always', open: this.dropDownOpen.bind(this),
            sortOrder: 'Ascending'
        }, params));
        this.obj.query.params = this.parent.query.params;
        this.obj.appendTo(args.element);
        /* tslint:disable-next-line:no-any */
        args.element.setAttribute('name', getComplexFieldID(args.column.field));
    };
    DropDownEditCell.prototype.dropdownCreated = function (e) {
        this.flag = true;
    };
    DropDownEditCell.prototype.ddActionComplete = function (e) {
        e.result = DataUtil.distinct(e.result, this.obj.fields.value, true);
        if (this.flag && this.column.dataSource) {
            if ('result' in this.column.dataSource) {
                this.column.dataSource.result = e.result;
            }
            else if (this.column.dataSource instanceof DataManager) {
                this.column.dataSource.dataSource.json = e.result;
            }
        }
        this.flag = false;
    };
    DropDownEditCell.prototype.dropDownOpen = function (args) {
        var dlgElement = parentsUntil(this.obj.element, 'e-dialog');
        if (this.parent.editSettings.mode === 'Dialog' && !isNullOrUndefined(dlgElement)) {
            var dlgObj = select('#' + dlgElement.id, document).ej2_instances[0];
            args.popup.element.style.zIndex = (dlgObj.zIndex + 1).toString();
        }
    };
    return DropDownEditCell;
}(EditCellBase));
export { DropDownEditCell };
