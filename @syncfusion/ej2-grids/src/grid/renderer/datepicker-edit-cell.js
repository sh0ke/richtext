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
import { extend } from '@syncfusion/ej2-base';
import { DatePicker, DateTimePicker } from '@syncfusion/ej2-calendars';
import { isEditable, getObject, getCustomDateFormat } from '../base/util';
import { EditCellBase } from './edit-cell-base';
/**
 * `DatePickerEditCell` is used to handle datepicker cell type editing.
 * @hidden
 */
var DatePickerEditCell = /** @class */ (function (_super) {
    __extends(DatePickerEditCell, _super);
    function DatePickerEditCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DatePickerEditCell.prototype.write = function (args) {
        if (args.column.editType === 'datepickeredit') {
            this.obj = new DatePicker(extend(dateanddatetimerender(args, this.parent.editSettings.mode, this.parent.enableRtl), args.column.edit.params));
        }
        else if (args.column.editType === 'datetimepickeredit') {
            this.obj = new DateTimePicker(extend(dateanddatetimerender(args, this.parent.editSettings.mode, this.parent.enableRtl), args.column.edit.params));
        }
        this.obj.appendTo(args.element);
    };
    return DatePickerEditCell;
}(EditCellBase));
export { DatePickerEditCell };
function dateanddatetimerender(args, mode, rtl) {
    var isInline = mode !== 'Dialog';
    var format = getCustomDateFormat(args.column.format, args.column.type);
    var value = getObject(args.column.field, args.rowData);
    value = value ? new Date(value) : null;
    return {
        floatLabelType: isInline ? 'Never' : 'Always',
        value: value,
        format: format,
        placeholder: isInline ?
            '' : args.column.headerText, enableRtl: rtl,
        enabled: isEditable(args.column, args.requestType, args.element),
    };
}