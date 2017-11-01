const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

//MIDDLEWARE
const checkForSession = require('./middlewares/checkForSession');

//CONTROLLERS
const swag_controller = require('./controllers/swag_controller');
const auth_controller = require('./controllers/auth_controller');
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./controllers/search_controller');

const app = express();

app.use(bodyParser.json());

app.use(session({
    secret: 'fl1pfl!p4',
    resave: false,
    saveUninitialzed: false
}));
app.use(checkForSession);
app.use(express.static(`${__dirname}/../public/build`));

//SWAG
app.get('/api/swag', swag_controller.read);

//AUTH
app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get('/api/user', auth_controller.getUser);

//CART
app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart/', cart_controller.remove);

//SEARCH
app.get('/api/search', search_controller.search);


const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});

