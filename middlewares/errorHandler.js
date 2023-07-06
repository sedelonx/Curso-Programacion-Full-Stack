const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(err.status).json({ error: err.status ||
    'Error en el servidor' });
    res.status(err.status || 404).json({error:err.message||`flaco se te colgo el server`});
    };
    
    module.exports = errorHandler;