import { IRichTextEditor } from '../base/interface';
/**
 * XhtmlValidation module called when set enableXhtml as true
 */
export declare class XhtmlValidation {
    private parent;
    private currentElement;
    constructor(parent?: IRichTextEditor);
    private addEventListener;
    private removeEventListener;
    private enableXhtmlValidation;
    /**
     * @param {string} currentValue - specifies the string value.
     * @returns {void}

     */
    selfEncloseValidation(currentValue: string): string;
    private AddRootElement;
    private clean;
    private ImageTags;
    private removeTags;
    private RemoveElementNode;
    private RemoveUnsupported;
    private RemoveAttributeByName;
}
