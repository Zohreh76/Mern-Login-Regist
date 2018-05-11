
const usersController = require('./../controllers/usersController');
const authUser = usersController.authenticateUser;

module.exports = function(app){
    
    app.get('/ping', (req, res) => res.send ('Poing'))

    app.post ('/api/register', usersController.createUser);
    app.post('/api/login', usersController.loginUser);
    app.get('/api/users/', authUser, usersController.getAllUsers);
    app.get('/api/users/:userEmail', authUser, usersController.findOneUser); // u put email of user and take the information
    app.get ('/api/user', authUser, usersController.getAuthenticatedUsername);
    app.get('/api/session', (req, res) =>res.json({session: req.session}));
    app.get('/api/logout', (req, res) => {
        req.session.destroy((err)=>{
            if(err) {
                console.log('Error logging out: ', err);
                return next();
            }
            res.json({ok: true});
        })
    })


    app.post ("/api/*", (req, res) => res.json({error:true, message:"Server error"}));

}
