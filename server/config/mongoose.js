var mongoose =require ('mongoose');
var fs= require ('fs');
//connect to da data base
//remember to change the name of database
mongoose.connect('mongodb://localhost/logreg-david2');
// mongodb://root:root@ds137435.mlab.com:37435/todo

//loads all of the model files
var models_path = __dirname + '/../models'
//for each file in the path
fs.readdirSync(models_path).forEach(function(file){
    //check if it is a js file, if so load it
    if(file.indexOf('.js')> 0) {
        //load each model file
        require(models_path + '/' + file);
    }
})

