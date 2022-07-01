# webworkshop
## Description
This is a project for a workshop of web development from Systems Engineering, at UNICEN. The goal of this project is to make an entire application using the MEAN (Mongo, Express, Angular, and Node) stack running on a bitnami virtual machine.
The application is a beer menu of any given craft-beer bar. You can add, delete, or update beers, as well as getting the relevant information of them by providing a name or style.
## Usage
The server runs on the 3000 port by default, but you can change this with the variable of the same name at ../index.js.
As you can see on the ../router/beerRouter.js file, there are get, post, put and delete methods. Each one of them recieves zero or more paramethers via the request, and the information for adding new beers goes in the body of the request.
For example, if you want to get all the beers, you can simply use postman or a CRUD script with a GET request on http://localhost:3000/beer/. A different operation could be getting all the information of the beers that match a given type, let's say 'Cream'. This can be done with another GET request, on http://localhost:3000/beer/style/Cream.
The rest of the operations are analogous.
## Credits
Desingned and developed by Erick Andersson.
Teachings by Alfredo Raul Teyseyre and Alejandro Zunino.
