const express = require("express");
const routerHere = express.Router();
const books = require("../data.js");
const Joi = require('joi');
routerHere.use(express.json());


const bookScheme = Joi.object({
    titulo : Joi.string().required().label("titulo"),
    descripcion : Joi.string().required().label("descripcion"),
    autor : Joi.string().required().label("autor")
})



routerHere.get("/:id", (req, res, next) => {
    try{
    const read = (books.libros[req.params.id])
    
    if(read == undefined){
        const error = new Error('Libro no encontrado');
        error.status = 404;
        throw error;
    }


    res.json(books.libros[req.params.id])
    
    
    }
    catch(error){
        console.log(error);
        next(error);
    }
})
routerHere.post("/", (req, res) => {

    //Guardo el body a un string y lo paso a objeto con el Parse
    const Body_ = (JSON.stringify(req.body));
    const parsed = JSON.parse(Body_)
    
    //let jsonBody = JSON.stringify(Body_);
    
    const validResult = bookScheme.validate(req.body);
    if(validResult.error!=null){
        error_ = new Error("no es compatible")
        error_.status = 400;
        throw(error_);
    }
    //Paso los atributos del Parsed Json a un objeto
    const nuevoLibro = {
        titulo:parsed.titulo,
        autor:parsed.autor,
        descripcion:parsed.descripcion,
        id: books.libros.length

    }
    //Meto el objeto al array de libros de "data.js"
    books.libros.push(nuevoLibro);
    res.send("creado");
})
routerHere.delete("/:id", (req, res, next) => {
    try{
        
        const selectedBooked = books.libros[req.params.id];
        if(selectedBooked == -1){
            const error = new Error("No existe ese libro");
            error.status = "404";
            throw{error};
        }
        books.libros.splice(req.params.id, 1);


    }
    
    catch(err){
        throw err;
    }

    res.send("lo borré");
})
routerHere.put("/:id", (req, res, next) => {
    const selectedBooked = books.libros[req.params.id];
    if(selectedBooked == -1){
        const error = new Error("No existe ese libro");
        error.status = "404";
        throw{error};
        
    }
     //Guardo el body a un string y lo paso a objeto con el Parse
     const Body_ = (JSON.stringify(req.body));
     const parsed = JSON.parse(Body_)
     
     //let jsonBody = JSON.stringify(Body_);
     
     const validResult = bookScheme.validate(req.body);
     if(validResult.error!=null){
         error_ = new Error("no es compatible")
         error_.status = 400;
         throw(error_);
     }
     //Paso los atributos del Parsed Json a un objeto
     const nuevoLibro = {
         titulo:parsed.titulo,
         autor:parsed.autor,
         descripcion:parsed.descripcion,
         id: books.libros.length
 
     }
    books.libros[req.params.id] = nuevoLibro;
    res.send("Libro cambiado");
})



module.exports = routerHere;