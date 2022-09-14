import express from 'express';
import multer from 'multer';

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/upload')
    },
    filename: (req, file, cb) => {
        console.log(file.filename,file.originalname)
        cb(null, `${file.filename}-${Date.now()}${path.extname(file.originalname)}`)
    }

})
function checkFileType(file,cb){
    const fileType=/jpg|jpeg|png/
    const extname=fileType.test(path.extname(file.originalname).toLowerCase())
   console.log(extname ,"extname")
    const mimetype=fileType.test(file.mimetype)
    if (extname&&mimetype){
        return cb(null, true)

    }else{
        cd('image only !')
    }

}
const upload=multer({
    storage,
    fileFilter:function(req,file, cb){
        checkFileType(req,file, cb)
    }

})
router.post('/',upload.single('image'),(req,res)=>{
    console.log(req)
    res.send(`/${req}`)
})
export default router;