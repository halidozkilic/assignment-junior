var express = require("express");
var router = express.Router();
var Person = require("../models/person");
var User = require("../models/User");

router.post("/person", async function addToDB(req, res) {
  var person = new Person({
    _id: req.body._id,
    name: req.body.name,
    surname: req.body.surname,
    tc: req.body.tc,
    phone: req.body.phone,
  });

  try {
    doc = await person.save();
    return res.status(201).json(doc);
  } catch (err) {
    return res.status(501).json(err);
  }
});

router.get("/person", async function (req, res, next) {
  Person.find({}, async function (err, person) {
    if (err) {
      res.send("error");
      next();
    }
    res.json(person);
  });
});

router.get("/person/:id", async function (req, res, next) {
  Person.findById(
    { _id: req.params.id },

    async function (err, person) {
      if (err) {
        res.send("error");
      } else {
        res.json(person);
        console.log(person);
      }
    }
  );
});

//import queries for put delete and delete all.

router.delete("/person/:id", async function (req, res, next) {
  
  const id = req.params.id;

  Person.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete person with id=${id}. Maybe person was not found!`
        });
      } else {
        res.send({
          message: "person was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete person with id=" + id
      });
    });
});

router.delete("/deleteAll/", async function (req, res, next) {
  
  Person.remove({}, function(err) { 
    if (err){ 
        console.log(err) 
    }else{ 
        console.log("Result :", result)  
    } 
}); 
  
});

module.exports = router;
