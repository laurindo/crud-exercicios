const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json('ola meus pequenos gafanhotos!!!!!');
});

app.get('/list-accounts', (req, res) => {
    res.json([{
        id: 123,
        name: 'account 01',
        description: 'description khkjhjkhkj'
    }, {
        id: 321,
        name: 'account 02',
        description: 'asdasda xxxxddd'
    }]);
});

app.post('/account', (req, res) => {
    console.log(req.body);
    res.json('created...');
});

app.put('/account', (req, res) => {
    console.log(req.body);
    const data = req.body;
    data.name = "account 03 updated";
    res.json(data);
});

app.delete('/account', (req, res) => {
    const query = req.query;
    res.json(query);
});

const callback = () => {
    console.log(`Server running on port ${PORT}`);
};

app.listen(PORT, callback);