// Modules required
const express = require(`express`)
const path = require(`path`)
const indexRoute = require('./routes/index')

// Init server
const app = express()

app.use(express.static(path.join(__dirname,'public')))

// Custom server settings
app.set('port', process.env.PORT || 3000 )
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs');

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/', indexRoute)

// start server
app.listen( app.get('port'), () => {
    console.log(`Server runing on port ${app.get('port')}`)
})