const generarNumeroAleatorio = () => {
    return Math.floor(Math.random() *100) +1;
};

const verificarNumeroAleatorio = (numeroSecreto, numeroAdivinado) => {
    if(numeroAdivinado == numeroSecreto){
        console.log("Adivinaste!");
    }
    else if(numeroAdivinado > numeroSecreto){
        console.log("El numero es menor al que adivinaste");
    }
    else if(numeroAdivinado < numeroSecreto){
        console.log("El numero es mayor al que adivinaste");
    }
}

module.exports = {
    verificarNumeroAleatorio,generarNumeroAleatorio
};