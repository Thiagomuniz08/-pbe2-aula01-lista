const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.post('/desconto', (req, res)=>{
    const { preco } = req.body;
    let desconto = 0;

    if (preco > 1000){
        desconto = preco * 0.08;
    }

    let precoComDesconto = preco - desconto;
    res.json({preco , desconto, precoComDesconto});
});

app.post('/triangulo', (req, res) =>{
    const { a, b, c} = req.body;
    let triangulo = "";
   
    
    if (a === b & b === c) {
        triangulo = "Triângulo Equilátero";
    } else if (a === b || b === c || a === c) {
        triangulo = "Triângulo Isósceles";
    } else {
        triangulo = "Triângulo Escaleno";
    }

    res.json({triangulo});
});

app.post('/aumento', (req, res) => {
    const { nome, preco } = req.body;

    if (preco <= 0) {
        return res.status(400).send('O preço da mercadoria deve ser maior que zero.');
    }
    let valor = 0;
    
    if (preco < 1000) {
        valor = preco * 1.05;
    } else {
        valor = preco * 1.07; 
    }
    let novoPreco = preco + valor;

    return res.json({nome, novoPreco});
});

app.post('/maior-numero', (req, res) => {
    const { numeros } = req.body;

    if (!Array.isArray(numeros) || numeros.length !== 6) {
        return res.status(400).send('Por favor, envie uma variavel com exatamente 6 números inteiros.');
    }
    if (!numeros.every(num => Number.isInteger(num))) {
        return res.status(400).send('Todos os elementos devem ser números inteiros.');
    }

    const maiorNumero = Math.max(...numeros);
    return res.json({
        maiorNumero: maiorNumero
    });
});

app.post('/ordenarnumero', (req, res) => {
    const { numeros } = req.body;

    if (!Array.isArray(numeros) || numeros.length !== 5) {
        return res.status(400).json({ error: "Por favor, envie exatamente 5 números inteiros." });
    }

    if (numeros.some(num => !Number.isInteger(num))) {
        return res.status(400).json({ error: "Todos os números devem ser inteiros." });
    }

    const numerosOrdenados = numeros.sort((a, b) => a - b);

    res.json({ numerosOrdenados });
});

app.post('/maior-menor', (req, res) => {
    const { numero1, numero2 } = req.body;

    if (!Number.isInteger(numero1) || !Number.isInteger(numero2)) {
        return res.status(400).json({ error: "Ambos os valores devem ser números inteiros." });
    }

    const maior = numero1 > numero2 ? numero1 : numero2;
    const menor = numero1 < numero2 ? numero1 : numero2;

    res.json({ maior, menor });
});

app.post('/reajusteSalarial', (req, res) =>{
    const { salario } = req.body;
    let aumento = 0;

    if (salario >= 1500, salario < 1750) {
        aumento = salario * 15 / 100;
    } else if (salario >= 1750, salario < 2000) {
        aumento = salario * 12 / 100;
    } else if (salario >= 2000, salario < 3000) {
        aumento = salario * 9 / 100;
    } else if (salario >= 3000) {
        aumento = salario * 6 / 100;
    }

    const salarioFinal = salario + aumento;
    res.json({aumento, salarioFinal});
});

app.post('/calcularMedia', (req, res) => {
    const { nota1, nota2, nota3 } = req.body;

    const media = (nota1 + nota2 + nota3) / 3;

    let situacao = '';
    if (media >= 6) {
        situacao = 'Aprovado';
    } else if (media >= 4) {
        situacao = 'Recuperação';
    } else {
        situacao = 'Reprovado';
    }

    res.json({ situacao });
});

app.post('/descontoLoja', (req, res) => {
    const { nome, valor } = req.body;

    let desconto = 0;

    if (nome === "camisa") {
        desconto = 20;
    } else if (nome === "bermuda") {
        desconto = 10; 
    } else if (nome === "calca") {
        desconto = 15;
    }

    const valorDesconto = (valor * desconto) / 100;
    const precoFinal = valor - valorDesconto;

    res.json({ nome, desconto, precoFinal });
});



app.listen(4000, () => {
   console.log('Servidor rodando em http://localhost:4000') 
});