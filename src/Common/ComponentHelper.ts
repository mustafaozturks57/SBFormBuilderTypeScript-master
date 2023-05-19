import { ContainerComponent } from "../Components/ContainerComponent.js";
import { DivComponent } from "../Components/DivComponent.js";
import { LSelectboxComponent } from "../Components/LSelectboxComponent.js";
import { LTextboxComponent } from "../Components/LTextboxComponent.js";
import { Guid } from "../Common/Guid.js";
import { TabComponent } from "../Components/TabComponent.js";
import { DataTableComponent } from "../Components/DataTableComponent.js";
import { BaseComponent } from "../Components/BaseComponent.js";

export class ComponentHelper {    
   public static Create(controlType:string=""): HTMLElement {
       var id = Guid.newGuid();
        var item:BaseComponent;
          switch (controlType) {
              case "LTextbox":
                  item=new LTextboxComponent(id);
                  break;
              case "LSelectbox":
                  item=new LSelectboxComponent(id);
                  break;
                  
              case "Container":
                  item=new ContainerComponent(id);
                    break;
              case "Tabs":
                  item=new TabComponent(id);
                    break;
              case "DataTable":
                  item=new DataTableComponent(id);
                    break;
              case "Div":
                  item=new DivComponent(id);
                    break;
              default:
                item=new DivComponent("Div");
                  break;
          }
          if(item!=null)
          {
            item.Id=id;
            item.isComponent=false;
            item.draggable=true;
          }else
          {return null;}
          
        return item.Create(null);
    }
   
}