const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const axios = require('axios')
var log = require('morgan')
app.use(log("dev"));

var pedidos = {
    "pedidos": [
    ]
}

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.post('/nuevo_pedido', (req, res) => {
    let body = req.body
    pedidos["pedidos"].push({
        "estado":"Iniciado",
        "descripcion": body.descripcion
    })
    console.log("Pedido iniciado")
    setTimeout(() =>
        axios.post('http://localhost:3000/nuevo_pedido',{
                "id": pedidos["pedidos"].length,
            })
            .then(response => {
                //console.log(response.data.url);
                //console.log(response.data.explanation);
                pedidos["pedidos"][pedidos["pedidos"].length-1].estado = "Enviada al repartidor"
                console.log("Pedido enviado al repartidor")
            })
            .catch(error => {
                console.log(error);
            }), 5000 )
    res.send({
        "status":"OK",
        "id": pedidos["pedidos"].length
    })
})

app.post('/estado_pedido', (req, res) => {
    let body = req.body
    res.send({
        "status":pedidos["pedidos"][parseInt(body.id)-1].estado,
    })
})


app.listen(4000, () => {
    console.log('Restaurante en puerto 4000')

})