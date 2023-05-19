import { BaseComponent } from "./BaseComponent.js";
export class DataTableComponent extends BaseComponent {
    constructor(id) {
        id = "DataTable";
        super(id);
    }
    Create(control) {
        var cdiv = document.createElement('div');
        cdiv.setAttribute("iscomponent", String(this.isComponent));
        if (this.isComponent) {
            cdiv.className = "component-common";
            cdiv.appendChild(super.CreateSpan("fa fa-table", "DataTable"));
        }
        else {
            var data = [
                { "Column1": "Mount Everest", "Column2": 8848, "Column3": "Nepal" },
                { "name": "Mount Everest", "height": 8848, "country": "Nepal" },
                { "name": "Mount Everest", "height": 8848, "country": "Nepal" },
                { "name": "Mount Everest", "height": 8848, "country": "Nepal" },
                { "name": "Mount Everest", "height": 8848, "country": "Nepal" },
                { "name": "Mount Everest", "height": 8848, "country": "Nepal" },
                { "name": "Mount Rushmore", "height": 18, "country": "USA" }
            ];
            let toolbar = super.CreateToolBar();
            cdiv.appendChild(toolbar);
            cdiv.setAttribute("compName", "DataTable");
            cdiv.setAttribute("style", "background-color:#f5f3ed;;width: 100%;");
            cdiv.className = "component-prepared";
            var ctable = document.createElement("table");
            ctable.className = "gridtable";
            ctable.setAttribute("width", "100%");
            cdiv.appendChild(ctable);
            var thead = document.createElement("thead");
            var tbody = document.createElement("tbody");
            var headRow = document.createElement("tr");
            ["Name", "Height", "Country"].forEach(function (el) {
                var th = document.createElement("th");
                th.appendChild(document.createTextNode(el));
                headRow.appendChild(th);
            });
            thead.appendChild(headRow);
            ctable.appendChild(thead);
            data.forEach(function (el) {
                var tr = document.createElement("tr");
                tr.setAttribute("style", "height: 25px;");
                for (var o in el) {
                    var td = document.createElement("td");
                    //td.appendChild(document.createTextNode(el[o]))
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            });
            ctable.appendChild(tbody);
        }
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
//# sourceMappingURL=DataTableComponent.js.map