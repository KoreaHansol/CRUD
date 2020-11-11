const express = require('express')
const cors = require('cors');
const db = require('./models')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const passportConfig = require('./passport');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post')
const passport = require('passport');
const app = express();
const PORT = 80;
db.sequelize.sync()
.then(() => {
    console.log("db accsess")
})
.catch(console.error);
// app.use(cors({
//     origin: 'http://k-hansol.com',
//     credentials: true,
// }));
router.use(function(req, res, next) {
    var dt = new Date();
    var d = dt.toFormat("YYYY-MM-DD HH24:MI:SS");
    console.log("date = ", d);

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
passportConfig();
app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use(cookieParser())

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'secret',
    cookie: {
      httpOnly: true,
      secure: false,
      domain: '.k-hansol.com'
    },
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/user', userRouter);
app.use('/post', postRouter);
app.listen(PORT, () => {
    console.log("서버 실행중")
})