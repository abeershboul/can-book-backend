'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // 0 - import mongoose
const app = express();
app.use(cors());

const PORT = process.env.PORT ||3033; 

//http:localhost:3001/test
app.get('/test', (request, response) => {
response.send('test request received')

})
// step 1
mongoose.connect('mongodb://localhost:27017/Booksstort', 
{useNewUrlParser: true, useUnifiedTopology: true});

const Book = new mongoose.Schema({ //define the schema (structure)
  title: String,
  description: String,
  status: String
});
const ModelBooks = mongoose.model('Book', Book); //compile the schem into a model           
//step 2
// let seedData=require('./ModelScema');
// app.get('/seedData', seedData);

async function seedData(){
  const firstBook = new ModelBooks({
      title: "The Old Man and the Sea",
      description: "It revolves around the bravery of a Cuban fisherman, who has been struggling to reach shore. This story is an allegory.",
      status: "noval"
  })

  const secondBook = new ModelBooks({
      title: "The Prophet and Other Writings",
      description: "Set in the English countryside, this classic tale follows the adventures of riverside animals",
      status: "story"
  })

  const thirdBook = new ModelBooks({
      title: "The Time Keeper",
      description: "From The author who's inspired millions worldwide with books like Tuesdays with Morrie and The Five People You Meet in Heaven comes his most imaginative novel yet, The Time Keeper--a compelling fable about the first man on Earth to count the hours.",
      status: "Avilable"
  })

  await firstBook.save();
  await secondBook.save();
  await thirdBook.save();
}
 
//seedData();
//http://localhost:3001/books
app.get('/books', getBooksHandler)
function getBooksHandler(req,res) {
  ModelBooks.find({},(err,result)=>{
      if(err)
      {
          console.log(err);
      }
      else
      {
          console.log(result);
          res.json(result);
      }
  })
}
// 

app.listen(PORT, () => console.log(`listening on ${PORT}`));