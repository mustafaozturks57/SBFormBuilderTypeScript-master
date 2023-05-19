
export interface IBaseComponent {
    Id: string;
    name: string;
    style: string;
    isComponent: boolean;
    draggable: boolean;
    Create(control :HTMLElement):HTMLElement
    CreateToolBar(): HTMLElement
}