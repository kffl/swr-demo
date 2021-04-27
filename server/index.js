const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors')

app.use(bodyParser.json());
app.use(cors());

const port = 5000;

let todos = [
    { id: "1", name: "Sample todo" },
    { id: "2", name: "Another todo" },
    { id: "3", name: "ASDF todo" },
];

app.get("/", (req, res) => {
    setTimeout(() => {
        res.json(todos);
    }, 500);
});

app.post("/", (req, res) => {
    todos.push({ name: req.body.name, id: Date.now().toString() });
    setTimeout(() => {
        res.status(200).send({ ok: true });
    }, 1000);
});

app.delete("/:id", (req, res) => {
    todos = todos.filter((todo) => todo.id !== req.param.id);
    setTimeout(() => {
        res.status(200).send({ ok: true });
    }, 1000);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
