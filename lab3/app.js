const express = require('express');
const app = express();
// will open public/ directory files for http requests
app.use(express.static('public'));
// npm i consolidate swig
const consolidate = require('consolidate');
const path = require('path');


//
// view engine setup
app.engine('html', consolidate.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

const Slides = require('./models/slides');


const PORT = 8080;

app.get('/', (req, res) => {
	res.render('slider');
});

app.get('/api/slides/', async (req, res) =>{
    let slides;
    if(typeof req.query.count !== "undefined"){
        const count = parseInt(req.query.count);
        slides = await Slides.getByCount(count);
    }else{
        slides = await Slides.getAll();
    }
    res.json(slides);
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));