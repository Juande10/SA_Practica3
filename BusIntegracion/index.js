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

/*URL para recibir pedido y enviarla al restaurante*/
app.post('/nuevo_pedido', (req, res) => {
    let body = req.body
    axios.post('http://localhost:4000/nuevo_pedido',{
        "descripcion": "Una soda"
    })
    .then(response => {
        res.send(response.data)
    })
    .catch(error => {
        res.send({
            "status": "ERROR"
        })
    });
});

app.post('/estado_pedido', (req, res) => {
    let body = req.body
    axios.post('http://localhost:4000/estado_pedido',{
        "id": body['id']
    })
    .then(response => {
        res.send(response.data)
    })
    .catch(error => {
        res.send({
            "status": "ERROR"
        })
    });
});

app.post('/estado_pedido_rep', (req, res) => {
    let body = req.body
    axios.post('http://localhost:3000/estado_pedido',{
        "id": body['id']
    })
    .then(response => {
        res.send(response.data)
    })
    .catch(error => {
        res.send({
            "status": "ERROR"
        })
    });
});


app.listen(3002, () => {
    console.log('Bus en el puerto 3002')
})