import { BaseComponent } from "./BaseComponent.js";

export class LSelectboxComponent extends BaseComponent{
    constructor(id:string) {
        super(id);
    }
    Create(pcontrol: HTMLElement): HTMLElement {
                var control=document.createElement('div');
                control.setAttribute("iscomponent",String(this.isComponent));
                
                if(!this.isComponent)
                {
                    let toolbar=super.CreateToolBar();
                    control.appendChild(toolbar);
                    control.appendChild(this.CreateLabel());
                    control.appendChild(this.CreateTextbox());
                    control.setAttribute("style"," margin: 5PX;")
                    control.className="component-prepared"
                }else
                {
                    control.className="component-common";
                    control.appendChild(super.CreateSpan("fa fa-list","Selectbox"));
                }
                control.setAttribute("compName","LSelectbox");
                control.setAttribute("disabled","");
               
               control.id=this.Id;
               control.draggable=this.draggable;
               control.ondragstart=x=>{
                    const element = x.target as HTMLInputElement
                    x.dataTransfer.effectAllowed = element.className=="component-common"?"copy":"move";
                    x.dataTransfer.dropEffect = element.className=="component-common"?"copy":"move";
                    x.dataTransfer.setData("text", element.id);
                };        
                super.Create(control);
                return control;
    } 
          
            private CreateLabel(){
                var label=document.createElement("label");
                label.textContent="Label SelectBox";
                label.setAttribute("style","margin-right: 26px");
                label.id=this.Id+"_label";
                return label;
            }
            private  CreateTextbox(){
               var textbox= document.createElement("select");
               textbox.setAttribute("type","text");
               textbox.setAttribute("disabled","");
               textbox.setAttribute("style","width: 100px;");
               textbox.id=this.Id+"_input";
               return textbox;
            }
    
}