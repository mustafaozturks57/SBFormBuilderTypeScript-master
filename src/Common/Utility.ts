export class Utility {  
    public static ParentByAttributeIsComponent(node:HTMLElement):HTMLElement {
        var parent = node.parentNode as HTMLElement;
        while (true) {
          var rs= parent.getAttribute("isComponent");
          if(rs=="false") break;
           parent = parent.parentNode as HTMLElement; 
        }
        return parent;
      }
}