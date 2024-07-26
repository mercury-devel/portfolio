const express = require('express');
const app = express();
const port = 80;

const ensureSecure = (req, res, next) => {
  // Проверяем, если запрос не безопасен (не HTTPS)
  if (req.headers['x-forwarded-proto'] !== 'https') {
    // Перенаправляем на тот же URL, но с HTTPS
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
};

app.enable('trust proxy');

app.use(ensureSecure);

app.set('view engine', 'ejs');
app.use(express.static('public', {
  maxAge: '30d'
}));

const allowDomainMiddleware = (req, res, next) => {
  const allowedHosts = ['nocrynomercy.ru', 'localhost'];

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
