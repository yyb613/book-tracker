const express = require('express');
const { sequelize } = require('./models');
const db = require('./models');
const PORT = process.env.PORT || 3001;

const app = express();

app.get('/', function(req, res){
    res.send("Homepage!");
});

sequelize.sync({force:true}).then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is listening at http://localhost:${PORT}`)
    });
});
