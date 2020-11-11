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
passportConfig();

app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use(cookieParser())

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'secret'
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: 'http://54.180.122.199',
    credentials: true,
}));
app.use('/user', userRouter);
app.use('/post', postRouter);
app.listen(PORT, () => {
    console.log("서버 실행중")
})