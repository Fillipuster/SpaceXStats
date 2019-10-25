const express = require('express');

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static('static'));

app.get("/bones", (req, res) => {
	res.send("This is really nice!");
});

app.listen(port);