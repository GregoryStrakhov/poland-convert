const express = require('express');
const hbs = require('hbs');
let needle = require('needle');
let app = express();
const url = 'https://api.fixer.io/latest?base=USD';
let v;

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    getCurrency((err, v) => {
        if (err) return res.status(500).json(err);
        res.render('start.hbs', {
            PLN: v,
        });

    })
});

app.listen(3000, () => {
    console.log('server up on port 3000');
});


function getCurrency(cb) {
    needle('get', url)
        .then(function(response) {
            v = response.body.rates.PLN;
            cb(null, v);
        })
        .catch(function(err) {
            cb(err)
        });
}