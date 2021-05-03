var authenticateJWT = require('../auth')
var UserModel = require('../models/Users');
var ObjectId = require('mongodb').ObjectID;

//  to fetch all users
module.exports = (collections) => {
  const express = require(`express`);
  const app = express();
  app.get('/', authenticateJWT, async function (req, res) {
    try {
      // const test = UserModel.find({});
      // UserModel.find({ name: 'Chetan' }, function (err, results) {
      //   if (err) res.status(500).send(err);
      //   res.send(results);
      // })
      collections.user.find({}).toArray(function (err, docs) {
        if (err) res.status(500).send(err);
        res.send(docs);
      })

    } catch (error) {
      res.status(500).send(error);
    }
  })

  // to fetch a particular user
  app.get('/:id', authenticateJWT, function (req, res) {
    collections.user.find({ _id: ObjectId(req.params.id) }).toArray(function (err, docs) {
      if (err) res.status(500).send(err);
      res.send(docs);
    })
  })

  // to add new user
  app.post('/', authenticateJWT, function (req, res) {
    let body = {
      name: req.body.name,
      address: req.body.address,
      dob: req.body.dob,
      state: req.body.state,
      createdAt: new Date(Date.now()).toISOString()
    }
    collections.user.insertOne(body, (err, results) => {
      if (err) res.status(500).send(err);
      if (results.insertedCount > 0) {
        res.send("Data inserted successfully!!")
      } else {
        res.status(500).send("Failed to insert data");
      }
    })
  })

  // to update user info
  app.put('/:id', authenticateJWT, function (req, res) {
    collections.user.updateOne(
      { "_id": ObjectId(req.params.id) }, // specifies the document to update
      {
        $set: {
          "name": req.body.name,
          "address": req.body.address,
          "dob": req.body.dob,
          "state": req.body.state,
        },
        $currentDate: { "lastModified": true }
      }, (err, results) => {
        if (err) res.status(500).send(err);
        if (results.modifiedCount > 0) {
          res.send("Data Modified successfully!!")
        } else {
          res.status(500).send("Failed to modify data");
        }
      }
    )
  })

  // to delete particular user
  app.delete('/:id', authenticateJWT, function (req, res) {
    collections.user.deleteOne({ "_id": ObjectId(req.params.id) }, (err, results) => {
      if (err) res.status(500).send(err);
      if (results.deletedCount > 0) {
        res.send("Data deleted successfully!!")
      } else {
        res.status(500).send("Failed to delete data");
      }
    });
  })

  return app;
}