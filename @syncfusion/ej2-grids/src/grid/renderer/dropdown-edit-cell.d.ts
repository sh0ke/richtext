import { IGrid, IEditCell } from '../base/interface';
import { Column } from '../models/column';
import { EditCellBase } from './edit-cell-base';
/**
 * `DropDownEditCell` is used to handle dropdown cell type editing.
 * @hidden
 */
export declare class DropDownEditCell extends EditCellBase implements IEditCell {
    private column;
    private flag;
    constructor(parent?: IGrid);
    write(args: {
        rowData: Object;
        element: Element;
        column: Column;
        row: HTMLElement;
        requestType: string;
    }): void;
    private dropdownCreated;
    private ddActionComplete;
    private dropDownOpen;
}
