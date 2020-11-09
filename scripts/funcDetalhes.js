async function funcDetalhes(Poke){

    //Criando Div Para Colocar informaçoes e remover a div antiga
    const divTextoDetails = document.createElement("div")
    divTextoDetails.classList.add("BarrinhaDeBuscaDoDetalhes")

    const divTextoAtual = document.querySelector("div.BarrinhaDeBusca")
    divTextoAtual.parentNode.removeChild(divTextoAtual)

    const pokes = document.querySelector(".Pokemaos")
    

    const botaoBack = document.createElement("button")
    botaoBack.setAttribute('id','voltar')
    botaoBack.setAttribute('style','border-radius: 7px;')
    botaoBack.setAttribute('onclick','funcPaginainicial()')
    botaoBack.setAttribute('class', 'back')
    botaoBack.setAttribute('type','button')
    botaoBack.innerText = "Voltar"

    const paragrafoDetails = document.createElement("p")
    paragrafoDetails.setAttribute('class','TextoDetalhes')
    paragrafoDetails.innerText = 'Detalhes do pokemon:'

    divTextoDetails.appendChild(botaoBack)
    divTextoDetails.appendChild(paragrafoDetails)

    document.body.insertBefore(divTextoDetails, pokes)

    //Coletando informações para criar card de datalhes
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

    //Limpar a UL
    const UlDosPokes = document.querySelector("ul#TodoMundo");
    UlDosPokes.innerHTML = "";

    //Criando card com os detalhes
    const LiDosDetalhes = document.createElement('li')
    LiDosDetalhes.setAttribute('id',`poke${id}`)
    LiDosDetalhes.setAttribute('class',`card ${types[0]}1 Detalhes`)

    const DivDaLiDetalhes = document.createElement('div')
    DivDaLiDetalhes.setAttribute('class','ImagemPoke')

    const ImagemDeFundo = document.createElement('img')
    ImagemDeFundo.setAttribute('class','fundoPoke')
    ImagemDeFundo.setAttribute('src','styles/images/bg.png')

    const ImagemDoPoke = document.createElement('img')
    ImagemDoPoke.setAttribute('class','imagem')
    ImagemDoPoke.setAttribute('alt',`${pokemon.name}`)
    ImagemDoPoke.setAttribute('src',`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`)

    DivDaLiDetalhes.appendChild(ImagemDeFundo)
    DivDaLiDetalhes.appendChild(ImagemDoPoke)

    const DivDasInfos = document.createElement('div')
    DivDasInfos.setAttribute('class','infos')

    const h3DoNumero = document.createElement('h3')
    h3DoNumero.setAttribute('class','NumDoPoke')
    h3DoNumero.innerText = `#${id}`

    const h2DoNome = document.createElement('h2')
    h2DoNome.setAttribute('class','NomeDoPoke')
    h2DoNome.innerText = `${name}`

    const DivTipos = document.createElement('div')
    DivTipos.setAttribute('class','Tipos')

    const SpanBadge = `<span class="badge ${types[0]}"><img class="ImagemDoTipo" src="styles/types/${types[0]}.svg"/>
    ${types.join(` </span> <span class="badge ${types[1]}"> <img class="ImagemDoTipo" src="styles/types/${types[1]}.svg"/>`)}</span>`

    DivTipos.innerHTML=SpanBadge

    const BotoesDetalhes = document.createElement('div')
    BotoesDetalhes.setAttribute('class','botoesDetalhes')

    const BotaoSobre = document.createElement('button')
    BotaoSobre.setAttribute('id','sobre')
    BotaoSobre.setAttribute('onclick','funcMostrarSobre()')
    BotaoSobre.innerText = 'About'


    const BotaoStauts = document.createElement('button')
    BotaoStauts.setAttribute('id','status')
    BotaoStauts.setAttribute('onclick','funcMostrarStatus()')
    BotaoStauts.innerText = 'Stats'


    BotoesDetalhes.appendChild(BotaoSobre)
    BotoesDetalhes.appendChild(BotaoStauts)

    DivDasInfos.appendChild(h3DoNumero)
    DivDasInfos.appendChild(h2DoNome)
    DivDasInfos.appendChild(DivTipos)

    LiDosDetalhes.appendChild(DivDaLiDetalhes)
    LiDosDetalhes.appendChild(DivDasInfos)
    LiDosDetalhes.appendChild(BotoesDetalhes)

    const DivSobreInfos = document.createElement('div')
    DivSobreInfos.setAttribute('id','Tudosobre')
    
    const TodosParagrafosInfo = 
    `<p>${ajustarDesc(informacoesGerais)}</p>
    <p id="PokedexData">Pokédex Data</p>
    <p><span style="font-weight: bold;">Species: </span>${informacoesGenero}</p>
    <p><span style="font-weight: bold;">Height: </span>${(informacoesAltura/10)}m</p>
    <p><span style="font-weight: bold;">Weight: </span>${(informacoesPeso/10)}kg</p>
    <p><span style="font-weight: bold;">Abillities: </span>1. ${habilidades.join(`, 2. `)}</p>
    <p><span style="font-weight: bold;">Weaknesss </span>${Fraquezas.join(`, `)}</p>`

    DivSobreInfos.innerHTML=TodosParagrafosInfo
    
    const DivStatusInfos = document.createElement('div')
    DivStatusInfos.setAttribute('id','TudosobreStatus')

    const TodosParagrosStatus = `
    <p><span style="font-weight: bold;">HP: </span></p><div style="margin-left:10px;padding-left:10px;width: ${informacoesStatus[0].base_stat}px;background-color:green">${informacoesStatus[0].base_stat}</div>
    <p><span style="font-weight: bold;">ATTACK: </span></p><div style="margin-left:10px;padding-left:10px;width: ${informacoesStatus[1].base_stat}px;background-color:green">${informacoesStatus[1].base_stat}</div>
    <p><span style="font-weight: bold;">DEFENSE: </span></p><div style="margin-left:10px;padding-left:10px;width: ${informacoesStatus[2].base_stat}px;background-color:green">${informacoesStatus[2].base_stat}</div>
    <p><span style="font-weight: bold;">SPECIAL-ATTACK: </span></p><div style="margin-left:10px;padding-left:10px;width: ${informacoesStatus[3].base_stat}px;background-color:green">${informacoesStatus[3].base_stat}</div>
    <p><span style="font-weight: bold;">SPECIAL-DEFENSE: </span></p><div style="margin-left:10px;padding-left:10px;width: ${informacoesStatus[4].base_stat}px;background-color:green">${informacoesStatus[4].base_stat}</div>
    <p><span style="font-weight: bold;">SPEED: </span></p><div style="margin-left:10px;padding-left:10px;width: ${informacoesStatus[5].base_stat}px;background-color:green">${informacoesStatus[5].base_stat}</div>`

    DivStatusInfos.innerHTML = TodosParagrosStatus

    UlDosPokes.appendChild(LiDosDetalhes)
    UlDosPokes.appendChild(DivSobreInfos)
    UlDosPokes.appendChild(DivStatusInfos)

}