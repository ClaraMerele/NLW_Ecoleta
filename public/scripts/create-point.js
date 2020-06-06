
function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]');

    fetch ('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then( res => res.json() )
    .then( states => {

        for( state of states){
            ufSelect.innerHTML +=  `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs ()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")


    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    citySelect.innerHTML = "<option value>Selecione a Cidade</option>" // Toda vez que entrar nesta .function reescreve o conteúdo do Formulário    
    citySelect.disabled = true //Bloqueia novamente o campo selecionar cidade


    fetch(url) //busca a cidade
    .then( res => res.json())
    .then( cities => { 

         for( const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
         }

         citySelect.disabled = false //habilita o campo selecione a cidade
    } )
}

document
 .querySelector("select[name=uf]")
 .addEventListener("change", getCities)



//Ítens de Coleta 
//pegar todos as Li
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

//Quais são os items selecionados 
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

     //add or remove a class with js
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

    console.log('ITEM ID: ', itemId)

   
    //verificar se existem items selecionados.
    //caso sim pegar os items
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // isso retorna True or False
        return itemFound
    })

    //se ja estiver selecionado
    if(alreadySelected >= 0) {
        //remover da seleção 
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //return false
            return itemIsDifferent
        })

        selectedItems = filteredItems //atualiza os selectedItems
    } else {
        //se não estiver selecionado
        //adicionar à seleção
        selectedItems.push(itemId)
    }

    // console.log('selectedItems: ', selectedItems)
    
    // console.log(selectedItems)

    //atualizar o campo escondido com os dados selecionados 
    collectedItems.value = selectedItems
    
}

