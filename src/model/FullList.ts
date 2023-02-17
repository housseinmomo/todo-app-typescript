import ListItem from "./ListIem";

interface List {
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void
    removeItem(id: string): void
}



export default class FullList implements List {

    // singleton pattern : une seule instance par classe
    static instance: FullList = new FullList()

    private constructor(private _list: ListItem[] = []){}

    // setter & getter 
    set list(newList: ListItem[]){ this._list = newList }

    get list(): ListItem[] { return this._list }

    // methodes 
    load(): void {

        // recuperer les datas depuis le localstorage 
        const storedList: string | null = localStorage.getItem("myList")
        
        // si le storedList retourne null on sort de la fonction
        if(typeof storedList !== "string") { return }
        console.log(storedList);
        const parsedList: {_id: string, _item: string, _checked: boolean}[]  = JSON.parse(storedList)

        parsedList.forEach((item) => {
            // on creer un nouvel objet de listItem 
            const newItem: ListItem = new ListItem(item._id, item._item, item._checked)
            
            // on ajoute a la liste tous les nouveau item creer  
            FullList.instance.addItem(newItem)
        })
    }

    // enregistrer les donnees de la liste au niveau du localStorage
    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list))
    }

    // On reinitialise la list []
    clearList(): void {
        this._list = []
        this.save()
    }
    
    // On enregistre un nouvel item
    addItem(itemObj: ListItem): void {
        this._list.push(itemObj)
        this.save()
    }
    
    // On supprime un item de la liste
    removeItem(id: string): void {
        // On stocke dans la nouvelle liste l'ensemble des item qui n'ont pas ce id (id du l'item a supprimer)
        // Pour se faire on utilise la methode filter 
        this._list = this._list.filter((item) => item.id !== id)
        this.save()
    }

    
}