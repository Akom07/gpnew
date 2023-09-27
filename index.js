const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const multer = require('multer')
let { PythonShell } = require('python-shell')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'C:/Users/Akom/Desktop/gp/public/bgres/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname = 'inpg.jpg')
    }

})

const upload = multer({ storage })

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    res.render('home.ejs')
})
app.get('/formsub', (req, res) => {
    res.render('formsub.ejs')
})
////////
app.post('/formsub', upload.single('imgsrc'), (req, res) => {
    const { mod } = req.body
    pyreq(mod)
    res.render('formsub.ejs')
})
////////////////////////////////////





////////////////////////////////////
work
const pyreq = (mod) => {
    let options = {
        args: [mod]
    }
    setTimeout(() => {
        PythonShell.run('rembg-main/inp.py', options).then((results) => {
            // results is an array consisting of messages collected during execution
            return console.log(...results);
        });
    }, 3000)
}





app.listen(3000, () => {

    console.log("we are on port 3000")
})