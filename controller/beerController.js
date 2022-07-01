var express = require('express');
var mongoose = require('mongoose');
var dbData = require('../model/beer.js');
var BeerModel = mongoose.model("beer",dbData.BeerSchema,"beer");

module.exports.getAll = async (req,res) => {
    console.log('---Get all---');
    console.log(req.body);
    try {
        const beers = await BeerModel.find();
        res.json(beers);
    } catch(err){
        console.log(err);
        res.status(500).send("There was an error.");
    }
};

module.exports.getByName = async (req,res) => {
    console.log('---Get by name---');
    console.log(req.body);
    try{
        let beer = await BeerModel.find({'name': req.params.name});
        if(!beer){
            res.status(404).send('There is no beer named that way yet.');
        }
        res.json(beer);
    } catch(err){
        console.log(err);
        res.status(500).send('There was an error');
    }
};

module.exports.getByStyle = async (req,res) => {
    console.log('---Get by style---');
    console.log(req.body);
    try{
        let beers = await BeerModel.find({'style': req.params.style});

        if(!beers){
            res.status(404).send('There is no beer of that style yet.');
        }

        res.json(beers);
    } catch(err){
        console.log(err);
        res.status(500).send('There was an error.');
    }
};

module.exports.createBeer = async (req,res) => {
    console.log('---Create beer---');
    console.log(req.body);
    try{
        //Maybe check if the beer is already created
        let beer = await BeerModel.find({'name': req.body.name});
        if (!beer.length){ //The result of the query is empty, meaning there is no beer named that way yet.
            beer = new BeerModel(req.body);
            await beer.save(); // used to save the document to the database.
            res.send(beer);
        }
        else {
            console.log('Already added');
            res.status(403).send('The selected beer is already present on the database. Try to add a different one.');
        }
    } catch(err){
        console.log(err);
        res.status(500).send('There was an error');
    }
};

module.exports.updateBeer = async (req,res) => {
    console.log('---Update beer---');
    console.log(req.body);
    console.log(req.params.name);
    try{
        let beer = await BeerModel.find({'name': req.params.name});
        if(!beer.length){ // No length, the query is empty. That means, no beers found.
            console.log("It doesn't exists");
            res.status(404).json({msg: "The beer selected to update doesnt exists!"})
        }
        else{
            console.log("Updating the selected beer");
            const update = {
                "name": req.body.name,
                "style": req.body.style,
                "ibu": req.body.ibu,
                "abv": req.body.abv,
                "brewer": req.body.brewer,
                "tags": req.body.tags
            }
            beer = await BeerModel.findOneAndUpdate({"name": req.params.name}, update);
            res.json(beer);
        }
    } catch(err){
        console.log(err);
        res.status(500).send('There was an error');
    }
};

module.exports.deleteBeer = async (req,res) => {
    console.log('---Delete beer---');
    console.log(req.body);
    try{
        let beer = await BeerModel.find({'name': req.params.name});
        if(!beer.length){ // No length, the query is empty. That means, no beers found. 
            console.log("It doesn't exists");
            res.status(404).json({msg: "The beer selected to delete doesnt exists!"});
        }
        else{
            console.log("Deleting the selected beer");
            await BeerModel.findOneAndRemove({'name': req.params.name});
            res.json({msg: "Beer deleted successfully"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send('There was an error');
    }
};