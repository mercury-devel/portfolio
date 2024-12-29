const express = require('express');
const app = express();
const port = 80;

const ensureSecure = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
};

app.enable('trust proxy');

app.use(ensureSecure);

app.set('view engine', 'ejs');
app.use(express.static('public', {
  maxAge: 1000
}));

const allowDomainMiddleware = (req, res, next) => {
  const allowedHosts = ['nocrynomercy.ru', 'mercuria.dev'];

  const host = req.headers.host;
  if (!allowedHosts.includes(host)) {
    return res.status(403).send('Access forbidden');
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
