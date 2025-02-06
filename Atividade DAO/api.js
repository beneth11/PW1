const express = require('express')
const app = express()
const { MongoClient } = require('mongodb')
require('dotenv').config()
const uri = process.env.URI
const client = new MongoClient(uri)
const mydb_users = client.db('converter').collection('usuarios')
const mydb_historico = client.db('converter').collection('historico')
const contactsDAO = require('./contactsDAO')

app.listen(process.env.PORT, () => {
    console.log("Servidor rodando...")
})

app.get('/all/users', async (req, res) => {
    const user_array = await contactsDAO.getUsers(mydb_users)
    res.json(JSON.parse(JSON.stringify(user_array, null, 2)))
})

app.get('/all/history', async (req, res) => {
    const history_array = await contactsDAO.getHistory(mydb_historico)
    res.json(JSON.parse(JSON.stringify(history_array, null, 2)))
})

app.get('/add/user/:username/:email/:senha', async (req, res) => {
    const doc = {
        username: req.params.username,
        email: req.params.email,
        senha: req.params.senha,
        pagou: 0
    }
    const result = await contactsDAO.insertData(mydb_users, doc)
    res.json(result)
})

app.get('/add/history/:username/:tipo/', async (req, res) => {
    const doc = {
        username: req.params.username,
        tipo: req.params.tipo,
        timestamp: new Date()
    }
    const result = await contactsDAO.insertData(mydb_historico, doc)
    res.json(result)
})

app.get('/del/:username', async (req, res) => {
    const name = {
        username: req.params.username
    }
    const result = await contactsDAO.deleteUserByNome(mydb_users, name)
    res.json(result)
})

app.get('/update/:email/:senha', async (req, res) => {
    const email = {
        email: req.params.email
    }
    const new_pass = {
        $set : {senha: req.params.senha}
    }
    const result = await contactsDAO.updateSenhaByEmail(mydb_users, email, new_pass)
    res.json(result)
})

app.get('/*', function(req, res) {
    res.status(404).json({
        err: 'Link não encontrado'
    })
})