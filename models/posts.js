const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({ 
  username : String,
  posts : [{
    amount : Number,
    source : String,
    desc : String,
    date : String
  }],
  notes : [{
    note : String
  }],
  sources: [{
    source : String
  }]
  
});



module.exports = mongoose.model('Post', postSchema);