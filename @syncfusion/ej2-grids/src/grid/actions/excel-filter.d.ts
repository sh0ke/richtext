import { FilterSettings } from '../base/grid';
import { IGrid, IFilterArgs, FilterUI } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
import { ExcelFilterBase } from '../common/excel-filter-base';
import { CheckBoxFilter } from './checkbox-filter';
import { Column } from '../models/column';
/**
 * @hidden
 * `ExcelFilter` module is used to handle filtering action.
 */
export declare class ExcelFilter extends CheckBoxFilter {
    protected parent: IGrid;
    excelFilterBase: ExcelFilterBase;
    isresetFocus: boolean;
    /**
     * Constructor for excelbox filtering module
     * @hidden
     */
    constructor(parent?: IGrid, filterSettings?: FilterSettings, serviceLocator?: ServiceLocator, customFltrOperators?: Object);
    /**
     * To destroy the excel filter.
     * @return {void}
     * @hidden
     */
    destroy(): void;
    openDialog(options: IFilterArgs): void;
    closeDialog(): void;
    protected clearCustomFilter(col: Column): void;
    protected closeResponsiveDialog(isCustomFilter: boolean): void;
    protected applyCustomFilter(args: {
        col: Column;
        isCustomFilter: boolean;
    }): void;
    filterByColumn(fieldName: string, firstOperator: string, firstValue: string | number | Date | boolean, predicate?: string, matchCase?: boolean, ignoreAccent?: boolean, secondOperator?: string, secondValue?: string | number | Date | boolean): void;
    /**
     * @hidden
     */
    getFilterUIInfo(): FilterUI;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
}
