const passport = require('passport');
const { Strategy } = require('passport-local')
const { User } = require('../models')
const bcrypt = require('bcrypt')
module.exports = () => {
    passport.use(new Strategy({
        usernameField: 'userid',
        passwordField: 'password',
    }, async (userid, password, done)=> {
        try {
            const user = await User.findOne({
                where: {
                    userid: userid,
                }
            })
            if (!user) {
                //server error, success, client
                return done(null, false, {reason: "사용자가 없습니다."});
            }
    
            const result = await bcrypt.compare(password, user.password)
            if(result) {
                return done(null, user);
            }
            return done(null, false, {reason: '비밀번호가 틀렸습니다'});
        } catch(err) {
            console.error(err);
            return done(err);
        }
    }))
}