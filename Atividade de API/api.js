const express = require('express')
const app = express()
const PORT = 3000

app.listen(PORT, () => {
    console.log('Hello There')
})

app.get('/', function(req, res) {
    res.send('Hello')
})

app.get('/v2/:name', function(req, res) {
    res.send('Hello ' + req.params.name)
})

app.get('/v3/:name', function(req, res) {
    res.send('Hello ' + req.params.name)
})

app.get('/v3/:name/json', function(req, res) {
    res.json({
        msg: 'Hello ' + req.params.name
    })
})

app.get('/v3/:name/:lang/json', function(req, res) {
    var language = req.params.lang
    switch (language) {
        case "en":
            res.json({
                msg: 'Hello ' + req.params.name
            })
        case "pt-br":
            res.json({
                msg: 'Olá ' + req.params.name
            })
        case "es":
            res.json({
                msg: 'Hola ' + req.params.name
            })
        default:
            res.json({
                err: 'Invalid endpoint'
            })
    }
})

app.get('/v3/:name/:lang', function(req, res) {
    var language = req.params.lang
    switch (language) {
        case "en":
            res.send('Hello ' + req.params.name)
        case "pt-br":
            res.send('Olá ' + req.params.name)
        case "es":
            res.send('Hola ' + req.params.name)
        default:
            res.send('Invalid endpoint')
    }
})

app.get('/v3/*', function(req, res) {
    res.json({
        err: 'Invalid endpoint'
    })
})

app.get('/v2/*', function(req, res) {
    res.json({
        err: 'Invalid endpoint'
    })
})

app.get('/*', function(req, res) {
    res.json({
        err: 'Invalid endpoint'
    })
})
