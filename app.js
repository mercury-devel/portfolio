const express = require('express');
const app = express();
const port = 80;

app.set('view engine', 'ejs');
app.use(express.static('public', {
  maxAge: '30d'
}));

// Middleware для проверки доменного имени
const allowDomainMiddleware = (req, res, next) => {
  const allowedHost = 'www.nocrynomercy.ru'; // Замените на ваш домен

  // Получаем хост из заголовка запроса
  const host = req.headers.host;

  // Проверяем, соответствует ли хост допустимому домену
  if (host !== allowedHost) {
    return res.status(403).send('');
  }

  // Если хост соответствует, продолжаем выполнение запроса
  next();
};

// Использование middleware для всех маршрутов
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
