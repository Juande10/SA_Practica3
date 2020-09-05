const axios = require('axios')
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var pedido = -1;
function waitForUserInput() {
    
    rl.question("1. Solicitar pedido\n2. Ver estado pedido con el restaurante\n3. Ver pedido con el repartidor\n4. Salir\n¿Que acción desea realizar?\n", function(answer) {
      if (answer == "4"){
          rl.close();
      } else {
            if(answer == "1"){
                axios.post('http://localhost:3002/nuevo_pedido',{
                    "descripcion": "Una soda",
                })
                .then(response => {
                    console.log("Su pedido es el numero: " + response.data["id"])
                    pedido = response.data["id"];
                })
                .catch(error => {
                    console.log(error);
                })
            }else if(answer == "2"){
                axios.post('http://localhost:3002/estado_pedido',{
                    "id": pedido,
                })
                .then(response => {
                    console.log("El estado de su pedido desde el restaurante es: " + response.data["status"])
                })
                .catch(error => {
                    console.log(error);
                })
            }else if(answer == "3"){
                axios.post('http://localhost:3000/estado_pedido',{
                    "id": pedido,
                })
                .then(response => {
                    console.log("El estado de su pedido desde el repartidor es: " + response.data)
                })
                .catch(error => {
                    console.log(error);
                })
            }
            waitForUserInput();
        }
    });
}

waitForUserInput();