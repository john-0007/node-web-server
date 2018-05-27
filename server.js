const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || '3000';

const app = express();
hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', `${log}\n`);
  console.log(log);
  next();
});

app.use((req, res, next) => {
  // res.render('maintenance.hbs');
  next();
});

app.use(express.static(`${__dirname}/public`));


hbs.registerHelper('getFullYear', () => new Date().getFullYear());
hbs.registerHelper('scremIt', text => text.toUpperCase());

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    message: 'Well come to the home page'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs');
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs');
});
app.get('/bed', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request!'
  });
});

app.listen(port, () => {
  console.log(`Server is up on the port:${port}`);
});
