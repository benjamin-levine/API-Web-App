const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {randomFact: null, dailyFact: null});
});

app.post("/randFact", async (req, res) => {
    try {
        const result = await axios.get(`https://uselessfacts.jsph.pl/api/v2/facts/random`)
        console.log(result.data);
        res.render("index.ejs", {randomFact: result.data, dailyFact: null});
    }   catch (error) {
        console.log(error);
        res.status(500);
    }

});

app.post("/todayFact", async (req, res) => {
    try {
        const dailyResult = await axios.get(`https://uselessfacts.jsph.pl/api/v2/facts/today`)
        console.log(dailyResult.data);
        res.render("index.ejs", {randomFact: null, dailyFact: dailyResult.data});
    }   catch (error) {
        console.log(error);
        res.status(500);
    }
});


/*
app.post("/randFact", async (req, res) => {
    const language = req.body.language;
    try {
        const result = await axios.get(`https://uselessfacts.jsph.pl/api/v2/facts/random?language=${language}`)
        console.log(result.data);
        res.render("index.ejs", {randomFact: result.data});
    }   catch (error) {
        console.log(error);
        res.status(500);
    }
    console.log(`Selected language: ${language}`);
});
*/


app.listen(port, () => {
    console.log(`Server is running`);
});

