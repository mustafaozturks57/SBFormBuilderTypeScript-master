import { table } from "node:console";
import { ContainerComponent } from "./Components/ContainerComponent.js";
import { LTextboxComponent } from "./Components/LTextboxComponent.js";
import { IBaseComponent } from "./Components/IBaseComponent.js";
import { DivComponent } from "./Components/DivComponent.js";
import { ComponentHelper } from "./Common/ComponentHelper.js";
import { LSelectboxComponent } from "./Components/LSelectboxComponent.js";
import { TabComponent } from "./Components/TabComponent.js";
import { DataTableComponent } from "./Components/DataTableComponent.js";
import { ControlInfo } from "./Model/ControlInfo.js";
import { PropertiesOfControl } from "./Common/PropertiesOfControl.js";
export class Layout {
    constructor() {
        this.CreateToolbar();
        this.CreateAndLoadLayoutPanel();
    }
    CreateToolbar() {
        var btnSave = document.getElementById("btnSave");
        btnSave.onclick = x => {
            var exportArray = new Array();
            var layout = document.getElementById("LayoutPanel");
            var coms = this.RecursiveEach(layout);
            if (coms.length > 0)
                exportArray.push(this.RecursiveEach(layout));

            console.log(JSON.stringify(exportArray));
        }
        var btnSave = document.getElementById("btnLoad");
        btnSave.onclick = x => {
            alert("load");
        }
    }

    RecursiveEach(melm: HTMLElement): Array<ControlInfo> {
        var localarr = new Array();
        for (let index = 0; index < melm.children.length; index++) {
            const element = melm.children[index] as HTMLElement;
            var _obj: ControlInfo = null;
            if (element.getAttribute("compname") != undefined) {
                _obj = new ControlInfo(element.getAttribute("compname"), new Array<ControlInfo>());
                localarr.push(_obj);
                var prop = PropertiesOfControl.ComponentPropertiesDic[element.getAttribute("compname")];
                if (prop!=undefined && prop.length > 0)
                    prop.forEach(attr => {
                        var val = element.getAttribute(attr.name);
                        _obj.Attributes[attr.name] = val;
                    });
            }
            var coms = this.RecursiveEach(element);
            if (coms.length > 0) {
                _obj.subComps = coms;
            }
        }

        return localarr;
    }
    Load() {
        var viewstr = '[[{"compName":"LTextbox","subComps":[]},{"compName":"LSelectbox","subComps":[]},{"compName":"Container","subComps":[{"compName":"ContainerColumn","subComps":[{"compName":"LTextbox","subComps":[]}]},{"compName":"ContainerColumn","subComps":[{"compName":"LSelectbox","subComps":[]}]}]}]]';
        var layoutArray = JSON.parse(viewstr);
        var layoutPanel = document.getElementById("LayoutPanel");
        this.RecursiveLoad(layoutPanel, layoutArray);
    }
    RecursiveLoad(layoutPanel: HTMLElement, layoutArray: any) {
        for (let index = 0; index < layoutArray.length; index++) {
            const element = layoutArray[index];
            console.log(element.compName);
        }
    }
    
    

    CreateAndLoadLayoutPanel() {
        var layoutPanel = document.createElement('div');
        layoutPanel.id = "LayoutPanel";
        layoutPanel.setAttribute("style", " border: solid 1px #014cef;background-color:#8080800a;height: 65em !important;");

        layoutPanel.ondragenter = x => {
            x.preventDefault();
            const element = x.currentTarget as HTMLInputElement
            var cmp = document.getElementById("divtmp");
            if (cmp == null && x.currentTarget == x.target) {
                element.className = "droptarget"
                // var cmp=this.GetHTMLElement("divtmp");
                // element.appendChild(cmp);
            }
            console.log("ondragenter" + x.dataTransfer.getData("text"));
        };

        layoutPanel.ondragleave = x => {
            x.preventDefault();
            const element = x.currentTarget as HTMLInputElement
            layoutPanel.className = "";
            console.log("ondragleave" + x.dataTransfer.getData("text"));
        };

        layoutPanel.ondragstart = x => {
            console.log("ondragstart" + x.dataTransfer.getData("text"));
            // x.dataTransfer.setData("text",x.dataTransfer.getData("text"))
        };
        layoutPanel.ondragover = x => {
            console.log("ondragover" + x.dataTransfer.getData("text"));
            x.preventDefault();
        };
        layoutPanel.ondrop = x => {
            x.preventDefault();
            const element = x.currentTarget as HTMLInputElement
            var data = x.dataTransfer.getData("text");
            console.log("sonuç" + data);
            if (x.currentTarget == x.target) {
                var cmp = ComponentHelper.Create(data);
                if (cmp == null && data != null) {
                    cmp = document.getElementById(data);
                    element.appendChild(cmp);
                } else {
                    element.appendChild(cmp);
                    element.className = "";
                }
            }
        };
        document.getElementById("MainPanel").appendChild(layoutPanel);

        let tb: IBaseComponent = new LTextboxComponent("LTextbox")
        tb.isComponent = true;
        tb.draggable = true;
        document.getElementById("components").appendChild(tb.Create(null));

        tb = new LSelectboxComponent("LSelectbox");
        tb.isComponent = true;
        tb.draggable = true;
        document.getElementById("components").appendChild(tb.Create(null));

        tb = new ContainerComponent("Container");
        tb.isComponent = true;
        tb.draggable = true;
        document.getElementById("components").appendChild(tb.Create(null));

        tb = new DivComponent("Div");
        tb.isComponent = true;
        tb.draggable = true;
        document.getElementById("components").appendChild(tb.Create(null));

        tb = new TabComponent("Tabs");
        tb.isComponent = true;
        tb.draggable = true;
        document.getElementById("components").appendChild(tb.Create(null));

        tb = new DataTableComponent("DataTable");
        tb.isComponent = true;
        tb.draggable = true;
        document.getElementById("components").appendChild(tb.Create(null));
    }

};


