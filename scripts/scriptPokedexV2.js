class Pokedex{
    constructor() {
        this.TodosPoke = []
        this.offset = 0
        this.limit = 10
        this.baseURL = 'https://pokeapi.co/api/v2/pokemon/'
    }

    //Carregar os pokemons
    async loadPokemons(){

        const urlPokemons = `${this.baseURL}?limit=${this.limit}&offset=${this.offset}`;

        const { data } = await axios.get(urlPokemons);
        
        const NomeDoPokemaos = data.results.map(({name}) => name)
        
        await this.funcListarPoke(NomeDoPokemaos);

        this.offset = this.offset + this.limit
    }

    //Para a listagem dos pokes
    async funcListarPoke(pokemonNames){
        const LugarDosPoke = document.querySelector('[id="TodoMundo"]')
    
        pokemonNames.forEach(async(pokemonName) => {
    
            const pokemon = await this.funcGetPokemon(pokemonName);
    
            const types = pokemon.types.map(({type}) => type.name);
    
            const listElement = document.createElement('li');
            listElement.classList.add(`pokes${types[0]}`);
            listElement.setAttribute('id', `poke${pokemon.id}`);
    
            listElement.innerHTML = `
                <img class="fundoPoke" src="styles/images/bg.png"/>
                <img class="imagem ${types[0]}" alt="${pokemon.name}" src="https://raw.githubusercontent.com/jnovack/pokemon-svg/master/svg/${pokemon.id}.svg"/>
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

    //Criando a url para os pokemao
    async  funcGetPokemon(idOrName){
        const urlDoPokemao = 'https://pokeapi.co/api/v2/pokemon/'+idOrName
        const { data } = await axios.get(urlDoPokemao);
        return data;
    }

}

//Criando URL para a proxima evolucao
async function funcGetPokemonEvolution(idOrName){
    
    const urlDoPokemao = 'https://pokeapi.co/api/v2/pokemon/'+idOrName
    const { data } = await axios.get(urlDoPokemao);
    return data.id;
    
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
    const pokedex = new Pokedex()
    const keyword = campoBusca.value.trim();

    if(keyword !== ''){
        const UlDosPokes = document.querySelector('ul#TodoMundo')
        UlDosPokes.innerHTML="";

        await pokedex.funcListarPoke([keyword]);
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
async function buscarInfoEvolucao(urlEvolucao, Poke){
    var Evolution = []
    //const urlEvolucao = 'https://pokeapi.co/api/v2/evolution-chain/'+idOrName
    //console.log(urlEvolucao)
    const { data } = await axios.get(urlEvolucao);
    if(data.chain.evolves_to != "")
        Evolution.push(data.chain.evolves_to[0].species.name)
    else
        Evolution.push(data.chain.species.name)
    return Evolution
}

//GET URL da evolucao
async function GetUrlEvolution(idOrName){
    const urlSobrePoke = 'https://pokeapi.co/api/v2/pokemon-species/'+idOrName
    const { data } = await axios.get(urlSobrePoke)
    return data.evolution_chain.url
}


//Buscar informacoes sobre evolucao
async function buscarInfoSobre(idOrName){
    const urlSobrePoke = 'https://pokeapi.co/api/v2/pokemon-species/'+idOrName
    const { data } = await axios.get(urlSobrePoke)
    return data.flavor_text_entries[6].flavor_text;
}

//Buscar Genero Pokemon
async function buscarInfoGenero(idOrName){
    const urlSobrePoke = 'https://pokeapi.co/api/v2/pokemon-species/'+idOrName
    const { data } = await axios.get(urlSobrePoke)
    return data.genera[7].genus
}

//Buscar Pelo tipo de fraqueza
async function buscarFraqueza(NameType){
    const urlSobrePoke = 'https://pokeapi.co/api/v2/type/'+NameType
    const { data } = await axios.get(urlSobrePoke)
    return data.damage_relations.double_damage_from
}

//Buscar pelos status do pókemon
async function buscarStatus(idOrName){
    const urlSobrePoke = 'https://pokeapi.co/api/v2/pokemon/'+idOrName
    const { data } = await axios.get(urlSobrePoke)
    return data.stats
}

//Funcao do detalhes dos pokemons
async function funcDetalhes(Poke){
    document.write('<!DOCTYPE html>')
    document.write('<html>')
    document.write('<html lang="en">')

    document.write('<head>')
    document.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">')
    document.write('<link rel="stylesheet" href="styles/stylePokedex.css">')
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
    

    const URLdaEvolution = await GetUrlEvolution(Poke)
    const informacoesEvolucao = await buscarInfoEvolucao(URLdaEvolution, Poke)
    const proximaEvolucao = await funcGetPokemonEvolution(informacoesEvolucao)
    const informacoesGerais = await buscarInfoSobre(Poke)
    const informacoesGenero = await buscarInfoGenero(Poke)
    const informacoesStatus = await buscarStatus(Poke)

    const {data: pokemon} = await axios.get(urlDoPokemao);

    const informacoesAltura = pokemon.height

    const informacoesPeso = pokemon.weight

    const types = pokemon.types.map(({type}) => type.name);

    const habilidades = pokemon.abilities.map(({ability}) => ability.name)

    const { id, name } = pokemon;

    const pokemonNomeFormatado = ajustarNome(name);

    const informacoesFraqueza = await buscarFraqueza(types[0])
    
    const Fraquezas = informacoesFraqueza.map(({name}) => name)
    
    document.write(`
        <li id="poke${id}" class="pokes${types[0]} Detalhes">
        <img class="fundoPoke" src="styles/images/bg.png"/>
        <img class="imagem ${types[0]}" alt="${pokemonNomeFormatado}" src="https://raw.githubusercontent.com/jnovack/pokemon-svg/master/svg/${id}.svg"/>
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
            <p><span style="font-weight: bold;">Species: </span>${informacoesGenero}</p>
            <p><span style="font-weight: bold;">Height: </span>${(informacoesAltura/10)}m</p>
            <p><span style="font-weight: bold;">Weight: </span>${(informacoesPeso/10)}kg</p>
            <p><span style="font-weight: bold;">Abillities: </span>1. ${habilidades.join(`, 2. `)}</p>
            <p><span style="font-weight: bold;">Weaknesss </span>${Fraquezas.join(`, `)}</p>
        </div>
        <div id="TudosobreStatus">
            <span style="font-weight: bold;">HP: </span><div style="margin-left:10px;padding-left:10px;width: ${informacoesStatus[0].base_stat}px;background-color:green">${informacoesStatus[0].base_stat}</div>
            <span style="font-weight: bold;">ATTACK: </span><div style="margin-left:10px;padding-left:10px;width: ${informacoesStatus[1].base_stat}px;background-color:green">${informacoesStatus[1].base_stat}</div>
            <span style="font-weight: bold;">DEFENSE: </span><div style="margin-left:10px;padding-left:10px;width: ${informacoesStatus[2].base_stat}px;background-color:green">${informacoesStatus[2].base_stat}</div>
            <span style="font-weight: bold;">SPECIAL-ATTACK: </span><div style="margin-left:10px;padding-left:10px;width: ${informacoesStatus[3].base_stat}px;background-color:green">${informacoesStatus[3].base_stat}</div>
            <span style="font-weight: bold;">SPECIAL-DEFENSE: </span><div style="margin-left:10px;padding-left:10px;width: ${informacoesStatus[4].base_stat}px;background-color:green">${informacoesStatus[4].base_stat}</div>
            <span style="font-weight: bold;">SPEED: </span><div style="margin-left:10px;padding-left:10px;width: ${informacoesStatus[5].base_stat}px;background-color:green">${informacoesStatus[5].base_stat}</div>
        </div>
        <div id="TudosobreEvolution">
            <p>${pokemonNomeFormatado} evolves to: ${informacoesEvolucao}</p>
            <div>
                <img id="pokemonInicial" src="https://raw.githubusercontent.com/jnovack/pokemon-svg/master/svg/${id}.svg"/>
                <img id="setaEvolution" src="https://images.vexels.com/media/users/3/136724/isolated/preview/860e19a9f09f5828a8991d0b6e6127e7-seta-direita-2-by-vexels.png"/>
                <img id="pokemonEvoluido" src="https://raw.githubusercontent.com/jnovack/pokemon-svg/master/svg/${proximaEvolucao}.svg"/>
            </div>
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

//Adicionando evento de busca no formulario (input)
const formBusca = document.getElementById('formulario-busca');
formBusca.addEventListener('submit', (event) => {
    event.preventDefault();

    funcBuscarOsPoke();

})

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





