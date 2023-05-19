import { BaseComponent } from "./BaseComponent.js";
import { ComponentHelper } from "../Common/ComponentHelper.js";
export class DivComponent extends BaseComponent {
    constructor(id) {
        id = "Div";
        super(id);
    }
    Create(control) {
        var cdiv = document.createElement('div');
        cdiv.setAttribute("iscomponent", String(this.isComponent));
        if (this.isComponent) {
            cdiv.className = "component-common";
            cdiv.appendChild(super.CreateSpan("fa fa-tablet", "Div"));
        }
        else {
            let toolbar = super.CreateToolBar();
            cdiv.appendChild(toolbar);
            cdiv.setAttribute("compName", "Div");
            cdiv.setAttribute("style", "background-color:#f5f3ed;;width: 100%;height: 400px;");
            cdiv.className = "component-prepared";
        }
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
        cdiv.ondragstart = x => {
            const element = x.target;
            x.dataTransfer.effectAllowed = element.className == "component-common" ? "copy" : "move";
            x.dataTransfer.dropEffect = element.className == "component-common" ? "copy" : "move";
            x.dataTransfer.setData("text", element.id);
        };
        cdiv.id = this.Id;
        cdiv.draggable = this.draggable;
        super.Create(cdiv);
        return cdiv;
    }
}
//# sourceMappingURL=DivComponent.js.map