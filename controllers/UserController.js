const Sequelize = require('sequelize');
const router = require('express').Router()
const bcrypt = require('bcryptjs');

// Models
const User = require('../models/User');

// Routes
router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/authenticate/register', (req, res) => {
    const { name, email, password } = req.body

    if (name && email && password) {
        User.findOne({
            where: {
                email
            }
        })
            .then(result => {
                if (!result) {
                    bcrypt.hash(password, 10, (err, hash) => {
                        if (!err) {
                            User.create({ name, email, password: hash })
                                .then(() => {
                                    req.session.authenticated = true
                                    req.session.name = name
                                    req.session.email = email

                                    res.redirect('/')
                                })
                                .catch(err => {
                                    console.log(err)
                                    res.redirect('/register')
                                })

                        }
                        else {
                            res.redirect('/register')
                        }
                    })
                }
            })
            .catch(err => {
                console.log(err)
                res.redirect('/register')
            })
    }
    else {
        res.redirect('/register')
    }
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/authenticate/login', (req, res) => {
    const { email, password } = req.body

    if (email && password) {
        User.findOne({
            where: {
                email
            }
        })
            .then(result => {
                if (result) {
                    bcrypt.compare(password, result.password, (err, result) => {
                        if (!err && result) {
                            req.session.authenticated = true
                            req.session.name = result.name
                            req.session.email = result.email

                            res.redirect('/')
                        }
                        else {
                            res.redirect('/login')
                        }
                    })
                }
                else {
                    res.redirect('/login')
                }
            })
    }
    else {
        res.redirect('/login')
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err)
            console.log(err)
        else
            res.redirect('/login')
    })
})
module.exports = router