import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListIem'
import ListTemplate from './templates/listTemplate'



function initApp(): void {
  const fullList: FullList = FullList.instance
  const template: ListTemplate = ListTemplate.instance

  const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement
  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault()

    // L'objectif est d'enregistrer dans la liste un nouvelle item 

    // on recuperer le champs de saisie 
    const input = document.getElementById("newItem") as HTMLInputElement
    // on extrait la valeur saisie et on supprime les espace
    const newEntryText: string = input.value.trim()
    // on s'assure que la valeur saisie n'est pas vide (taille) sinon on quitte
    if(!newEntryText.length) return 

    // on genere un id pour le nouveau item
    // on recupere le id du dernier element de la liste et on l'incremente de 1 
    const itemId: number = fullList.list.length ?
    parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1

    // creation de notre nouvelle item : creer depuis le input du user 
    const newItem: ListItem = new ListItem(itemId.toString(), newEntryText)
    
     // On enregistre un nouvel item dans le localstorage
    fullList.addItem(newItem)
    // pour chaque item creer depuis les donnes du localstorage, le render va creer un element <li> qui va injecter au niveau du <ul>
    template.render(fullList)

    input.value = ""

  })

  const clearItem = document.getElementById("clearItemsButton") as HTMLButtonElement
  clearItem.addEventListener("click", (): void => {
    // On reinitialise la list [] depuis le localstorage
    fullList.clearList()
    // On reinitialise la list <[] = ""> depuis le DOM 
    template.clear()
  })

  // on recupere les donnees depuis le localstorage
  fullList.load()
  // pour chaque item creer depuis les donnes du localstorage, le render va creer un element <li> qui va injecter au niveau du <ul>
  // creer notre liste dans le DOM 
  template.render(fullList)


}

document.addEventListener("DOMContentLoaded", initApp)