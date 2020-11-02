const passport = require('passport');
const { User } = require('../models');
const local = require('./local')
module.exports = () => {
    passport.serializeUser((user, done) => {
        done(user.id);
    });
    passport.deserializeUser( async(userid, done) => {
        try {
            const user = await User.findOne({
                where : { userid }
            })
            done(null, user);
        } catch(err) {
            console.error(err);
            done(err);
        }
    });

    local();
}