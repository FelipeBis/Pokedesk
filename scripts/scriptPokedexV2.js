var TodosPoke = []


class Pokedex{
    constructor() {
        this.offset = 0
        this.limit = 10
        this.baseURL = 'https://pokeapi.co/api/v2/pokemon/'
    }
    async loadPokemons(){

        const urlPokemons = `${this.baseURL}?limit=${this.limit}&offset=${this.offset}`;

        const { data } = await axios.get(urlPokemons);
        
        const NomeDoPokemaos = data.results.map(({name}) => name)
        
        await funcListarPoke(NomeDoPokemaos);

        this.offset = this.offset + this.limit
    }
}

//Criando a url para os pokemao
async function funcGetPokemon(idOrName){
    const urlDoPokemao = 'https://pokeapi.co/api/v2/pokemon/'+idOrName

    const { data } = await axios.get(urlDoPokemao);

    return data;
}

//Para a listagem dos pokes
async function funcListarPoke(pokemonNames){
    const LugarDosPoke = document.querySelector('[id="TodoMundo"]')

    pokemonNames.forEach(async(pokemonName) => {

        const pokemon = await funcGetPokemon(pokemonName);

        const types = pokemon.types.map(({type}) => type.name);

        const listElement = document.createElement('li');
        listElement.classList.add(`pokes${types[0]}`);
        listElement.setAttribute('id', `poke${pokemon.id}`);

        listElement.innerHTML = `
            <img class="fundoPoke" src="styles/images/bg.png"/>
            <img class="imagem ${types[0]}" alt="${pokemon.name}" src="styles/svg/${pokemon.id}.svg"/>
            <h3 class="NumDoPoke">#${pokemon.id}</h3>
            <h2 class="NomeDoPoke">${pokemon.name}</h2>
            <div class="Tipos">
                <span class="Tipos${types[0]}">
                    <img class="ImagemDoTipo" src="styles/types/${types[0]}.svg"/>
                ${types.join(` </span> <span class="Tipos${types[1]}"> <img class="ImagemDoTipo" src="styles/types/${types[1]}.svg"/>`)}</span>
            </div>
        `;    

        listElement.addEventListener('click', () => funcDetalhes(pokemon.id));

        LugarDosPoke.appendChild(listElement);
    });

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
async function funcBuscarOsPoke(){
    const campoBusca = document.getElementById('campo-busca');

    const keyword = campoBusca.value.trim();

    if(keyword !== ''){
        const UlDosPokes = document.querySelector('ul#TodoMundo')
        UlDosPokes.innerHTML="";

        await funcListarPoke([keyword]);
    }
}

//Func mostrar status
function funcMostrarStatus(){
    var divTudoStatus  = document.getElementById('TudosobreStatus').style.display

    if(divTudoStatus == "block"){
        document.getElementById('TudosobreStatus').style.display = "none"
    }
    else{
        document.getElementById('TudosobreStatus').style.display = "block"
        document.getElementById('TudosobreEvolution').style.display = "none"
        document.getElementById('Tudosobre').style.display = "none"
    }
}

//Func mostrar evolution
function funcMostrarEvolucao(){
    var divTudoEvolucao  = document.getElementById('TudosobreEvolution').style.display

    if(divTudoEvolucao == "block"){
        document.getElementById('TudosobreEvolution').style.display = "none"
    }
    else{
        document.getElementById('TudosobreEvolution').style.display = "block"
        document.getElementById('Tudosobre').style.display = "none"
        document.getElementById('TudosobreStatus').style.display = "none"
    }
}

//Func mostrar sobre
function funcMostrarSobre(){
    var divTudoSobre = document.getElementById('Tudosobre').style.display

    if(divTudoSobre == "block"){
        document.getElementById('Tudosobre').style.display = "none"
    }
    else{
        document.getElementById('Tudosobre').style.display = "block"
        document.getElementById('TudosobreStatus').style.display = "none"
        document.getElementById('TudosobreEvolution').style.display = "none"
    }
}

//Buscar informacoes gerais
async function buscarInfoEvolucao(idOrName){
    const urlEvolucao = 'https://pokeapi.co/api/v2/evolution-chain/'+idOrName
    
    const { data } = await axios.get(urlEvolucao);
   
    return;
}

//Buscar informacoes sobre evolucao
async function buscarInfoSobre(idOrName){
    const urlSobrePoke = 'https://pokeapi.co/api/v2/pokemon-species/'+idOrName
    const { data } = await axios.get(urlSobrePoke)
    return data.flavor_text_entries[6].flavor_text;
}

//Funcao do detalhes dos pokemons
async function funcDetalhes(Poke){
    document.write('<!DOCTYPE html>')
    document.write('<html>')
    document.write('<html lang="en">')

    document.write('<head>')
    document.write('<link rel="stylesheet" media="screen and (min-width: 1920px)" href="styles/stylePokedex.css">')
    document.write('<link rel="stylesheet" media="screen and (max-width: 1919px)" href="styles/stylePokedex-600.css">')
    document.write('</head>')

    document.write('<body class="PaginaToda">')

    document.write('<div class="BarrinhaBonita">')
    document.write('<h3 class="TituloBarrinha">A melhor pokédex do Brasil!</h3>')
    document.write('<img class="Loguinho" onclick="funcPaginainicial()"src="styles/images/1200px-International_Pokémon_logo.svg.png">')
    document.write('<h5 class="Autor">by: Felipe Bis</h5>')
    document.write('</div>')

    document.write('<div class="BarrinhaDeBusca">')
    document.write('<button id="voltar" style="border-radius: 7px;" onclick="funcPaginainicial()" class="back" type="button">Voltar</button>')
    document.write('<label> Detalhes do pokemon: </label>')
    document.write('</div>')

    document.write('<div class="Pokemaos">')

    document.write('<ul id="TodoMundo" class="Todos">')
    var urlDoPokemao = 'https://pokeapi.co/api/v2/pokemon/'+Poke
    const informacoesEvolucao = await buscarInfoEvolucao(Poke)
    const informacoesGerais = await buscarInfoSobre(Poke)
    
    const {data: pokemon} = await axios.get(urlDoPokemao);

    const types = pokemon.types.map(({type}) => type.name);

    const { id, name } = pokemon;

    const pokemonNomeFormatado = ajustarNome(name);
    
    document.write(`
        <li id="poke${id}" class="pokes${types[0]}Detalhes">
        <img class="fundoPoke" src="styles/images/bg.png"/>
        <img class="imagem ${types[0]}" alt="${pokemonNomeFormatado}" src="styles/svg/${id}.svg"/>
            <h3 class="NumDoPoke">#${id}</h3>
            <h2 class="NomeDoPoke">${pokemonNomeFormatado}</h2>
            
            <div class=Tipos>
                <span class="Tipos${types[0]}"><img class="ImagemDoTipo" src="styles/types/${types[0]}.svg"/>
                ${types.join(` </span> <span class="Tipos${types[1]}"> <img class="ImagemDoTipo" src="styles/types/${types[1]}.svg"/>`)}</span>
            </div>

            <div id="botoesDetalhes">
                <button id="sobre" onclick="funcMostrarSobre()">About</button>
                <button id="status" onclick="funcMostrarStatus()">Stats</button>
                <button id="evolucao" onclick="funcMostrarEvolucao()">Evolution</button>
            </div>

        </li>

        <div id="Tudosobre">
            <p>${informacoesGerais}</p>

            <p id="PokedexData">Pokédex Data</p>
            <p><span style="font-weight: bold;">Species </span>HUASHUASHUHUAS</p>
            <p><span style="font-weight: bold;">Height </span>HUASHUASHUHUAS</p>
            <p><span style="font-weight: bold;">Weight </span>HUASHUASHUHUAS</p>
            <p><span style="font-weight: bold;">Abillities </span>HUASHUASHUHUAS</p>
            <p><span style="font-weight: bold;">Weaknesss </span>HUASHUASHUHUAS</p>
        </div>
        <div id="TudosobreStatus">
            <p>TUDO STATUS</p>
        </div>
        <div id="TudosobreEvolution">
            <p>TUDO EVOLUTION</p>
        </div>
        `);
                  
    document.write('</ul>')
    document.write('</div>')
    document.write('<div class="LogoPokemao">')
    document.write('<img class="ImagemFim" src="styles/images/pokedex-logo.png">')
    document.write('</div>')
    document.write('</body>')
    document.write('</html>')
}

//Função de quando a tela se inicia - minha MAIN
window.onload = function(){

    const pokedex = new Pokedex()

    pokedex.loadPokemons()

    //Quando o scroll chegar ao final
   document.querySelector('div.Pokemaos').addEventListener('scroll',function(){
        if(this.scrollTop + this.offsetHeight == (this.scrollHeight)){
            pokedex.loadPokemons()
        }
    })
}

const formBusca = document.getElementById('formulario-busca');
formBusca.addEventListener('submit', (event) => {
    event.preventDefault();

    funcBuscarOsPoke();

})



