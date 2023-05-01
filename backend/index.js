const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

require('./db')

app.get('/', (req,res)=>{
    res.send('hello')
})
app.use(cors());
app.use(express.json());
app.use(require("./Routes/CreateUser"));
app.use(require("./Routes/DisplayData"));
app.use(require("./Routes/OrderData"));
app.listen(port, ()=>{
    console.log(`app listening ${port}`)
})