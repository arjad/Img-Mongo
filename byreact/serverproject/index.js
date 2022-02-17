'use strict';
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());

//mongo db connection file
require('./database')();

app.use(bodyParser.json());

//join path to upload folder to send all img files to upload folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/",(req,res)=>{
    res.send("home")
})

//modal
const SingleFile = require('./models/singlefile');

const {upload} = require('./helpers/filehelper');
const { getallSingleFiles } = require('./controllers/fileuploaderController');


const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0)
    {
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

//routes
app.post('/api/singleFile', upload.single('file'),async (req, res, next) => {
    try{
        const file = new SingleFile({
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
        });
        await file.save();
        res.status(201).send('File Uploaded Successfully');
    }
    catch(error) 
    {
        res.status(400).send(error.message);
    }
});


///////
/// show all db data 
app.get('/api/read', async (req, res, next) => {
    try{
        const files = await SingleFile.find();
        res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }
});


app.listen(port, () => {
    console.log(`server is listening on url http://localhost:${port}`)
});