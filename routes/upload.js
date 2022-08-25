const router = module.exports = require('express').Router();
const multer = require('multer');
const frixys = require('frixys');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/');
    },
    filename: (req, file, cb) => {
        const id = frixys.generateID(25);
       cb(null, id + "." + file.originalname.split(".").pop())
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('post'), async(req, res) => {
  console.log(req.file);
  res.status(201).json({success: true, file: req.file}).end();
});
