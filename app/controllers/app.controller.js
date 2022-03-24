const Article = require("../model/article.model.js");


// Create and Save a new article
exports.create = (req, res) => {
  const message = new Article({
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
  });
  message
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the article.",
      });
    });
};

// Retrieve all articles from the database.
exports.findAll = (req, res) => {
  Article.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles.",
      });
    });
};

// Find a single article with a Id
exports.findOne = (req, res) => {
  Article.findById(req.params.articleId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "article not found with id " + req.params.articleId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "article not found with id " + req.params.articleId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving article with id " + req.params.articleId,
      });
    });
};

// Update a article identified by the articleId in the request
exports.update = (req, res) => {
  Article.findByIdAndUpdate(
    req.params.articleId,
    {
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "article not found with id " + req.params.articleId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "article not found with id " + req.params.articleId,
        });
      }
      return res.status(500).send({
        message: "Error updating article with id " + req.params.articleId,
      });
    });
};

// Delete a article with the specified articleId in the request
exports.delete = (req, res) => {
  Article.findByIdAndRemove(req.params.articleId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "article not found with id " + req.params.articleId,
        });
      }
      res.send({ message: "article deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "article not found with id " + req.params.articleId,
        });
      }
      return res.status(500).send({
        message: "Could not delete article with id " + req.params.articleId,
      });
    });
};