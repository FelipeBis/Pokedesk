window.onload = function(){ 

var campo = document.getElementById('campo')
var form = document.getElementById('formulario')
var enviar = document.getElementById('enviar')
var numPokemao = 0;

enviar.onkeypress = function(e){
    if (e.keyCode == 13) {
        document.getElementById('enviar').click()
    }
}

form.addEventListener('submit', function(e) {
    if(campo.value==''){
        alert("Numero do pokemao: " + numPokemao)
    }
    else{
        numPokemao = campo.value;
        alert("Numero do pokemao: " + numPokemao)
    }
});

};
