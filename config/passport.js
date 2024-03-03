const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../model/user.js");
const bcrypt = require('bcrypt');

// passport
// model

// Passport local strategy for user authentication
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        // Find the user by username
        const user = await UserModel.findOne({ username });

        // If user not found or password does not match, return error
        if (!user || !await bcrypt.compare(password, user.password)) {
            return done(null, false, { message: 'Invalid username or password' });
        }

        // If user is found and password matches, return user
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));


// ...
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user object
passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;