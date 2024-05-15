require('dotenv').config();
const App = require('./app');
const port = process.env.PORT || 3001;
const app = new App();
app.orm.init(false);
app.server.listen(port);
