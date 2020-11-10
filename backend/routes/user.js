const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport')
const { User, Post, Comment } = require('../models');
const router = express.Router();
router.post('/signup', async(req, res, next) => {
    try {
        const userid = await User.findOne({
            where: {
                userid: req.body.userid,
            }
        });
        const nickname = await User.findOne({
            where: {
                nickname: req.body.nickname,
            }
        });
        if(userid || nickname) {
            return res.status(403).send("이미 사용중인 아이디나 닉네임입니다.")
        }
        const password = await bcrypt.hash(req.body.password, 5);
        await User.create({
            nickname: req.body.nickname,
            userid: req.body.userid,
            password: password
        });
        res.send("회원가입 완료");
    } catch (err) {
        console.error(err);
        next(err);
    }
    
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) { //서버쪽에러인경우
            console.error(err);
            next(err);
        }
        if(info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
           
            if(loginErr) { //패스포트에서 에러나면
                // return next(loginErr);
            }
            const UserInfomation = await User.findOne({
                where: { id: user.id },
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: Post,
                    attributes: ['id'],
                },]
            })
            return res.status(200).json(UserInfomation);
        })
    })(req, res, next)
});

router.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.status(200).send('logoutSuccess')
})

router.post('/nickchange', async (req, res, next) => {
    try {
        const nickname = await User.findOne({
            where: {
                nickname: req.body.nickname,
            }
        });
        if(nickname) {
            return res.status(403).send("이미 사용중인 닉네임입니다.")
        }
        await User.update(
            { 
                nickname: req.body.nickname 
            },
            { 
                where: { id: req.body.user.data.id } 
            }
        );
        res.status(200).send("changeNick");
    } catch (err) {
        console.error(err);
        next(err);
    }
})

router.get('/', async (req, res) => {
    try {
        if(req.user)
        {
            const user = await User.findOne({
                where: { id: req.user.id },
                include: [
                    {
                        model: Post,
                        attributes: ['id', 'title'],
                    },
                    {
                        model: Comment,
                        attributes: ['id', 'content'],
                    },
                ]
                
            });
            res.status(200).json(user);
        } else {
            res.status(200).json(null);
        }
        
    } catch(err) {
        console.error(err);
        next(err);
    }
})

module.exports = router;