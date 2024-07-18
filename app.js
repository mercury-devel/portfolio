const express = require('express');
const app = express();
const port = 80;

app.set('view engine', 'ejs');
app.use(express.static('public', {
  maxAge: '30d'
}));

const allowDomainMiddleware = (req, res, next) => {
  const allowedHosts = ['nocrynomercy.ru', 'localhost'];

  const host = req.headers.host;
  if (!allowedHosts.includes(host)) {
    return res.status(403).send('');
  }

  next();
};

app.use(allowDomainMiddleware);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/activities', (req, res) => {
    res.render('activities');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
