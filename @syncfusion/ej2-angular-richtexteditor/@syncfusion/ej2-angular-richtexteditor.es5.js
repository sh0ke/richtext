var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, Injector, NgModule, Renderer2, ViewContainerRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentBase, ComponentMixins, FormBase, Template, setValue } from '@syncfusion/ej2-angular-base';
import { Count, FileManager, HtmlEditor, Image, Link, MarkdownEditor, PasteCleanup, QuickToolbar, Resize, RichTextEditor, Table, Toolbar } from '@syncfusion/ej2-richtexteditor';
import { CommonModule } from '@angular/common';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
};
var inputs = ['autoSaveOnIdle', 'backgroundColor', 'cssClass', 'editorMode', 'enableAutoUrl', 'enableHtmlEncode', 'enableHtmlSanitizer', 'enablePersistence', 'enableResize', 'enableRtl', 'enableTabKey', 'enableXhtml', 'enabled', 'fileManagerSettings', 'floatingToolbarOffset', 'fontColor', 'fontFamily', 'fontSize', 'format', 'formatter', 'height', 'htmlAttributes', 'iframeSettings', 'inlineMode', 'insertImageSettings', 'keyConfig', 'locale', 'maxLength', 'pasteCleanupSettings', 'placeholder', 'quickToolbarSettings', 'readonly', 'saveInterval', 'showCharCount', 'tableSettings', 'toolbarSettings', 'undoRedoSteps', 'undoRedoTimer', 'value', 'valueTemplate', 'width'];
var outputs = ['actionBegin', 'actionComplete', 'afterImageDelete', 'afterPasteCleanup', 'beforeDialogClose', 'beforeDialogOpen', 'beforeImageDrop', 'beforeImageUpload', 'beforePasteCleanup', 'beforeQuickToolbarOpen', 'beforeSanitizeHtml', 'blur', 'change', 'created', 'destroyed', 'dialogClose', 'dialogOpen', 'focus', 'imageRemoving', 'imageSelected', 'imageUploadFailed', 'imageUploadSuccess', 'imageUploading', 'quickToolbarClose', 'quickToolbarOpen', 'resizeStart', 'resizeStop', 'resizing', 'toolbarClick', 'toolbarStatusUpdate', 'updatedToolbarStatus', 'valueChange'];
var twoWays = ['value'];
/**
 * `ejs-richtexteditor` represents the Angular richtexteditor Component.
 * ```html
 * <ejs-richtexteditor></ejs-richtexteditor>
 * ```
 */
var RichTextEditorComponent = RichTextEditorComponent_1 = /** @class */ (function (_super) {
    __extends(RichTextEditorComponent, _super);
    /**
     * @param {?} ngEle
     * @param {?} srenderer
     * @param {?} viewContainerRef
     * @param {?} injector
     */
    function RichTextEditorComponent(ngEle, srenderer, viewContainerRef, injector) {
        var _this = _super.call(this) || this;
        _this.ngEle = ngEle;
        _this.srenderer = srenderer;
        _this.viewContainerRef = viewContainerRef;
        _this.injector = injector;
        _this.skipFromEvent = true;
        _this.element = _this.ngEle.nativeElement;
        _this.injectedModules = _this.injectedModules || [];
        try {
            var mod = _this.injector.get('RichTextEditorToolbar');
            if (_this.injectedModules.indexOf(mod) === -1) {
                _this.injectedModules.push(mod);
            }
        }
        catch (_a) { }
        try {
            var mod = _this.injector.get('RichTextEditorLink');
            if (_this.injectedModules.indexOf(mod) === -1) {
                _this.injectedModules.push(mod);
            }
        }
        catch (_b) { }
        try {
            var mod = _this.injector.get('RichTextEditorImage');
            if (_this.injectedModules.indexOf(mod) === -1) {
                _this.injectedModules.push(mod);
            }
        }
        catch (_c) { }
        try {
            var mod = _this.injector.get('RichTextEditorCount');
            if (_this.injectedModules.indexOf(mod) === -1) {
                _this.injectedModules.push(mod);
            }
        }
        catch (_d) { }
        try {
            var mod = _this.injector.get('RichTextEditorQuickToolbar');
            if (_this.injectedModules.indexOf(mod) === -1) {
                _this.injectedModules.push(mod);
            }
        }
        catch (_e) { }
        try {
            var mod = _this.injector.get('RichTextEditorHtmlEditor');
            if (_this.injectedModules.indexOf(mod) === -1) {
                _this.injectedModules.push(mod);
            }
        }
        catch (_f) { }
        try {
            var mod = _this.injector.get('RichTextEditorMarkdownEditor');
            if (_this.injectedModules.indexOf(mod) === -1) {
                _this.injectedModules.push(mod);
            }
        }
        catch (_g) { }
        try {
            var mod = _this.injector.get('RichTextEditorTable');
            if (_this.injectedModules.indexOf(mod) === -1) {
                _this.injectedModules.push(mod);
            }
        }
        catch (_h) { }
        try {
            var mod = _this.injector.get('RichTextEditorPasteCleanup');
            if (_this.injectedModules.indexOf(mod) === -1) {
                _this.injectedModules.push(mod);
            }
        }
        catch (_j) { }
        try {
            var mod = _this.injector.get('RichTextEditorResize');
            if (_this.injectedModules.indexOf(mod) === -1) {
                _this.injectedModules.push(mod);
            }
        }
        catch (_k) { }
        try {
            var mod = _this.injector.get('RichTextEditorFileManager');
            if (_this.injectedModules.indexOf(mod) === -1) {
                _this.injectedModules.push(mod);
            }
        }
        catch (_l) { }
        _this.registerEvents(outputs);
        _this.addTwoWay.call(_this, twoWays);
        setValue('currentInstance', _this, _this.viewContainerRef);
        _this.formContext = new FormBase();
        _this.formCompContext = new ComponentBase();
        return _this;
    }
    /**
     * @param {?} registerFunction
     * @return {?}
     */
    RichTextEditorComponent.prototype.registerOnChange = function (registerFunction) {
    };
    /**
     * @param {?} registerFunction
     * @return {?}
     */
    RichTextEditorComponent.prototype.registerOnTouched = function (registerFunction) {
    };
    /**
     * @param {?} value
     * @return {?}
     */
    RichTextEditorComponent.prototype.writeValue = function (value) {
    };
    /**
     * @param {?} disabled
     * @return {?}
     */
    RichTextEditorComponent.prototype.setDisabledState = function (disabled) {
    };
    /**
     * @return {?}
     */
    RichTextEditorComponent.prototype.ngOnInit = function () {
        this.formCompContext.ngOnInit(this);
    };
    /**
     * @return {?}
     */
    RichTextEditorComponent.prototype.ngAfterViewInit = function () {
        this.formContext.ngAfterViewInit(this);
    };
    /**
     * @return {?}
     */
    RichTextEditorComponent.prototype.ngOnDestroy = function () {
        this.formCompContext.ngOnDestroy(this);
    };
    /**
     * @return {?}
     */
    RichTextEditorComponent.prototype.ngAfterContentChecked = function () {
        this.formCompContext.ngAfterContentChecked(this);
    };
    return RichTextEditorComponent;
}(RichTextEditor));
RichTextEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'ejs-richtexteditor',
                inputs: inputs,
                outputs: outputs,
                template: '',
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return RichTextEditorComponent_1; }),
                        multi: true
                    }
                ],
                queries: {}
            },] },
];
/**
 * @nocollapse
 */
RichTextEditorComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: ViewContainerRef, },
    { type: Injector, },
]; };
RichTextEditorComponent.propDecorators = {
    'valueTemplate': [{ type: ContentChild, args: ['valueTemplate',] },],
};
__decorate([
    Template(),
    __metadata("design:type", Object)
], RichTextEditorComponent.prototype, "valueTemplate", void 0);
RichTextEditorComponent = RichTextEditorComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase]),
    __metadata("design:paramtypes", [ElementRef,
        Renderer2,
        ViewContainerRef,
        Injector])
], RichTextEditorComponent);
var RichTextEditorComponent_1;
/**
 * NgModule definition for the RichTextEditor component.
 */
var RichTextEditorModule = /** @class */ (function () {
    function RichTextEditorModule() {
    }
    return RichTextEditorModule;
}());
RichTextEditorModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [
                    RichTextEditorComponent
                ],
                exports: [
                    RichTextEditorComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
RichTextEditorModule.ctorParameters = function () { return []; };
var ToolbarService = { provide: 'RichTextEditorToolbar', useValue: Toolbar };
var LinkService = { provide: 'RichTextEditorLink', useValue: Link };
var ImageService = { provide: 'RichTextEditorImage', useValue: Image };
var CountService = { provide: 'RichTextEditorCount', useValue: Count };
var QuickToolbarService = { provide: 'RichTextEditorQuickToolbar', useValue: QuickToolbar };
var HtmlEditorService = { provide: 'RichTextEditorHtmlEditor', useValue: HtmlEditor };
var MarkdownEditorService = { provide: 'RichTextEditorMarkdownEditor', useValue: MarkdownEditor };
var TableService = { provide: 'RichTextEditorTable', useValue: Table };
var PasteCleanupService = { provide: 'RichTextEditorPasteCleanup', useValue: PasteCleanup };
var ResizeService = { provide: 'RichTextEditorResize', useValue: Resize };
var FileManagerService = { provide: 'RichTextEditorFileManager', useValue: FileManager };
/**
 * NgModule definition for the RichTextEditor component with providers.
 */
var RichTextEditorAllModule = /** @class */ (function () {
    function RichTextEditorAllModule() {
    }
    return RichTextEditorAllModule;
}());
RichTextEditorAllModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, RichTextEditorModule],
                exports: [
                    RichTextEditorModule
                ],
                providers: [
                    ToolbarService,
                    LinkService,
                    ImageService,
                    CountService,
                    QuickToolbarService,
                    HtmlEditorService,
                    MarkdownEditorService,
                    TableService,
                    PasteCleanupService,
                    ResizeService,
                    FileManagerService
                ]
            },] },
];
/**
 * @nocollapse
 */
RichTextEditorAllModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */
export { RichTextEditorComponent, RichTextEditorModule, RichTextEditorAllModule, ToolbarService, LinkService, ImageService, CountService, QuickToolbarService, HtmlEditorService, MarkdownEditorService, TableService, PasteCleanupService, ResizeService, FileManagerService, inputs as ɵa, outputs as ɵb };
export { Toolbar, KeyboardEvents, BaseToolbar, BaseQuickToolbar, QuickToolbar, Count, ColorPickerInput, MarkdownToolbarStatus, ExecCommandCallBack, ToolbarAction, MarkdownEditor, HtmlEditor, PasteCleanup, Resize, DropDownButtons, FileManager, FullScreen, setAttributes, HtmlToolbarStatus, XhtmlValidation, HTMLFormatter, Formatter, MarkdownFormatter, ContentRender, Render, ToolbarRenderer, Link, Image, ViewSource, Table, DialogRenderer, IframeContentRender, MarkdownRender, PopupRenderer, RichTextEditor, RenderType, ToolbarType, executeGroup, created, destroyed, load, initialLoad, contentChanged, initialEnd, iframeMouseDown, destroy, toolbarClick, toolbarRefresh, refreshBegin, toolbarUpdated, bindOnEnd, renderColorPicker, htmlToolbarClick, markdownToolbarClick, destroyColorPicker, modelChanged, keyUp, keyDown, mouseUp, toolbarCreated, toolbarRenderComplete, enableFullScreen, disableFullScreen, dropDownSelect, beforeDropDownItemRender, execCommandCallBack, imageToolbarAction, linkToolbarAction, windowResize, resizeStart, onResize, resizeStop, undo, redo, insertLink, unLink, editLink, openLink, actionBegin, actionComplete, updatedToolbarStatus, actionSuccess, updateToolbarItem, insertImage, insertCompleted, imageLeft, imageRight, imageCenter, imageBreak, imageInline, imageLink, imageAlt, imageDelete, imageCaption, imageSize, sourceCode, updateSource, toolbarOpen, beforeDropDownOpen, selectionSave, selectionRestore, expandPopupClick, count, contentFocus, contentBlur, mouseDown, sourceCodeMouseDown, editAreaClick, scroll, contentscroll, colorPickerChanged, tableColorPickerChanged, focusChange, selectAll, selectRange, getSelectedHtml, renderInlineToolbar, paste, imgModule, rtlMode, createTable, docClick, tableToolbarAction, checkUndo, readOnlyMode, pasteClean, beforeDialogOpen, dialogOpen, beforeDialogClose, dialogClose, beforeQuickToolbarOpen, quickToolbarOpen, quickToolbarClose, popupHide, imageSelected, imageUploading, imageUploadSuccess, imageUploadFailed, imageRemoving, afterImageDelete, drop, xhtmlValidation, beforeImageUpload, resizeInitialized, renderFileManager, beforeImageDrop, dynamicModule, beforePasteCleanup, afterPasteCleanup, updateTbItemsStatus, CLS_RTE, CLS_RTL, CLS_CONTENT, CLS_DISABLED, CLS_SCRIPT_SHEET, CLS_STYLE_SHEET, CLS_TOOLBAR, CLS_TB_FIXED, CLS_TB_FLOAT, CLS_TB_ABS_FLOAT, CLS_INLINE, CLS_TB_INLINE, CLS_RTE_EXPAND_TB, CLS_FULL_SCREEN, CLS_QUICK_TB, CLS_POP, CLS_TB_STATIC, CLS_QUICK_POP, CLS_QUICK_DROPDOWN, CLS_IMAGE_POP, CLS_INLINE_POP, CLS_INLINE_DROPDOWN, CLS_DROPDOWN_POPUP, CLS_DROPDOWN_ICONS, CLS_DROPDOWN_ITEMS, CLS_DROPDOWN_BTN, CLS_RTE_CONTENT, CLS_TB_ITEM, CLS_TB_EXTENDED, CLS_TB_WRAP, CLS_POPUP, CLS_SEPARATOR, CLS_MINIMIZE, CLS_MAXIMIZE, CLS_BACK, CLS_SHOW, CLS_HIDE, CLS_VISIBLE, CLS_FOCUS, CLS_RM_WHITE_SPACE, CLS_IMGRIGHT, CLS_IMGLEFT, CLS_IMGCENTER, CLS_IMGBREAK, CLS_CAPTION, CLS_RTE_CAPTION, CLS_CAPINLINE, CLS_IMGINLINE, CLS_COUNT, CLS_WARNING, CLS_ERROR, CLS_ICONS, CLS_ACTIVE, CLS_EXPAND_OPEN, CLS_RTE_ELEMENTS, CLS_TB_BTN, CLS_HR_SEPARATOR, CLS_TB_IOS_FIX, CLS_FORMATS_TB_BTN, CLS_FONT_NAME_TB_BTN, CLS_FONT_SIZE_TB_BTN, CLS_FONT_COLOR_TARGET, CLS_BACKGROUND_COLOR_TARGET, CLS_COLOR_CONTENT, CLS_FONT_COLOR_DROPDOWN, CLS_BACKGROUND_COLOR_DROPDOWN, CLS_COLOR_PALETTE, CLS_FONT_COLOR_PICKER, CLS_BACKGROUND_COLOR_PICKER, CLS_RTE_READONLY, CLS_TABLE_SEL, CLS_TB_DASH_BOR, CLS_TB_ALT_BOR, CLS_TB_COL_RES, CLS_TB_ROW_RES, CLS_TB_BOX_RES, CLS_RTE_HIDDEN, CLS_RTE_PASTE_KEEP_FORMAT, CLS_RTE_PASTE_REMOVE_FORMAT, CLS_RTE_PASTE_PLAIN_FORMAT, CLS_RTE_PASTE_OK, CLS_RTE_PASTE_CANCEL, CLS_RTE_DIALOG_MIN_HEIGHT, CLS_RTE_RES_HANDLE, CLS_RTE_RES_EAST, CLS_RTE_IMAGE, CLS_RESIZE, CLS_IMG_FOCUS, CLS_RTE_DRAG_IMAGE, CLS_RTE_UPLOAD_POPUP, CLS_POPUP_OPEN, CLS_IMG_RESIZE, CLS_DROPAREA, CLS_IMG_INNER, CLS_UPLOAD_FILES, CLS_RTE_DIALOG_UPLOAD, CLS_RTE_RES_CNT, CLS_CUSTOM_TILE, CLS_NOCOLOR_ITEM, CLS_TABLE, CLS_TABLE_BORDER, CLS_RTE_TABLE_RESIZE, CLS_RTE_FIXED_TB_EXPAND, CLS_RTE_TB_ENABLED, getIndex, hasClass, getDropDownValue, isIDevice, getFormattedFontSize, pageYOffset, getTooltipText, setToolbarStatus, getCollection, getTBarItemsIndex, updateUndoRedoStatus, dispatchEvent, parseHtml, getTextNodesUnder, toObjectLowerCase, getEditValue, updateTextNode, isEditableValueEmpty, decode, sanitizeHelper, convertToBlob, getLocaleFontFormat, updateDropDownFontFormatLocale, ServiceLocator, RendererFactory, EditorManager, IMAGE, TABLE, LINK, INSERT_ROW, INSERT_COLUMN, DELETEROW, DELETECOLUMN, REMOVETABLE, TABLEHEADER, TABLE_VERTICAL_ALIGN, TABLE_MERGE, TABLE_VERTICAL_SPLIT, TABLE_HORIZONTAL_SPLIT, TABLE_MOVE, ALIGNMENT_TYPE, INDENT_TYPE, DEFAULT_TAG, BLOCK_TAGS, IGNORE_BLOCK_TAGS, TABLE_BLOCK_TAGS, SELECTION_TYPE, INSERTHTML_TYPE, INSERT_TEXT_TYPE, CLEAR_TYPE, CLASS_IMAGE_RIGHT, CLASS_IMAGE_LEFT, CLASS_IMAGE_CENTER, CLASS_IMAGE_BREAK, CLASS_CAPTION, CLASS_RTE_CAPTION, CLASS_CAPTION_INLINE, CLASS_IMAGE_INLINE, Lists, markerClassName, DOMNode, Alignments, Indents, Formats, LinkCommand, InsertMethods, InsertTextExec, InsertHtmlExec, InsertHtml, IsFormatted, MsWordPaste, NodeCutter, ImageCommand, SelectionCommands, SelectionBasedExec, ClearFormatExec, UndoRedoManager, TableCommand, statusCollection, ToolbarStatus, NodeSelection, MarkdownParser, LISTS_COMMAND, selectionCommand, LINK_COMMAND, CLEAR_COMMAND, MD_TABLE, ClearFormat, MDLists, MDFormats, MarkdownSelection, UndoRedoCommands, MDSelectionFormats, MDLink, MDTable, markdownFormatTags, markdownSelectionTags, markdownListsTags, htmlKeyConfig, markdownKeyConfig, pasteCleanupGroupingTags, listConversionFilters, selfClosingTags, KEY_DOWN, ACTION, FORMAT_TYPE, KEY_DOWN_HANDLER, LIST_TYPE, KEY_UP_HANDLER, KEY_UP, MODEL_CHANGED_PLUGIN, MODEL_CHANGED, MS_WORD_CLEANUP_PLUGIN, MS_WORD_CLEANUP } from '@syncfusion/ej2-richtexteditor';
//# sourceMappingURL=ej2-angular-richtexteditor.es5.js.map
