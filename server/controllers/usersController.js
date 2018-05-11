var mongoose = require ('mongoose');
var User = mongoose.model('User');

function createUser (req, res, next){
    const user = new User(req.body);
    user.password = user.hashPassword(user.password);
    user.save((err) => {
        if(err){
            console.log('Error saving user:', user);
            next();
        }
        res.json({ok: true});
    })
}User

function loginUser(req, res, next) {
    //res.json({hello: true});
    User.findOne({email: req.body.email}, (err, user)=>{
        if(err){
            console.log('Error getting user:', err);
            return next();
        }
        if(!user) return res.status(404).json({err: true, message:"User does not exist"});
        if(!user.comparePassword(req.body.password, user.password)){
            return res.status(404).json({err: true, message:"Password does not match"});
        }
        req.session.user = user;
        res.json(user);
    })
}

function getAllUsers(req, res, next) {
    User.find({}, ['name', 'email'], (err, users) =>{
        if(err) {
            cosole.log('Error getting users', err);
            return next();
        }
        res.json(users);
    })
}
 
function getAuthenticatedUsername (req, res, next){
    res.json({name: req.session.user.name});
}


function findOneUser(req, res, next) {
    User.findOne({email: req.params.userEmail}, ['name', 'email', 'jobTitle'], (err, user) => { //compare email in model to email we req through route
        if(err) {
            console.log('Error getting the user:', user)
            return next();
        }
        res.json(user);
    })
}

function authenticateUser(req, res, next) {
    if (req.session.user) return next();
    res.status(401).json({ err: true, message: 'Not authenticated' });
}

    module.exports = {
        createUser,
        getAllUsers,
        loginUser,
        authenticateUser,
        findOneUser,
        getAuthenticatedUsername,
    }
    
