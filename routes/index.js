var express = require('express');
var router = express.Router();

data = [
    {
        categories: "['ms', 'web', 'infosys', 'softtek', 'servion']",
        text: ".NET",
        level: 5
    },
    {
        categories: "['ms', 'lang', 'infosys', 'softtek', 'servion']",
        text: ".C#",
        level: 5
    },
    {
        categories: "['ms', 'web', 'infosys', 'softtek', 'servion']",
        text: "ASP.NET MVC",
        level: 4.5
    },
    {
        categories: "['ms', 'web', 'softtek']",
        text: "ASP.NET WebForms",
        level: 4
    },
    {
        categories: "['ms', 'web', 'infosys', 'softtek']",
        text: "ASP.NET Web API",
        level: 4
    },
    {
        categories: "['web', 'infosys', 'softtek', 'servion']",
        text: "AJAX",
        level: 4.5
    },
    {
        categories: "['ms', 'SOA', 'infosys', 'softtek']",
        text: "WCF",
        level: 4
    },
    {
        categories: "['ms', 'ODM', 'infosys', 'softtek', 'servion']",
        text: "Entity Framework",
        level: 5
    },
    {
        categories: "['ms', 'ODM', 'infosys', 'softtek']",
        text: "ADO.NET",
        level: 5
    },
    {
        categories: "['web', 'lang', 'infosys', 'softtek', 'servion']",
        text: "Javascript",
        level: 4
    },
    {
        categories: "['web', 'node', 'softtek']",
        text: "Node.js",
        level: 4
    },
    {
        categories: "['web', node, 'softtek']",
        text: "Express.js",
        level: 3.5
    },
    {
        categories: "['web', 'ux', 'infosys', 'softtek', 'servion']",
        text: "Bootstrap",
        level: 4.5
    },
    {
        categories: "['web', 'ux', 'spa', 'infosys', 'softtek']",
        text: "Angular.js",
        level: 3.5
    },
    {
        categories: "['web', 'ux', 'spa','softtek']",
        text: "Knockout.js",
        level: 4
    },
    {
        categories: "['web', 'ux', 'spa','softtek']",
        text: "Aurelia.js",
        level: 3
    },
    {
        categories: "['web', 'ux', 'infosys', 'softtek', 'servion']",
        text: "CSS",
        level: 4.5
    },
    {
        categories: "['web', 'ux', 'infosys', 'softtek', 'servion']",
        text: "SASS",
        level: 4.5
    },
    {
        categories: "['web', 'ux', 'infosys', 'softtek', 'servion']",
        text: "JQuery",
        level: 4.5
    },
    {
        categories: "['ms', 'app', 'infosys', 'softtek']",
        text: "Windows Forms",
        level: 5
    },
    {
        categories: "['ms', 'app', 'infosys', 'softtek']",
        text: "WPF",
        level: 3.5
    },
    {
        categories: "['db', 'infosys']",
        text: "Oracle",
        level: 4
    },
    {
        categories: "['ms', 'db', 'infosys', 'softtek', 'servion']",
        text: "MS Sql Server",
        level: 4.5
    },
    {
        categories: "['db', 'infosys', 'softtek', 'servion']",
        text: "PL/SQL",
        level: 4
    },
    {
        categories: "['ms', 'db', 'infosys', 'softtek', 'servion']",
        text: "T-SQL",
        level: 4
    },
    {
        categories: "['db', 'nosql']",
        text: "MongoDb",
        level: 3
    },
    {
        categories: "['db', 'nosql']",
        text: "ArangoDb",
        level: 3.5
    },
    {
        categories: "['ms', 'db', 'nosql']",
        text: "Azure DocumentDb",
        level: 3
    },
    {
        categories: "['pattern', 'infosys', 'softtek', 'servion']",
        text: "Model View Controller",
        level: 5
    },
    {
        categories: "['pattern', 'infosys']",
        text: "Model View Presenter",
        level: 4.5
    },
    {
        categories: "['pattern', 'infosys', 'softtek', 'servion']",
        text: "Model View ViewModel",
        level: 4
    },
    {
        categories: "['pattern']",
        text: "Microservices",
        level: 2.5
    },
    {
        categories: "['pattern']",
        text: "Event Sourcing",
        level: 2.5
    },
    {
        categories: "['pattern']",
        text: "CQRS",
        level: 2.5
    }
]

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('Hi from index route!');
  res.render('index', { title: 'Express', skills: data});
});

module.exports = router;
