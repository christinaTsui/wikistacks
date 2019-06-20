const express = require('express');
const router = express.Router();
const index = require('../views/index');


router.get('/',async (req, res, next) => {
  const pages = await Page.findAll()
  console.log(pages[0].title);
  res.send(index.main(pages))
})

// const models = require("../models");
const { addPage } = require("../views");
const { Page } = require("../models");
// const { wikipage } = require("../models");
// router.post('/', (req, res, next) => {
//   res.send(req.body.title)
// })


router.post('/', async (req, res, next) => {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
  // req.send(req.body.title)


  const page = await new Page({
    title: req.body.title,
    content: req.body.content
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save(); //saves to the database
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  const foundPage = await Page.findOne({where: {slug: req.params.slug}});
  // console.log(foundPage);

  // res.json(foundPage);
  res.send(index.wikiPage(foundPage))
});

module.exports = router;
