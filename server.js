require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8088;

app.set('views', __dirname  + '/application/views');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use(express.static(__dirname + '/application'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/', [
    require('./server/routes/direct_route'),
    require('./server/routes/member_route'),
    require('./server/routes/to_do_list_route')
]);

app.use(function (req, res, next) {
    res.status(404).render('404.html');
});

// Error handling
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
