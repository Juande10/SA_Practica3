const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const axios = require('axios')
var log = require('morgan')
app.use(log("dev"));

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

var pedidos = {
    "pedidos": [
    ]
}

/*URL para recibir pedido como repartidor*/ 
app.post('/nuevo_pedido', (req, res) => {
    let body = req.body
    pedidos["pedidos"].push({
        "estado":"En transito",
        "id": body.id
    })
    setTimeout(() => {
        for(let item of pedidos["pedidos"]){
            if (item["id"] == body.id) {
                item["estado"] = "Pedido entregado al cliente";
            }
        }}
    , 5000);
    res.send({
        "status":"OK",
    })
})

app.post('/estado_pedido', (req, res) => {
    let body = req.body
    for(let item of pedidos["pedidos"]){
        if (item["id"] == body.id) {
            res.send(item["estado"])
        }
    }
    res.send("Pedido no encontrado")
})


/*Repartidor escuchando en el puerto 3000*/
app.listen(3000, () => {
    console.log('Repartidor en puerto 3000')
})