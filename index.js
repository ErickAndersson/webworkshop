var express = require('express');
var beerRouter = require('./router/beerRouter.js');
const { connector } = require('./model/beer.js');
const client = require('./model/beer.js');
var path = require('path');
var createError = require('http-errors');
var indexRouter = require('./router/index.js');

var port = 3000;

global.__basedir = __dirname;

function main(){
    const app = express();
    app.set("port", port);

    connector();

    app.use(express.json()) // for bodies
    app.use(express.urlencoded({ extended: false }));
    app.use("/beer", beerRouter);
    app.use("/", indexRouter);

    app.use(express.static("public"));

    app.listen(port, () => {
        console.log("Server running on port", port);
    });

    return app;
}

main();