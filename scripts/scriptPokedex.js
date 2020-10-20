//Função de quando a tela se inicia
class Pokedex{
    constructor() {
        this.page = 0;
      }
}
window.onload = function(){ 

    //var campo = document.getElementById('campo')
    //var form = document.getElementById('formulario')
    //var enviar = document.getElementById('buscar')
    //var numPokemao = 0
    
    buscar.onkeypress = function(e){
        if (e.keyCode == 13) {
            funcBuscarOsPoke()
        }
    }

    funcTodosPoke()
    
    //Não uso mais, era para submit com forms
    /*form.addEventListener('submit', function(e) {
        if(campo.value==''){
            //alert("Numero do pokemao: " + numPokemao)
        }
        else{
            numPokemao = campo.value
            funcBuscarOsPoke(numPokemao)
            //alert("Numero do pokemao: " + numPokemao)
        }
    })*/
}

//Pagina Inicial
function funcPaginainicial(){
    window.location = '/';
}

//Função que lista todos os pokemons
function funcTodosPoke(){
    const TodosPoke = []
    var x =1
    for(var x = 1; x <= 151; x++){
        //var div = document.createElement('div')
        var urlDoPokemao = 'https://pokeapi.co/api/v2/pokemon/'+x
        //var urlDoPokemao = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        //console.log(urlDoPokemao)
        
        TodosPoke.push(fetch(urlDoPokemao).then(response => response.json()))
        
        //console.log(TodosPoke)
    }
    
    Promise.all(TodosPoke)
        .then(pokemons=>{
            
        const lisPokemons = pokemons.reduce((TodosOsPokemaos, pokemon) => {
            const types = pokemon.types.map(InfoDoTipo => InfoDoTipo.type.name)

            pokemon.name = ajustarNome(pokemon.name)

            TodosOsPokemaos += `
                <li onclick="funcDetalhesPoke()" id="poke${pokemon.id}" class="pokes${types[0]}">
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
//Detalhes dos pokes
function funcDetalhesPoke(){
    //document.write("Oi")
}

//Se eu quiser ajustar as letras
function ajustarNome(NomeDoPokemao){
    return NomeDoPokemao.charAt(0).toUpperCase() + NomeDoPokemao.slice(1);
}

//Funcao que faz a busca dos pokemons
function funcBuscarOsPoke(){
    if(campo.value==''){
        var Todos = document.getElementById("TodoMundo")
        Todos.innerHTML = ""

        funcTodosPoke()
        //alert("Numero do pokemao: " + numPokemao)
    }
    else{
        numPokemao = campo.value
        var idDaDivDoBaguio = "poke"+numPokemao
        //var display = document.getElementById(idDaDivDoBaguio).style.display

        //document.getElementById(idDaDivDoBaguio).style.display = "block"
        if(idDaDivDoBaguio=="poke0"){
            funcTodosPoke()
        }

        for(var x = 1; x <= 151; x++){
            var divNum = "poke"+x
            if(divNum != idDaDivDoBaguio){
                document.getElementById(divNum).style.display = "none"
            }
            else{
                document.getElementById(divNum).style.display = "block"
            }
            //console.log(divNum)
        }
        //if(display == "none")
            //document.getElementById(idDaDivDoBaguio).style.display = "block"
        //else
            //document.getElementById(idDaDivDoBaguio).style.display = "none"
        //alert("Numero do pokemao: " + numPokemao)
    }
}