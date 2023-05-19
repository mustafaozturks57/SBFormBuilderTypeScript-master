import { BaseComponent } from "./BaseComponent.js";
export class LTextboxComponent extends BaseComponent {
    constructor(id) {
        super(id);
    }
    Create(pcontrol) {
        var control = document.createElement('div');
        control.setAttribute("iscomponent", String(this.isComponent));
        if (!this.isComponent) {
            let toolbar = super.CreateToolBar();
            control.appendChild(toolbar);
            control.appendChild(this.CreateLabel());
            control.appendChild(this.CreateTextbox());
            control.className = "component-prepared";
        }
        else {
            control.className = "component-common";
            control.appendChild(super.CreateSpan("fa fa-font", "Text Field"));
        }
        control.setAttribute("compName", "LTextbox");
        control.setAttribute("disabled", "");
        control.draggable = this.draggable;
        control.ondragstart = x => {
            const element = x.target;
            x.dataTransfer.effectAllowed = element.className == "component-common" ? "copy" : "move";
            x.dataTransfer.dropEffect = element.className == "component-common" ? "copy" : "move";
            x.dataTransfer.setData("text", element.id);
        };
        super.Create(control);
        return control;
    }
    CreateLabel() {
        var label = document.createElement("label");
        label.textContent = "Label Textbox";
        label.id = this.Id + "_label";
        return label;
    }
    CreateTextbox() {
        var textbox = document.createElement("input");
        textbox.setAttribute("type", "text");
        textbox.setAttribute("disabled", "");
        textbox.id = this.Id + "_input";
        return textbox;
    }
}
//# sourceMappingURL=LTextboxComponent.js.map