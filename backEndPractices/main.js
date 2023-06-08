const rr = require("readline-sync");
const {generarNumeroAleatorio, verificarNumeroAleatorio} = require("./headerDeAdivinarNumeros");

const obtenerNumeroUser = () =>{
    return rr.question("ingresa un numero");
}
const juegoDeAdivinar = () =>{
    const numeroAleatorio = generarNumeroAleatorio();
    let numeroAdivinado = 0;

    console.log("Bienvenido al juego de adivinanza!");
    console.log("Debes adivinar un numero del 1 al 100");

    while(numeroAdivinado != numeroAleatorio){
    numeroAdivinado = obtenerNumeroUser();
    verificarNumeroAleatorio(numeroAleatorio, numeroAdivinado);
    }


}

juegoDeAdivinar();