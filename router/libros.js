const express = require("express");
const routerHere = express.Router();
const books = require("../data.js");
const Joi = require('joi');
const library = require("../dbModels/library.js");
const molde = require("../dbModels/library.js");
routerHere.use(express.json());


const bookScheme = Joi.object({
    titulo : Joi.string().required().label("titulo"),
    descripcion : Joi.string().required().label("descripcion"),
    autor : Joi.string().required().label("autor")
})


routerHere.get("/", async (req, res, next) =>{
    const allBooks = await molde.find();
    res.json(allBooks);
})
routerHere.get("/:id", async (req, res, next) => {
    try{
    let read = undefined;
    const allBooks = await molde.find();
    for(let i = 0; i<allBooks.length; i++){
        if(allBooks[i].id == req.params.id){
            read = allBooks[i];
        }
    }
    
    
    if(read == undefined){
        const error = new Error('Libro no encontrado');
        error.status = 404;
        throw error;
    }


    res.json(read)
    
    
    }
    catch(error){
        console.log(error);
        next(error);
    }
})
routerHere.post("/", async (req, res) => {

    //Almacenamos todos los libros de la colleción en una constante.
    const allBooks = await molde.find();
    //Creamos el libro que vamos a querer guardar. Tendrá nuestra propia propiedad 'id' para identificarla, user-friendly
    const toWrite = {
        "name":req.body.name,
        "author":req.body.author,
        "description":req.body.description,
        "id": allBooks.length
    }
  
        //Instanciamos la clase molde que representa la interfaz de mongoose.
        const newBook = new molde(toWrite);
        
        //Le decimos a la clase que ejecute el guardado con el parámetro dado previamente.
        await newBook.save();

        //Le enviamos como respuesta el libro que subió.
        res.json(newBook);
     

    /*
    ACTIVIDAD ANTERIOR.
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
    */
})
routerHere.delete("/:id", async (req, res, next) => {

    //Obtenemos todos los libros en un ARRAY y podemos pasar un ID en formato 0, 1, 2, 3, etc, para que sea más
    //'Client Friendly'.

    //Guardamos todos los libros
    
    const allBooks = await molde.find();
    
    let myId = null;
    const toSelect = parseInt(req.params.id);
    let finalId = null;

    //Buscamos y guardamos el libro que contenga la misma id user-friendly asignada.
    for(let i = 0; i< allBooks.length; i++){
        if(allBooks[i].id == toSelect){
            finalId = allBooks[i]
        }
    }
   
    if(finalId == null){
        res.send("There's no book with that ID");
        return;
    }
    myId = finalId._id.toHexString();

    //Si existe un libro con esa id, en la línea de código anterior se guardó la _id que le asigna mongoose
    //y debajo procederá a buscar ese libro con las funciones de mongoose y eliminarlo con su _id.
    try{
        
        await molde.findByIdAndDelete(myId);

        res.send("I have deleted the book");
        const  newSet = await molde.find();
        for(let i = 0; i< newSet.length; i++){
            const toGive = {
                name:newSet[i].name,
                author:newSet[i].author,
                description:newSet[i].description,
                id:i
            }

            myId = newSet[i]._id.toHexString();
            await molde.findByIdAndUpdate(myId, toGive);

        }
        //Una vez eliminado, actualizará la id user-friendly de todos los libros de menor a mayor para que
        //no hayan huecos entre un número y otro.

    }
    
    catch(err){
        throw err;
    }

    
})
routerHere.put("/:id", async (req, res, next) => {

    //Creamos el libro que queremos guardar en la id dada
    const toWrite = {
        "name":req.body.name,
        "author":req.body.author,
        "description":req.body.description,
        "id": req.params.id
    }

    //Guardamos todos los libros actuales
    const allBooks = await molde.find();
    
    //Obtenemos la _id del libro a cambiar de mongoose a partir de nuestra id user_friendly.
    const myId = allBooks[req.params.id]._id.toHexString();
    const toSelect = parseInt(req.params.id);
   
    if(allBooks[toSelect] == null){
        res.send("There's no book with that ID");
        return;
    }
     //En el caso que exista un libro en esa posición se proporciona la _id guardada y el libro previamente creado.
    await molde.findByIdAndUpdate(myId, toWrite);

        res.send("lo actualicé");
})



module.exports = routerHere;