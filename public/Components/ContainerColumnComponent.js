import { ComponentHelper } from "../Common/ComponentHelper.js";
import { BaseComponent } from "./BaseComponent.js";
export class ContainerColumnComponent extends BaseComponent {
    constructor(id) {
        super(id);
        this.columnCount = 2;
    }
    Create(control) {
        var cdiv = document.createElement('div');
        cdiv.setAttribute("iscomponent", "false");
        if (!this.isComponent)
            cdiv.setAttribute("compName", "ContainerColumn");
        //cdiv.setAttribute("class","col-5");
        cdiv.setAttribute("style", "min-height: 50px;");
        cdiv.id = this.Id;
        cdiv.className = "col-" + (12 / this.columnCount) + " ContainerColumn";
        cdiv.draggable = false;
        cdiv.ondrop = x => {
            x.preventDefault();
            const element = ((x.target == x.currentTarget) ? x.currentTarget : x.target);
            var data = x.dataTransfer.getData("text");
            if (x.dataTransfer.effectAllowed === 'copy') {
                var cmp = ComponentHelper.Create(data);
                element.appendChild(cmp);
            }
            if (x.dataTransfer.effectAllowed === 'move') {
                var moveitem = document.getElementById(data);
                if (moveitem != null) {
                    element.appendChild(moveitem);
                }
            }
        };
        cdiv.ondragleave = x => {
            x.preventDefault();
            const element = ((x.target == x.currentTarget) ? x.currentTarget : x.target);
            //element.className="col-6";
            //this.ClearTempDiv(element);    
        };
        cdiv.ondragenter = x => {
            x.preventDefault();
            const element = ((x.target == x.currentTarget) ? x.currentTarget : x.target);
            // element.className="col-6 ContainerColumn";
        };
        return cdiv;
    }
    static CreateColumn(columnCount) {
        var cdiv = document.createElement('div');
        return cdiv;
    }
}
//# sourceMappingURL=ContainerColumnComponent.js.map