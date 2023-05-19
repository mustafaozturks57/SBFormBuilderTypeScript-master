export class ControlInfo {
    compName: string;
    Attributes: { [key: string]: string }={};
    subComps: Array<ControlInfo>;
    constructor(_compName: string, _subComps: Array<ControlInfo>) {
        this.compName = _compName;
        this.subComps = _subComps;       
    }
}