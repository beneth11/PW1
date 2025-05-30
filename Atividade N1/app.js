var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const argon2 = require('argon2');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

const sequelize = require('./models/db');
const User = require('./models/User');

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/profile/', function(req, res, next) {
  res.render('auth/profile', { title: 'Perfil' });
});

app.get('/history/', function(req, res, next) {
  res.render('auth/history', { title: 'Histórico', users });
});

// Login route (username and password authentication)
app.post('/login/history', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (user && await argon2.verify(user.passwordHash, password)) {
    // If password matches, save user to session
    req.session.user = user;
    return res.redirect('/history');
  } else {
    return res.status(401).send('Credenciais inválidas');
  }
});

app.post('/login/profile', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (user && await argon2.verify(user.passwordHash, password)) {
    // If password matches, save user to session
    req.session.user = user;
    return res.redirect('/profile');
  } else {
    return res.status(401).send('Credenciais inválidas');
  }
});

app.post('/login/update', async (req, res) => {
  return res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.title = "Error " + err.status;
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

sequelize.sync({ alter: true }).then(() => {
  console.log('Banco sincronizado');
});