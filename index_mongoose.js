//New
//var mongoose = require('mongoose');
var express = require('express');
var beerRouter = require('./router/beerRouter.js');
//var dbData = require('./model/beer.js');
const { connector } = require('./model/beer.js');
const client = require('./model/beer.js');

var port = 3000;

function main(){
    const app = express();
    app.set("port", port);

    connector();
    
    app.use(express.json()) // for bodies
    app.use(express.urlencoded({ extended: false }));
    app.use("/beer", beerRouter);

    app.listen(port, () => {
        console.log("Server running");
    });

    return app;
}

main();