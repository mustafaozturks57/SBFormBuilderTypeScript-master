import { Utility } from "../Common/Utility.js";
import { ComponentProperties } from "./ComponentProperties.js";
import { IBaseComponent } from "./IBaseComponent.js";

export abstract class BaseComponent implements IBaseComponent {
  Id: string;
  name: string;
  style: string;
  draggable: boolean;
  isComponent: boolean;
  constructor(id: string) {
    this.Id = id;
  }

  Create(control: HTMLElement): HTMLElement {
    control.id = this.Id;
    return control;
  }
  CreateToolBar(): HTMLElement {
    var tb = document.createElement("div");
    tb.id = "toolbar";
    tb.className = "toolbar";
    tb.setAttribute("style", "height: 20px;width: 100%;");
    var tball = document.createElement("div");
    tball.className = "component-btn-group";
    var tbRemove = document.createElement("div");
    tbRemove.className = "btn btn-xxs btn-danger component-settings-button component-settings-button-remove  float-right";
    tbRemove.setAttribute("title", "Kontrolü kaldır");
    tbRemove.addEventListener('click', function (event) {
      var ppanel = document.getElementById("cpropGrid");
      ppanel.childNodes.forEach(element => {
        element.remove();
      });
      var eln = event.currentTarget as HTMLElement;
      eln.parentElement.parentElement.parentElement.remove();
    });
    var removei = document.createElement("i");
    removei.className = "fa fa-remove";
    tbRemove.appendChild(removei);

    var tbEdit = document.createElement("div");
    tbEdit.className = "btn btn-xxs btn-secondary component-settings-button component-settings-button-edit float-left";
    tbEdit.setAttribute("title", "Özellikler");
    tbEdit.addEventListener('click', function (event) {
      var ppanel = document.getElementById("cpropGrid");
      ppanel.childNodes.forEach(element => {
        element.remove();
      });
      var eln = event.currentTarget as HTMLElement;
      var componentProperties = new ComponentProperties();
      var table = componentProperties.Create(eln.parentElement.parentElement.parentElement);
      ppanel.appendChild(table);
      ppanel.setAttribute("selectedInput", eln.parentElement.parentElement.parentElement.id);
    });
    var editi = document.createElement("i");
    editi.className = "fa fa-cog";
    tbEdit.appendChild(editi)


    var tbMove = document.createElement("div");
    tbMove.className = "btn btn-xxs btn-secondary component-settings-button component-settings-button-move  float-left";
    tbMove.setAttribute("title", "Sürekle Bırak");
    tbMove.ondragstart = x => {
      const element = x.target as HTMLInputElement
      var data = Utility.ParentByAttributeIsComponent(element);
      x.dataTransfer.items.clear();
      x.dataTransfer.clearData("text");
      x.dataTransfer.setData("text", data.id);
      x.dataTransfer.effectAllowed = "move";
      console.log(data.id);
    };
    // tbMove.addEventListener('click', function (event) {
    // alert('sdfsdf');
    //   var ppanel=document.getElementById("cpropGrid");
    // ppanel.childNodes.forEach(element => {
    //   element.remove();
    // });
    //         var eln = event.currentTarget as HTMLElement;
    //         var componentProperties=new ComponentProperties();
    //         var table=componentProperties.Create(eln.parentElement.parentElement.parentElement);
    //         ppanel.appendChild(table);
    // });
    var movei = document.createElement("i");
    movei.className = "fa fa-arrows";
    tbMove.appendChild(movei)

    tball.appendChild(tbMove);
    tball.appendChild(tbEdit);
    tball.appendChild(tbRemove);
    tb.appendChild(tball);
    return tb;
  }
  CreateSpan(cicon: string, title: string): HTMLElement {
    var i = document.createElement("i");
    i.className = cicon;
    i.setAttribute("style", "margin-right: 5px");
    var span = document.createElement("span");
    span.setAttribute("style", "margin-right: 26px");
    var cspan = span.cloneNode(true);
    cspan.textContent = title;
    span.appendChild(i);
    span.appendChild(cspan);
    return span;
  }
}