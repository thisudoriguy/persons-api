exports.imageHandler = (req, res, next)=>{
    console.log(req.file);
    next();
}