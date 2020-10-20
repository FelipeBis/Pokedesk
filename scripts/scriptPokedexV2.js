const TodosPoke = []

class Pokedex{
    constructor() {
        this.offset = 0
        this.limit = 10
        this.baseURL = 'https://pokeapi.co/api/v2/pokemon/'
    }
    loadPokemons(){

        const data = (fetch(`${this.baseURL}?limit=${this.limit}&offset=${this.offset}`).then(response => response.json()))
        
        Promise.resolve(data)
            .then(({results}) => {
                const NomeDoPokemaos = results.map(({name}) => name)
                //console.log(NomeDoPokemaos)
                NomeDoPokemaos.forEach(funcCriarURL)
                funcBuscareListarPoke(TodosPoke)
                //console.log(TodosPoke)
                //
            })

        this.offset = this.offset + this.limit
    }
    //
    
}

//Criando a url para os pokemao
function funcCriarURL(Pokes){
    var urlDoPokemao = 'https://pokeapi.co/api/v2/pokemon/'+Pokes
    //console.log(urlDoPokemao)

    TodosPoke.push(fetch(urlDoPokemao).then(response => response.json()))
    //console.log(TodosPoke)
    return TodosPoke
}

//Para a listagem dos pokes
function funcBuscareListarPoke(){
    //console.log(TodosPoke)
    Promise.all(TodosPoke)
        .then(pokemons=>{
            
        const lisPokemons = pokemons.reduce((TodosOsPokemaos, pokemon) => {
            const types = pokemon.types.map(InfoDoTipo => InfoDoTipo.type.name)

            pokemon.name = ajustarNome(pokemon.name)

            TodosOsPokemaos += `
                <li id="poke${pokemon.id}" class="pokes${types[0]}">
                <img class="fundoPoke" src="styles/images/bg.png"/>
                <img class="imagem ${types[0]}" alt="${pokemon.name}" src="styles/svg/${pokemon.id}.svg"/>
                    <h3 class="NumDoPoke">#${pokemon.id}</h3>
                    <h2 class="NomeDoPoke">${pokemon.name}</h2>
                    <div class=Tipos>
                        <span class="Tipos${types[0]}"><img class="ImagemDoTipo" src="styles/types/${types[0]}.svg"/>
                        ${types.join(` </span> <span class="Tipos${types[1]}"> <img class="ImagemDoTipo" src="styles/types/${types[1]}.svg"/>`)}</span>
                    </div>
                </li>`
                
            return TodosOsPokemaos
        }, '')

        var LugarDosPoke = document.querySelector('[id="TodoMundo"]')
        
        LugarDosPoke.innerHTML = lisPokemons

    })

}


//Pagina Inicial
function funcPaginainicial(){
    window.location = '/';
}

//Se eu quiser ajustar as letras
function ajustarNome(NomeDoPokemao){
    return NomeDoPokemao.charAt(0).toUpperCase() + NomeDoPokemao.slice(1);
}

//Funcao que faz a busca dos pokemons
function funcBuscarOsPoke(){
   

}

//Função de quando a tela se inicia - minha MAIN
window.onload = function(){

    const pokedex = new Pokedex()

    buscar.onkeypress = function(e){
        if (e.keyCode == 13) {
            pokedex.loadPokemons()
        }
    }

    pokedex.loadPokemons()

}



