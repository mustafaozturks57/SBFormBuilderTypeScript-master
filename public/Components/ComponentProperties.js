import { PropertiesOfControl } from "../Common/PropertiesOfControl.js";
export class ComponentProperties {
    Create(selectedControl) {
        var table = document.createElement("Table");
        table.className = "pgTable";
        var row = table.insertRow(0);
        row.className = "pgGroupRow";
        var cell1 = row.insertCell(0);
        cell1.setAttribute("colspan", "2");
        cell1.appendChild(this.CreateEditorLabel());
        var row2 = table.insertRow(1);
        row2.className = "pgRow";
        var cell = row2.insertCell(0);
        cell.className = "pgCell";
        cell.innerText = "Comp. Name";
        cell = row2.insertCell(1);
        cell.className = "pgCell";
        cell.setAttribute("style", "color:red");
        //cell.innerText=selectedControl.getAttribute("compname");        
        var comName = document.createElement("input");
        comName.value = selectedControl.getAttribute("compname");
        comName.id = "P_CompName";
        comName.disabled = true;
        cell.appendChild(comName);
        var row1 = table.insertRow(2);
        row1.className = "pgRow";
        var cell = row1.insertCell(0);
        cell.className = "pgCell";
        cell.innerText = "Id";
        cell = row1.insertCell(1);
        cell.className = "pgCell";
        cell.setAttribute("style", "color:black");
        //cell.innerText=selectedControl.getAttribute("id");
        var comId = document.createElement("input");
        comId.value = selectedControl.getAttribute("id");
        comId.id = "P_CompId";
        comId.disabled = true;
        cell.appendChild(comId);
        PropertiesOfControl.ComponentPropertiesDic[selectedControl.getAttribute("compname")].forEach(element => {
            var row = table.insertRow(element.id + 3);
            row.className = "pgRow";
            var cell = row.insertCell(0);
            cell.className = "pgCell";
            cell.innerText = element.title;
            cell = row.insertCell(1);
            cell.className = "pgCell";
            var txt = this.CreateInput(element.name, element.title, element.ctype);
            cell.appendChild(txt);
        });
        var div = document.createElement("div");
        div.className = "propGrid";
        div.setAttribute("style", "float:left; margin-left:10px");
        div.appendChild(table);
        return div;
    }
    CreateInput(name, title, ctype) {
        var rs = null;
        switch (ctype) {
            case "textbox":
                rs = document.createElement("input");
                break;
            case "checkbox":
                rs = document.createElement("input");
                rs.type = "checkbox";
                rs.onchange = x => {
                    var selectedInputId = document.getElementById("cpropGrid").attributes.getNamedItem("selectedInput").value;
                    var selectedInput = document.getElementById(selectedInputId);
                    var tg = x.target;
                    var dt = tg.checked;
                    selectedInput.setAttribute(name, String(dt));
                };
                break;
            case "label":
                rs = document.createElement("label");
                ;
                rs.textContent = title;
                rs.setAttribute("style", "margin-right: 26px");
                break;
            default:
                break;
        }
        rs.id = name;
        rs.onkeyup = x => {
            //var selectedInputId= document.getElementById("cpropGrid").attributes.getNamedItem("selectedInput").value
            var compname = document.getElementById("P_CompName");
            var compId = document.getElementById("P_CompId");
            var tg = x.target;
            // compId.setAttribute(name, tg.value);
            if (name == "P_Caption") {
                // var labelselectedInput= document.getElementById(compId.value+"_label");
                // labelselectedInput.textContent=tg.value;
            }
            else if (name == "P_ColumnCount") {
                var container = document.getElementById(compId.value);
                var ccount = container.querySelectorAll('ContainerColumn').length;
                if (Number.parseInt(tg.value) > ccount) {
                    for (let index = ccount; index < Number.parseInt(tg.value); index++) {
                        //var div= ContainerColumnComponent.CreateColumn(Number.parseInt(tg.value))
                        // container.appendChild(div);
                    }
                }
            }
        };
        rs.className = "propertyInput";
        return rs;
    }
    CreateEditorLabel() {
        var label = document.createElement("label");
        label.textContent = "Editör";
        label.setAttribute("style", "margin-right: 26px");
        return label;
    }
}
//# sourceMappingURL=ComponentProperties.js.map