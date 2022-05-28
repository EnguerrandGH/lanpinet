"use strict";

const express = require('express');
const zip = require('express-zip');
const mustache = require('mustache-express');
const cookieSession = require('cookie-session');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const dir = require('./dir');


let generate_key = function() { return crypto.randomBytes(64).toString('base64'); };

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use( cookieSession({ secret: 'mot-de-passe-du-cookie' }));
  
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './views/html');

const PORT = 3000;
const HOSTNAME = '0.0.0.0';

// ----------------------> GET <---------------------- //


app.get('/', (req, res) => {

    res.render("main.html");

});

// textures

app.get('/textures', (req, res) => {

    let textures = dir.textures_list();

    res.render( "textures.html", {list : textures} );

});

app.get('/texture_details/:name', (req, res) => {

    let texture = req.params.name;
    let images = dir.textures_content_list(texture);

    res.render( "texture_details.html", { list : images, texture });

});

// models

app.get('/models', (req, res) => {

    let models = dir.models_list();

    res.render( "models.html", {list : models} );

});


app.get('/model_details/:name', (req, res) => {

    let model = req.params.name;
    let images = dir.models_content_list(model);

    res.render( "model_details.html", { list : images, model });

});


// ----------------------> POST <---------------------- //


app.post('/download_model/:name', (req, res) => {

    let model = req.params.name;

    res.zip ([

        { path: `download/models/${model}/textures/BaseColor.png`, name:`${model}_BaseColor.png` },
        { path: `download/models/${model}/textures/Metallic.png`, name:`${model}_Metallic.png` },
        { path: `download/models/${model}/textures/Normal.png`, name:`${model}_Normal.png` },
        { path: `download/models/${model}/textures/Roughness.png`, name:`${model}_Roughness.png` },
        { path: `download/models/${model}/blender/${model}.blend`, name:`${model}.blend` },
        { path: `download/models/${model}/fbx/${model}.fbx`, name:`${model}.fbx` }
        
    ], `${model}.zip` );

});


app.post('/download_texture/:name', (req, res) => {

    let model = req.params.name;

    res.zip ([

        { path: `download/textures/${model}/textures/BaseColor.png`, name:`${model}_BaseColor.png` },
        { path: `download/textures/${model}/textures/Metallic.png`, name:`${model}_Metallic.png` },
        { path: `download/textures/${model}/textures/Normal.png`, name:`${model}_Normal.png` },
        { path: `download/textures/${model}/textures/Roughness.png`, name:`${model}_Roughness.png` },
        
    ], `${model}.zip` );

});

app.use(express.static( __dirname + '/views'));
app.listen(PORT, HOSTNAME, () => { console.log(`Serveur a démarré avec le port ${PORT}`) } );
