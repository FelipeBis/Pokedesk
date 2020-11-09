class Pokedex {
    constructor() {
        this.TodosPoke = [];
        this.offset = 0;
        this.limit = 12;
        this.baseURL = "https://pokeapi.co/api/v2/pokemon/";
        this.DivLoading = document.querySelector("#load");
        this.DivError = document.querySelector("#error");
        this.isLoading = false
    }

    //Carregar os pokemons
    async loadPokemons() {
        if(this.isLoading) return;

        this.isLoading = true

        const urlPokemons = `${this.baseURL}?limit=${this.limit}&offset=${this.offset}`;

        const { data } = await axios.get(urlPokemons);

        this.DivLoading.classList.add("invisivel");

        const NomeDoPokemaos = data.results.map(({ name }) => name);

        await this.funcListarPoke(NomeDoPokemaos);

        this.isLoading = false

        this.offset = this.offset + this.limit;
    }

    //Para a listagem dos pokes
    async funcListarPoke(pokemonNames) {

        const LugarDosPoke = document.querySelector('[id="TodoMundo"]');

        for (let i = 0; i < pokemonNames.length; i++) {
            await this.funcGetPokemon(pokemonNames[i]).then((pokemon) => {
                const types = pokemon.types.map(({ type }) => type.name);
                const listElement = document.createElement("li");
                listElement.classList.add(`card`);
                listElement.classList.add(`${types[0]}1`);
                listElement.setAttribute("id", `poke`);

                listElement.innerHTML = `

            
                <div class="infos">
                    <h3 class="NumDoPoke">#${pokemon.id}</h3>
                    <h2 class="NomeDoPoke">${pokemon.name}</h2>
                    <div class="Tipos">
                        <span class="badge ${types[0]}">
                            <img class="ImagemDoTipo" src="styles/types/${
                                types[0]
                            }.svg"/>
                        ${types.join(
                            ` </span> <span class="badge ${types[1]}"> <img class="ImagemDoTipo" src="styles/types/${types[1]}.svg"/>`
                        )}</span>
                    </div>
                </div>
                
                <div class="ImagemPoke">
                    <img class="fundoPoke" src="styles/images/bg.png"/>
                    <img class="imagem" alt="${
                        pokemon.name
                    }" src = "${this.ajustarURL(pokemon.id)}"/>
                </div>
            `;

                listElement.addEventListener("click", () =>
                    funcDetalhes(pokemon.id)
                );

                LugarDosPoke.appendChild(listElement);
            });
        }
    }

    //Criando a url para os pokemao
    async funcGetPokemon(idOrName) {
        const urlDoPokemao = "https://pokeapi.co/api/v2/pokemon/" + idOrName;

        this.DivLoading.classList.remove("invisivel");
        let { data } = await axios.get(urlDoPokemao);
        this.DivLoading.classList.add("invisivel");

        return data;
    }

    ajustarURL(idPokes){

        if((idPokes >= 10027 && idPokes <= 10032) || idPokes == 10061 || (idPokes >= 10080 && idPokes <= 10085) || (idPokes >= 10091 && idPokes <= 10157) ){
            return `https://i.imgur.com/W3LOC3Z.png`
        }
        else{
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                    idPokes}.png`
        }
    }
}

//Criando URL para a proxima evolucao
async function funcGetPokemonEvolution(idOrName) {
    const urlDoPokemao = "https://pokeapi.co/api/v2/pokemon/" + idOrName;
    const { data } = await axios.get(urlDoPokemao);
    return data.id;
}

//Pagina Inicial
function funcPaginainicial() {
    window.location = "/";
}


//Funcao que faz a busca dos pokemons
async function funcBuscarOsPoke() {
    const campoBusca = document.getElementById("campo-busca");
    const pokedex = new Pokedex();
    const keyword = campoBusca.value.toLowerCase().trim();
    const DivError = document.querySelector("#error");
    const DivLoading = document.querySelector("#load");


    if(keyword==""){
        const UlDosPokes = document.querySelector("ul#TodoMundo");

        UlDosPokes.innerHTML = "";
        pokedex.loadPokemons()
    }

    if (keyword !== "") {
        const UlDosPokes = document.querySelector("ul#TodoMundo");

        UlDosPokes.innerHTML = "";

        try{
            await pokedex.funcListarPoke([keyword]);
            DivError.classList.add("invisivel")
            DivError.classList.add("invisivel")
        }
        catch{
           DivLoading.classList.add("invisivel")
           DivError.classList.remove("invisivel")
        }
    }
}

//Func mostrar status
function funcMostrarStatus() {
    var divTudoStatus = document.getElementById("TudosobreStatus").style
        .display;

    if (divTudoStatus == "block") {
        document.getElementById("TudosobreStatus").style.display = "none";
    } else {
        document.getElementById("TudosobreStatus").style.display = "block";
        document.getElementById("Tudosobre").style.display = "none";
    }
}

//Func mostrar sobre
function funcMostrarSobre() {
    var divTudoSobre = document.getElementById("Tudosobre").style.display;

    if (divTudoSobre == "block") {
        document.getElementById("Tudosobre").style.display = "none";
    } else {
        document.getElementById("Tudosobre").style.display = "block";
        document.getElementById("TudosobreStatus").style.display = "none";
    }
}

//GET URL da evolucao
async function getUrlSobre(idOrName) {
    const urlSobrePoke = "https://pokeapi.co/api/v2/pokemon/"  + idOrName;
    const { data } = await axios.get(urlSobrePoke);
    return data.species.url
}

//Descrição ajustavel
function ajustarDesc(desc) {
    let content = desc.toString().replace(/\f/g, " ").split("\f");
    return content;
}

//Buscar informacoes sobre evolucao
async function buscarInfoSobre(urlSobrePoke) {
    const { data } = await axios.get(urlSobrePoke);
    return data.flavor_text_entries[6].flavor_text;
}

//Buscar Genero Pokemon
async function buscarInfoGenero(urlSobrePoke) {
    const { data } = await axios.get(urlSobrePoke);

    if(!data.genera[7]){
        return "Not Defined"
    }
    else
    return data.genera[7].genus;
}

//Buscar Pelo tipo de fraqueza
async function buscarFraqueza(NameType) {
    const urlSobrePoke = "https://pokeapi.co/api/v2/type/" + NameType;
    const { data } = await axios.get(urlSobrePoke);
    return data.damage_relations.double_damage_from;
}

//Buscar pelos status do pókemon
async function buscarStatus(idOrName) {
    const urlSobrePoke = "https://pokeapi.co/api/v2/pokemon/" + idOrName;
    const { data } = await axios.get(urlSobrePoke);
    return data.stats;
}

//Funcao do detalhes dos pokemons
async function funcDetalhes(Poke){
    document.write('<!DOCTYPE html>')
    document.write('<html>')
    document.write('<html lang="en">')

    document.write('<head>')
    document.write('<title>Pokédex - Detalhes by: Felipe Bis</title>')
    document.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">')
    document.write('<link rel="stylesheet" href="styles/reset.css"/>')
    document.write('<link rel="stylesheet" href="styles/stylePokedexV2.css">')
    document.write('</head>')

    document.write('<body class="PaginaToda">')

    document.write('<header class="BarrinhaBonita">')
    document.write('<img class="Loguinho" onclick="funcPaginainicial()"src="styles/images/1200px-International_Pokémon_logo.svg.png">')
    document.write('</header>')

    document.write('<div class="BarrinhaDeBuscaDoDetalhes">')
    document.write('<button id="voltar" style="border-radius: 7px;" onclick="funcPaginainicial()" class="back" type="button">Voltar</button>')
    document.write('<p class="TextoDetalhes"> Detalhes do pokemon: </p>')
    document.write('</div>')

    document.write('<div class="Pokemaos">')

    document.write('<ul id="TodoMundo" class="Todos DetailsNe">')
    var urlDoPokemao = 'https://pokeapi.co/api/v2/pokemon/'+Poke

    const UrlParaInfos = await getUrlSobre(Poke)
    
    const informacoesGerais = await buscarInfoSobre(UrlParaInfos)
    const informacoesGenero = await buscarInfoGenero(UrlParaInfos)
    const informacoesStatus = await buscarStatus(Poke)

    const {data: pokemon} = await axios.get(urlDoPokemao);

    const informacoesAltura = pokemon.height

    const informacoesPeso = pokemon.weight

    const types = pokemon.types.map(({type}) => type.name);

    const habilidades = pokemon.abilities.map(({ability}) => ability.name)

    const { id, name } = pokemon;


    const informacoesFraqueza = await buscarFraqueza(types[0])
    
    const Fraquezas = informacoesFraqueza.map(({name}) => name)
    
    document.write(`
        <li id="poke${id}" class="card ${types[0]}1 Detalhes">

        <div class="ImagemPoke">
                    <img class="fundoPoke" src="styles/images/bg.png">
                    <img class="imagem" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png"/>
                </div>

        <div class="infos">
            <h3 class="NumDoPoke">#${id}</h3>
            <h2 class="NomeDoPoke">${name}</h2>
            
            <div class=Tipos>
                <span class="badge ${types[0]}">
                <img class="ImagemDoTipo" src="styles/types/${types[0]}.svg"/>
                ${types.join(` </span> <span class="badge ${types[1]}"> <img class="ImagemDoTipo" src="styles/types/${types[1]}.svg"/>`)}</span>
            </div>
        </div>

            <div id="botoesDetalhes">
                <button id="sobre" onclick="funcMostrarSobre()">About</button>
                <button id="status" onclick="funcMostrarStatus()">Stats</button>
            </div>

        </li>

        <div id="Tudosobre">
            <p>${ajustarDesc(informacoesGerais)}</p>

            <p id="PokedexData">Pokédex Data</p>
            <p><span style="font-weight: bold;">Species: </span>${informacoesGenero}</p>
            <p><span style="font-weight: bold;">Height: </span>${(informacoesAltura/10)}m</p>
            <p><span style="font-weight: bold;">Weight: </span>${(informacoesPeso/10)}kg</p>
            <p><span style="font-weight: bold;">Abillities: </span>1. ${habilidades.join(`, 2. `)}</p>
            <p><span style="font-weight: bold;">Weaknesss </span>${Fraquezas.join(`, `)}</p>
        </div>
        <div id="TudosobreStatus">
            <p><span style="font-weight: bold;">HP: </span></p><div style="margin-left:10px;padding-left:10px;width: ${informacoesStatus[0].base_stat}px;background-color:green">${informacoesStatus[0].base_stat}</div>
            <p><span style="font-weight: bold;">ATTACK: </span></p><div style="margin-left:10px;padding-left:10px;width: ${informacoesStatus[1].base_stat}px;background-color:green">${informacoesStatus[1].base_stat}</div>
            <p><span style="font-weight: bold;">DEFENSE: </span></p><div style="margin-left:10px;padding-left:10px;width: ${informacoesStatus[2].base_stat}px;background-color:green">${informacoesStatus[2].base_stat}</div>
            <p><span style="font-weight: bold;">SPECIAL-ATTACK: </span></p><div style="margin-left:10px;padding-left:10px;width: ${informacoesStatus[3].base_stat}px;background-color:green">${informacoesStatus[3].base_stat}</div>
            <p><span style="font-weight: bold;">SPECIAL-DEFENSE: </span></p><div style="margin-left:10px;padding-left:10px;width: ${informacoesStatus[4].base_stat}px;background-color:green">${informacoesStatus[4].base_stat}</div>
            <p><span style="font-weight: bold;">SPEED: </span></p><div style="margin-left:10px;padding-left:10px;width: ${informacoesStatus[5].base_stat}px;background-color:green">${informacoesStatus[5].base_stat}</div>
        </div>
        `);
                  
    document.write('</ul>')
    document.write('</div>')
    document.write('</body>')
    document.write('</html>')
}

//Adicionando evento de busca no formulario (input)
const formBusca = document.getElementById("formulario-busca");
formBusca.addEventListener("submit", (event) => {

    event.preventDefault();

    funcBuscarOsPoke();
});

//Função de quando a tela se inicia - minha MAIN
window.onload = function () {
    const pokedex = new Pokedex();

    pokedex.loadPokemons();
        
    document
        .querySelector("div.Pokemaos")
        .addEventListener("scroll", function () {

            const campoBusca = document.getElementById("campo-busca")
            
            if ((this.scrollTop + this.offsetHeight) == (this.scrollHeight) && !campoBusca.value) {
                //alert("OI")
                pokedex.loadPokemons();
            }
            // else if(this.scrollTop == 0){
            //     let forms = document.querySelector("form#formulario-busca")
            //     let TextoBusca = document.querySelector("p.TextoBusca")
            //     forms.classList.remove('invisivel')
            //     TextoBusca.classList.remove('invisivel')
            // }
            // else{
            //     let forms = document.querySelector("form#formulario-busca")
            //     let TextoBusca = document.querySelector("p.TextoBusca")
            //     forms.classList.add('invisivel')
            //     TextoBusca.classList.add('invisivel')
            // }

        });
};
