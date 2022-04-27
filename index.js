require("dotenv").config();
const express = require("express");
const res = require("express/lib/response");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const port = process.env.PORT || 3000;

const pokedex = [
    {
        id: 1,
        name: "Bulbassaur",
        description:
            "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
        type: "Grass",
        image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
        height: "0.7 m",
        weight: "6.9 kg",
        category: "Seed",
        abilities: "Overgrow",
    },
    {
        id: 2,
        name: "Charmander",
        description:
            "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
        type: "Fire",
        image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
        height: "0.6 m",
        weight: "8.5 kg",
        category: "Lizard",
        abilities: "Blaze",
    },
    {
        id: 3,
        name: "Squirtle",
        description:
            "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
        type: "Water",
        image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
        height: "0.5 m",
        weight: "9.0 kg",
        category: "Tiny Turtle",
        abilities: "Torrent",
    },
];

let pokemon = undefined;

//Rotas
app.get("/", (req, res) => {
    res.render("index", { pokedex, pokemon });
});

app.post("/add", (req, res) => {
    const pokemon = req.body;
    pokemon.id = pokedex.length + 1;
    pokedex.push(pokemon);
    res.redirect("/");
});

app.get("/register", (req, res) => {
    res.render("register.ejs", { pokemon });
});

app.get("/details/:id", (req, res) => {
    const id = +req.params.id;
    pokemon = pokedex.find(pokemon => pokemon.id === id);
    res.redirect("/#register");
});

app.listen(port, () =>
    console.log(`Servidor rodando em http://localhost:${port}`),
);
