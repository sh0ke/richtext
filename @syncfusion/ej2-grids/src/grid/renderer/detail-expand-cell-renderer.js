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
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { CellRenderer } from './cell-renderer';
/**
 * ExpandCellRenderer class which responsible for building group expand cell.
 * @hidden
 */
var DetailExpandCellRenderer = /** @class */ (function (_super) {
    __extends(DetailExpandCellRenderer, _super);
    function DetailExpandCellRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.element = _this.parent.createElement('TD', {
            className: 'e-detailrowcollapse',
            attrs: { 'aria-expanded': 'false', role: 'gridcell', tabindex: '-1' }
        });
        return _this;
    }
    /**
     * Function to render the detail expand cell
     */
    DetailExpandCellRenderer.prototype.render = function (cell, data, attributes) {
        var node = this.element.cloneNode();
        if (attributes && !isNullOrUndefined(attributes['class'])) {
            node.className = '';
            node.className = attributes['class'];
            node.appendChild(this.parent.createElement('div', { className: 'e-icons e-dtdiagonaldown e-icon-gdownarrow' }));
        }
        else {
            node.appendChild(this.parent.createElement('div', { className: 'e-icons e-dtdiagonalright e-icon-grightarrow' }));
        }
        return node;
    };
    return DetailExpandCellRenderer;
}(CellRenderer));
export { DetailExpandCellRenderer };
