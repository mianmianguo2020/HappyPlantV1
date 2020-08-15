const mongoose = require('mongoose');
var bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user: {
        name: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        
    },
    posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Article"
            }
        ],
})


UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.user.password);
};


const User = mongoose.model("User", UserSchema);

module.exports = User;

