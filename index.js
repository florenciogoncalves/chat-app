const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connection = require('./database/database');
const session = require('express-session');
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

// Database
connection.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log(`Database fault: ${err}`))

// Session
app.use(session({
    secret: 'ksndjfui3#$n3ij/(=dsd5dd&4e58&de45d',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

// Body-Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Public
app.use(express.static(path.join(__dirname, 'public')))

// View engine
app.set('view engine', 'ejs')

// Models
const User = require('./models/User');
const Message = require('./models/Message');

// Controllers
app.use('/', require('./controllers/UserController'))

// Routes
app.get('/', (req, res) => {
    res.render('')
    // if (req.session.authenticated) {
    // }
    // else
    // res.redirect('/login')
})

// Socket.io
io.on('connection', socket => {
    socket.on('sendMessage', data => {
        console.log(data)
    })
})


server.listen(4000, error => {
    if (error)
        console.log(error)
    else
        console.log('Server is running')
})