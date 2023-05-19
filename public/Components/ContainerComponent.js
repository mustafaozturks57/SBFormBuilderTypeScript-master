import { BaseComponent } from "./BaseComponent.js";
import { ContainerColumnComponent } from "./ContainerColumnComponent.js";
export class ContainerComponent extends BaseComponent {
    constructor() {
        super(...arguments);
        this.columnCount = 2;
    }
    Create(pcontrol) {
        var control = document.createElement("div");
        control.setAttribute("iscomponent", String(this.isComponent));
        if (!this.isComponent) {
            let toolbar = super.CreateToolBar();
            control.appendChild(toolbar);
            var divcol = new ContainerColumnComponent("ContainerColumn");
            for (let index = 0; index < this.columnCount; index++) {
                divcol.columnCount = this.columnCount;
                control.appendChild(divcol.Create(null));
            }
            //control.appendChild(divcol.Create());
            //control.appendChild(divcol.Create());
            control.setAttribute("compName", "Container");
            control.setAttribute("style", "background-color:#b9b3b3a3;");
            control.className = "component-prepared";
            control.className = "row margin0";
        }
        else {
            control.className = "component-common";
            control.appendChild(super.CreateSpan("fa fa-columns", "Container"));
        }
        control.draggable = this.draggable;
        control.ondragstart = x => {
            // var dc=control.attributes.getNamedItem("iscomponent");
            // if(dc.value=="false")
            //    {
            //        x.preventDefault();
            //        return;
            //    }
            const element = x.target;
            x.dataTransfer.effectAllowed = element.className == "component-common" ? "copy" : "move";
            x.dataTransfer.dropEffect = element.className == "component-common" ? "copy" : "move";
            x.dataTransfer.setData("text", element.id);
        };
        control.id = this.Id;
        super.Create(control);
        return control;
    }
}
//# sourceMappingURL=ContainerComponent.js.map