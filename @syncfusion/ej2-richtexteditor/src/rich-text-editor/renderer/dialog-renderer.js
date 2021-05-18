import { Dialog } from '@syncfusion/ej2-popups';
import { isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
/**
 * Dialog Renderer
 */
var DialogRenderer = /** @class */ (function () {
    function DialogRenderer(parent) {
        this.parent = parent;
    }
    /**
     * dialog render method
     *
     * @param {DialogModel} e - specifies the dialog model.
     * @returns {void}
     * @hidden

     */
    DialogRenderer.prototype.render = function (e) {
        var dlgObj;
        e.beforeOpen = this.beforeOpen.bind(this);
        e.open = this.open.bind(this);
        if (isNOU(e.close)) {
            e.close = this.close.bind(this);
        }
        e.beforeClose = this.beforeClose.bind(this);
        // eslint-disable-next-line
        dlgObj = new Dialog(e);
        dlgObj.isStringTemplate = true;
        return dlgObj;
    };
    DialogRenderer.prototype.beforeOpen = function (args) {
        this.parent.trigger(events.beforeDialogOpen, args);
    };
    // eslint-disable-next-line
    DialogRenderer.prototype.open = function (args) {
        this.parent.trigger(events.dialogOpen, args);
    };
    DialogRenderer.prototype.beforeClose = function (args) {
        this.parent.trigger(events.beforeDialogClose, args, function (closeArgs) {
            if (!closeArgs.cancel) {
                if (closeArgs.container.classList.contains('e-popup-close')) {
                    closeArgs.cancel = true;
                }
            }
        });
    };
    /**
     * dialog close method
     *
     * @param {Object} args - specifies the arguments.
     * @returns {void}
     * @hidden

     */
    // eslint-disable-next-line
    DialogRenderer.prototype.close = function (args) {
        this.parent.trigger(events.dialogClose, args);
    };
    return DialogRenderer;
}());
export { DialogRenderer };