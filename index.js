var express = require('express');
var beerRouter = require('./router/beerRouter.js');
const { connector } = require('./model/beer.js');
const client = require('./model/beer.js');
var path = require('path');
var createError = require('http-errors');
var indexRouter = require('./router/index.js');

var port = 3000;

// recording the base directory of the project for later use
global.__basedir = __dirname;

function main(){
    const app = express();
    app.set("port", port);

    connector();
    
    /*
    //Add view engine setup here
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    */

    app.use(express.json()) // for bodies
    app.use(express.urlencoded({ extended: false }));
    app.use("/beer", beerRouter);
    app.use("/", indexRouter);

    // make the public folder available for requests to the server about javascript files
    app.use(express.static("public"));

    /*
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
    
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
    */

    app.listen(port, () => {
        console.log("Server running on port", port);
    });

    return app;
}

main();