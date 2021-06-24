const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const regexPass = /^[a-zA-Z0-9]*$/g;
const regexMail = /^[a-zA-Z0-9]*@[a-z]*\.[a-z]{2,3}$/g;

async function initAuth() {
    return (req, res, next) => {
        req.auth = {
            login,
            register,
            logout
        }
        if (readToken(req)) {
            next();
        }

        async function login(data) {
            const userName = data.username.trim();

            if (userName === '' || data.password.trim() === '') {
                throw new Error('All fields are required!');
            }

            const uSer = await User.findOne({ userName: userName }).lean() || {};
            
            if (uSer.userName === userName) {
                const itMatch = await bcrypt.compare(data.password.trim(), uSer.hashPassword);
                if (itMatch) {
                    req.user = creatToken(uSer);
                } else {
                    throw new Error('Wrong user name or password!');
                }
            } else {
                throw new Error('Wrong user name or password!');
            }
        };

        async function register(body) {
            const userName = body.username.trim();
            const email = body.email.trim();

            const hasUser = await User.findOne({ userName: userName }).lean();
            const hasMail = await User.findOne({ email: email }).lean();


            if (req.body.username === '' || req.body.email === '' || req.body.password === '') {
                throw new Error('All fields are required!');
            };
            if (req.body.password !== req.body.rePass) {
                throw new Error('Passwords do not match!');
            }
            if (hasUser) {
                throw new Error('Invalid user name!');
            };
            if (hasMail || !body.email.match(regexMail)) {
                throw new Error('Invalid email!');
            };
            if (!body.password.match(regexPass)) {
                throw new Error('Password must consist only english letters and digits!');
            };
            if (body.password.length < 5) {
                throw new Error('The password should be at least 5 characters long!');
            };
            const hashPassword = await bcrypt.hash(body.password.trim(), 10);

            const user = new User({ userName, email, hashPassword });
            await user.save();
            req.user = creatToken(user);

        };

        async function logout() {
            res.clearCookie('HotelCookie');
        };

        function creatToken(user) {
            const viewToken = {
                _id: user._id,
                userName: user.userName,
                email: user.email
            };
            const token = jwt.sign(viewToken, 'hotels');
            res.cookie('HotelCookie', token, { hhtpOnly: true });

            return viewToken;
        };

        function readToken(req) {
            const token = req.cookies['HotelCookie'];

            if (token) {
                try {
                    const data = jwt.verify(token, 'hotels');
                    req.user = data;

                } catch (err) {
                    res.clearCookie('HotelCookie');
                    res.redirect('/auth/login');
                    return false
                }
            }
            return true
        };
    };
};


module.exports = initAuth;