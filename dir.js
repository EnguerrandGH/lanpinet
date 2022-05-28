const fs = require('fs');

const textures_dir = "./views/img/textures/previews/";
const textures_content_dir = "./views/img/textures/content/";

const models_dir = "./views/img/models/previews/";
const models_content_dir = "./views/img/models/content/";

exports.textures_list = function() {

    let textures = [];
    const files = fs.readdirSync(textures_dir); 

    for (const file of files) {
        textures.push(file.split('.')[0]);
    }
        
    return textures;
}

exports.textures_content_list = function(name) {

    let textures = [];
    const files = fs.readdirSync(textures_content_dir + name); 

    for (const file of files) {
        textures.push(file);
    }
        
    return textures;
}

exports.models_list = function() {

    let models = [];
    const files = fs.readdirSync(models_dir); 

    for (const file of files) {
        models.push(file.split('.')[0]);
    }
        
    return models;
}

exports.models_content_list = function(name) {

    let models = [];
    const files = fs.readdirSync(models_content_dir + name); 

    for (const file of files) {
        models.push(file);
    }
        
    return models;
}
