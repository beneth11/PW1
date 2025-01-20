const express = require('express')
const multer = require('multer');
const app = express()
const PORT = 3000
const livros = require('./db.json')
const upload = multer();

app.use(upload.none());

app.listen(PORT, () => {
    console.log(`API Livraria escutando na porta ${PORT}`)
})

app.get('/livros', (req, res) => {
    res.json(livros.db)
})

app.get('/livros/editora/:editora', (req, res) => {
    const editora_livro = livros.db.filter(l => l.editora === req.params.editora)

    if (editora_livro.length > 0) {
        res.json(editora_livro)
    } else {
        res.status(404).json({ err: 'Nome de editora de livros, não encontrado' });
    }
})

app.get('/livros/recentes', (req, res) => {
    const livros_recentes = livros.db.slice().sort((a, b) => b.ano - a.ano);

    if (livros_recentes.length > 0) {
        res.json(livros_recentes);
    } else {
        res.status(404).json({ err: 'Lista de livros do mais novo até o mais antigo, não encontrado' });
    }
});

app.get('/livros/antigos', (req, res) => {
    const livros_antigos = livros.db.slice().sort((a, b) => a.ano - b.ano);

    if (livros_antigos.length > 0) {
        res.json(livros_antigos);
    } else {
        res.status(404).json({ err: 'Lista de livros do mais antigo até o mais novo, não encontrado' });
    }
});

app.get('/livros/sem-estoque', (req, res) => {
    const livros_sem_estoque = livros.db.filter(l => parseInt(l.quant, 10) === 0);

    if (livros_sem_estoque.length > 0) {
        res.json(livros_sem_estoque);
    } else {
        res.status(404).json({ err: 'Livros sem estoque, não encontrado' });
    }
});

app.get('/livros/acima/:preco', (req, res) => {
    const preco_acima_livro = livros.db.filter(l => l.preco > parseFloat(req.params.preco));

    if (preco_acima_livro.length > 0) {
        res.json(preco_acima_livro);
    } else {
        res.status(404).json({ err: 'Preço dos livros acima do informado, não encontrado' });
    }
});

app.get('/livros/abaixo/:preco', (req, res) => {
    const preco_abaixo_livro = livros.db.filter(l => l.preco < parseFloat(req.params.preco));

    if (preco_abaixo_livro.length > 0) {
        res.json(preco_abaixo_livro);
    } else {
        res.status(404).json({ err: 'Preço dos livros abaixo do informado, não encontrado' });
    }
});

app.get('/livros/:titulo', (req, res) => {
    const titulo_livro = livros.db.filter(l => l.titulo === req.params.titulo);

    if (titulo_livro.length > 0) {
        res.json(titulo_livro);
    } else {
        res.status(404).json({ err: 'Título do livro, não encontrado' });
    }
});

app.post('/livros', (req, res) => {
    let lastId = Math.max(...livros.db.map(l => l.id));

    if (lastId === -1) {
        return res.status(404).json({ err: 'Livro não encontrado, inserção não concluida' });
    }

    const novo_livro = {
        id: ++lastId,
        titulo: req.body.titulo,
        autor: req.body.autor,
        editora: req.body.editora,
        ano: parseInt(req.body.ano),
        quant: parseInt(req.body.quant),
        preco: parseFloat(req.body.preco)
    };
    livros.db.push(novo_livro);
    res.json(livros.db);
});

app.put('/livros/:id', (req, res) => {
    const index = livros.db.findIndex(l => l.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ err: 'Livro não encontrado, atualização não concluida' });
    }

    livros.db[index] = {
        id: parseInt(req.params.id),
        titulo: req.body.titulo,
        autor: req.body.autor,
        editora: req.body.editora,
        ano: parseInt(req.body.ano),
        quant: parseInt(req.body.quant),
        preco: parseFloat(req.body.preco)
    };
    res.json(livros.db[index]);
});

app.delete('/livros/:id', (req, res) => {
    const index = livros.db.findIndex(l => l.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ err: 'Livro não encontrado, remoção não concluida' });
    }

    livros.db.splice(index, 1);
    res.json(livros.db);
});