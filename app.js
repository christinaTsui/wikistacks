const express = require('express');
const morgan = require('morgan');
const index = require('./views/index');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');



const app = express();
app.use(morgan('dev'));
app.use(express.static(__dirname +  '/public'));
app.use(express.urlencoded({ extended: false }));

const models = require('./models');

const PORT = 3000;

const init = async () => {
  // await models.db.sync({force: true});
  await models.User.sync()
  await models.Page.sync()
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`)
  });
}

app.use('/wiki', wikiRouter)
app.use('/user', userRouter)

app.get('/', (req, res) => {
  res.redirect('/wiki')
});

init();




