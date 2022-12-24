const express = require ('express'); 
const router = express.Router(); 
const Posts = require('../models/posts'); 
const { toInteger} = require('lodash')

router.get('/:username', (req, res) => { 
  console.log(req.body);
  Posts.findOne({username:req.params.username}, (err, docs) => {
    if (!err) {
        if (docs) {
          res.json(docs)
        } else {
          Posts.create({
            username:req.params.username,
            posts:[],
            notes:[],
            sources:[]
          }, (err, doc) =>{
            if (!err) {
              console.log("Created new user.");
            } else {
              console.log(err);
            }
          })
        }
    } else {
        console.error(err);
    }
  })
});



router.post('/:username', (req, res) => { 
  console.log(req.body);
  Posts.findOne({username:req.params.username}, (err, docs) => {
    if (!err) {
        if (docs) {
          if (req.body.amount !== NaN && req.body.amount !== null) {
            docs.posts.push({
              amount: req.body.amount,
              source: req.body.source,
              desc: req.body.desc,
              date : req.body.date
            })
            docs.save();
          }
        } else {
          console.log("User doesn't exist.");
        }
    } else {
        console.error(err);
    }
  })
});

router.post('/notes/add/:username', (req, res) => { 
  console.log(req.body);
  Posts.findOne({username:req.params.username}, (err, docs) => {
    if (!err) {
        if (docs) {
          docs.notes.push({
            note:req.body.note
          })
          docs.save();
          
        } else {
          console.log("User doesn't exist.");
        }
    } else {
        console.error(err);
    }
  })
});

router.post('/notes/delete/:username', (req, res) => { 
  console.log(req.body);
  const deleteIndex = toInteger(req.body.noteId)
  Posts.findOne({username:req.params.username}, (err, docs) => {
    if (!err) {
        if (docs) {
          docs.notes.splice(deleteIndex, 1);
          docs.save();
        } else {
          console.log("User doesn't exist.");
        }
    } else {
        console.error(err);
    }
  })
});

router.post('/sources/add/:username', (req, res) => { 
  console.log(req.body);
  console.log(req.params.username);
  Posts.findOne({username:req.params.username}, (err, docs) => {
    if (!err) {
        if (docs) {
          docs.sources.push({
            source:req.body.source
          })
          docs.save();
          
        } else {
          console.log("User doesn't exist.");
        }
    } else {
        console.error(err);
    }
  })
});


module.exports = router; 