var express = require('express');
  var router = express.Router();
  var Person = require('../models/person');
  var User = require('../models/User');

  


  
  router.post('/person', async function addToDB(req, res) {
  
    var person = new Person({

      _id: req.body._id,
      name: req.body.name,
      surname: req.body.surname,
      tc:req.body.tc,
      phone:req.body.phone

    } );

  
    try {
      doc = await person.save();
      return res.status(201).json(doc);
    }
    catch (err) {
      return res.status(501).json(err);
    }
  });
  

 

  router.get('/person',async function(req,res,next){
     
    Person.find({}, async function (err,person){
      if(err){
        res.send("error");
        next();
      }
      res.json(person);
      
   
    });
   });


   

   router.get('/person/:id',async function(req,res,next){ 
      
    Person.findById({_id: req.params.id}, 
     
      async function(err,person){
        if(err){res.send("error");}
        else { res.json(person);console.log(person); }
       }
  
       );
      });

      
      //import queries for put delete and delete all.




  module.exports = router;