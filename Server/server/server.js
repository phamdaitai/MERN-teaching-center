const _ = require('lodash')
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb')
const port = process.env.PORT || 3000;
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
let{Student}=require('./models/student')


var app = express();

app.use(bodyParser.json());

app.post('/users', (req, res) => {
    console.log(req.body);
    var user = new User({
        _id:new mongoose.Types.ObjectId(),
        username:req.body.username,
        password:req.body.password
    });

    user.save().then((doc) => {

        // console.log(user._id)
        let student= new Student({
            accountId:user.id,
            name:req.body.name,
            address:req.body.address,
            phoneNumber:req.body.phoneNumber,
            email:req.body.email,
            class:req.body.class,
            permission:req.body.permission
        })
        student.save(function (err) {
            if (err) return handleError(err);
        });

        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});
app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send({users});
    }, (e) => {
        res.status(400).send(e);
    })
})
app.patch('/users/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['email']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    User.findByIdAndUpdate(id, {$set: body}, {new: true}).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send(user)
    }).catch((e) => {
        return res.status(400).send();
    })
})
app.delete('/users/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  User.findByIdAndRemove(id).then((user) => {
    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  }).catch((e) => {
    res.status(400).send();
  });
});
app.listen(5000, () => {
    console.log('Started on port 3000');
});
module.exports = {app};
