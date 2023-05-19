export class Utility {
    static ParentByAttributeIsComponent(node) {
        var parent = node.parentNode;
        while (true) {
            var rs = parent.getAttribute("isComponent");
            if (rs == "false")
                break;
            parent = parent.parentNode;
        }
        return parent;
    }
}
//# sourceMappingURL=Utility.js.map