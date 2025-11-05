const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

const data = JSON.parse(fs.readFileSync('./receptek/recipes.json'));

app.get("/api/recipes", (req, res) => {
    res.json({ result: data.results })
});

app.get("/api/recipes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const recipe = data.results.find(r => r.recipe_id === id)

    if(!recipe) {
        return res.status(404).json({error: 'Nincs ilyen recept!'});
    }
    
    res.json({ result: recipe });
});

app.listen(port, () => {
    console.log(`Szerver fut a ${port} porton.`)
});