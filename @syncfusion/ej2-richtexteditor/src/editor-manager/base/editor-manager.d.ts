import { Observer } from '@syncfusion/ej2-base';
import { ICommandModel } from './interface';
import { EditorExecCommand as ExecCommand } from './types';
import { Lists } from './../plugin/lists';
import { NodeSelection } from './../../selection/index';
import { DOMNode } from './../plugin/dom-node';
import { Formats } from './../plugin/formats';
import { LinkCommand } from './../plugin/link';
import { Alignments } from './../plugin/alignments';
import { Indents } from './../plugin/indents';
import { ImageCommand } from './../plugin/image';
import { TableCommand } from './../plugin/table';
import { SelectionBasedExec } from './../plugin/selection-exec';
import { InsertHtmlExec } from './../plugin/inserthtml-exec';
import { ClearFormatExec } from './../plugin/clearformat-exec';
import { UndoRedoManager } from './../plugin/undo';
import { MsWordPaste } from '../plugin/ms-word-clean-up';
import { InsertTextExec } from '../plugin/insert-text';
/**
 * EditorManager internal component
 *
 * @hidden

 */
export declare class EditorManager {
    currentDocument: HTMLDocument;
    observer: Observer;
    listObj: Lists;
    nodeSelection: NodeSelection;
    domNode: DOMNode;
    formatObj: Formats;
    linkObj: LinkCommand;
    alignmentObj: Alignments;
    indentsObj: Indents;
    imgObj: ImageCommand;
    tableObj: TableCommand;
    selectionObj: SelectionBasedExec;
    inserthtmlObj: InsertHtmlExec;
    insertTextObj: InsertTextExec;
    clearObj: ClearFormatExec;
    undoRedoManager: UndoRedoManager;
    msWordPaste: MsWordPaste;
    editableElement: Element;
    /**
     * Constructor for creating the component
     *
     * @hidden

     */
    constructor(options: ICommandModel);
    private wireEvents;
    private onWordPaste;
    private onPropertyChanged;
    private editorKeyDown;
    private editorKeyUp;
    /**
     * execCommand
     *
     * @param {ExecCommand} command - specifies the execution command
     * @param {T} value - specifes the value.
     * @param {Event} event - specifies the call back event
     * @param {Function} callBack - specifies the function
     * @param {string} text - specifies the string value
     * @param {T} exeValue - specifies the values to be executed
     * @param {string} selector - specifies the selector values
     * @returns {void}
     * @hidden

     */
    execCommand<T>(command: ExecCommand, value: T, event?: Event, callBack?: Function, text?: string | Node, exeValue?: T, selector?: string): void;
}
