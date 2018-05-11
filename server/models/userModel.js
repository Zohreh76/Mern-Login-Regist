const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name : String,
    email: String,
    password: String,
    jobTitle: String,
    createdAt:{type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now },
});

UsersSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password, 12);
}

UsersSchema.methods.comparePassword = function (password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}

mongoose.model("User", UsersSchema);