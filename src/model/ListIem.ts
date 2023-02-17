export interface Item {
    id: string,
    item: string,
    checked: boolean
}

export default class ListItem implements Item {
    
    constructor(
        private _id: string = '',
        private _item: string = '',
        private _checked: boolean = false
    ){}


    
    public set id(v : string) {
        this._id = v;
    }

    public set item(v : string) {
        this._item = v;
    }
    public set checked(v : boolean) {
        this._checked = v;
    }

    
    public get id() : string {
        return this._id
    }
    
    public get item() : string {
        return this._item
    }

    public get checked() : boolean {
        return this._checked
    }
    
}