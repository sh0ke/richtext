import { IAction, IGrid, ResponsiveDialogArgs } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
import { Column } from '../models/column';
import { ResponsiveDialogAction } from '../base/enum';
/**
 *
 * The `ResponsiveDialogRenderer` module is used to render the responsive dialogs.
 */
export declare class ResponsiveDialogRenderer implements IAction {
    private parent;
    private serviceLocator;
    private customResponsiveDlg;
    private customFilterDlg;
    private customColumnDiv;
    private filterParent;
    private customExcelFilterParent;
    private sortedCols;
    private isSortApplied;
    private filterClearBtn;
    private saveBtn;
    private backBtn;
    private sortPredicate;
    private filteredCol;
    private isCustomDlgRender;
    private isFiltered;
    private isRowResponsive;
    private isDialogClose;
    private onActionCompleteFn;
    action: ResponsiveDialogAction;
    private evtHandlers;
    /**
     * Constructor for Grid Responsive dialog renderer
     * @hidden
     */
    constructor(parent?: IGrid, serviceLocator?: ServiceLocator);
    addEventListener(): void;
    private customExFilterClose;
    private renderCustomFilterDiv;
    private renderResponsiveContextMenu;
    private refreshCustomFilterClearBtn;
    private refreshCustomFilterOkBtn;
    private renderResponsiveContent;
    private getSortedFieldsAndDirections;
    private sortButtonClickHandler;
    private resetSortButtons;
    private setSortedCols;
    private getCurrentSortedFields;
    private customFilterColumnClickHandler;
    /**
     * To show the responsive custom filter dialog
     * @return {void}
     * @hidden
     */
    showResponsiveDialog(col?: Column): void;
    private setTopToChildDialog;
    private renderCustomFilterDialog;
    private getDialogOptions;
    private renderResponsiveDialog;
    private dialogCreated;
    private dialogOpen;
    private beforeDialogClose;
    private sortColumn;
    private getHeaderTitle;
    private getDialogName;
    private getButtonText;
    /** @hidden */
    renderResponsiveHeader(col: Column, args?: ResponsiveDialogArgs, isCustomFilter?: boolean): HTMLElement | string;
    private filterClear;
    private dialogHdrBtnClickHandler;
    private closeCustomDialog;
    private destroyCustomFilterDialog;
    private closeCustomFilter;
    private removeCustomDlgFilterEle;
    private setCustomFilterHeader;
    private keyHandler;
    private editComplate;
    removeEventListener(): void;
}
