const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// Listar repositórios
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

// Criar novo repositório
app.post("/repositories", (request, response) => {
  const {
    title,
    url,
    techs
  } = request.body;

  const newRepo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(newRepo);

  return response.json(newRepo);
});

// Alterar repositório existente
app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const repo = repositories.find(repo => repo.id === id);

  if (!repo) {
    return response.status(400).send();
  }

    repo.title = title;
    repo.url = url;
    repo.techs = techs;

    return response.json(repo);
});

// Deletar um repositório
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).send();
  }

  repositories.splice(repoIndex, 1);
  return response.status(204).send();
});

// Dar like em um repositório
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  
  const repo = repositories.find(repo => repo.id === id);

  if (!repo) {
    return response.status(400).send()
  }

  repo.likes++;
  return response.json(repo)

});

module.exports = app;
