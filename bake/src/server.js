const express = require('express');
const cors = require('cors');
const routes = require('./routes/livroroutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);
app.listen(418, () => {
    console.log('Servidor rodando na porta 418');
});
