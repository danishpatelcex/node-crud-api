module.exports = (app) => {
    const App = require("../controllers/app.controller.js");
  
    app.post("/create", App.create);
  
    app.get("/articles", App.findAll);
  
    app.get("/article/:articleId", App.findOne);
  
    app.put("/article/:articleId", App.update);
  
    app.delete("/article/:articleId", App.delete);
  };