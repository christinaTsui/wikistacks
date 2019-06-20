const express = require('express');
const router = express.Router();
// const index = require('../views/index');


router.get('/',(req, res, next) => {
  res.send("hello! router.get")
})

// const models = require("../models");
const { addPage } = require("../views");
const { Page } = require("../models");
const { wikipage } = require("../models");
// router.post('/', (req, res, next) => {
//   res.send(req.body.title)
// })

// router.get('/:slug', (req, res, next) => {
//   res.send(wikipage() );
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
    await page.save();
    console.log(page)
    res.redirect('/wiki/');
  } catch (error) { next(error) }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

module.exports = router;
