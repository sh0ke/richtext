import { Column } from '../models/column';
import { IEditCell } from '../base/interface';
import { EditCellBase } from './edit-cell-base';
/**
 * `DatePickerEditCell` is used to handle datepicker cell type editing.
 * @hidden
 */
export declare class DatePickerEditCell extends EditCellBase implements IEditCell {
    write(args: {
        rowData: Object;
        element: Element;
        column: Column;
        type: string;
        row: HTMLElement;
        requestType: string;
    }): void;
}