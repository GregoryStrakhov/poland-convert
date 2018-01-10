const express = require('express');
const hbs = require('hbs');
let needle = require('needle');
let app = express();
const url = 'https://api.fixer.io/latest?base=USD';
const port = process.env.PORT || 3000;
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

app.listen(port, () => {
    console.log(`server up on port ${port}`);
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