import multer from "multer";

const storage = multer.diskStorage({
    filename: function(req,file,callback){
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null,uniquePrefix + '-' + file.originalname)
    }
})

const upload = multer({storage})

export default upload