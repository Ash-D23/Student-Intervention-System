const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const api = express.Router();
var request = require('request');
const PORT = process.env.PORT || 4000;

let student = require('./student.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.mongo_uri, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

api.route('/qr').get(function(req, res) {

    /*student.countDocuments({Gender: 'M'}, function(err, c) {
           console.log('Count is ' + c);
           res.json(c)
      });*/

      student.find().limit(5).sort({average:-1}).select({name:1,average:1,Gender:1}).exec(function(err, c) {
        if (err) {
            console.log(err);
        } else {
            res.json(c);
        }
        });

});

api.route('/pie').get(function(req, res) {

   var arr = []
    student.countDocuments({Gender: 'M'}, function(err, c) {
      arr.push(c);
      student.countDocuments({Gender: 'F'}, function(err, c) {
             arr.push(c);
             res.json(arr)
        });
      });

});

api.route('/line').get(function(req, res) {

    student.find().select({absences:1,_id:0}).exec(function(err, c) {
        if (err) {
            console.log(err);
        } else {
            res.json(c)
        }
        });


});

api.route('/column').get(function(req, res) {

    student.find().select({average:1,_id:0}).exec(function(err, c) {
        if (err) {
            console.log(err);
        } else {
            res.json(c)
        }
        });



})

api.route('/inter').get(function(req, res) {

    /*student.countDocuments({Gender: 'M'}, function(err, c) {
           console.log('Count is ' + c);
           res.json(c)
      });*/

      student.find({inter: "0"}, function(err, c) {
             res.json(c)
        })

})

api.route('/data').get(function(req, res) {

    /*student.countDocuments({Gender: 'M'}, function(err, c) {
           console.log('Count is ' + c);
           res.json(c)
      });*/

      student.find().select({name:1,average:1,Gender:1,inter:1,internships:1}).exec(function(err, c) {
        if (err) {
            console.log(err);
        } else {
            res.json(c);
        }
        });



})

api.route('/').get(function(req, res) {
    student.find(function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

api.route('/:id').get(function(req, res) {
    let id = req.params.id;
    student.findById(id, function(err, data) {
        res.json(data);
    });
});



api.route('/add').post(function(req, res) {
    let obj = req.body;
    let arr = [];
    arr.push(parseInt(obj.failures));
    arr.push(parseInt(obj.absences));
    if(obj.Gender === 'M'){
      arr.push(1);
    }else{
      arr.push(0);
    }
    arr.push(parseInt(obj.internships));
    arr.push(parseInt(obj.average));
    let data = {};
    data.exp = arr;
    console.log('data',data)
    if(req.body.average > 50){
      obj.inter="1"
    }
    else{
      obj.inter="0"
    }

  let stu = new student(obj);
    stu.save()
        .then(todo => {
            res.status(200).json({'student': 'student added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new student failed');
        });

});

api.route('/update/:id').post(function(req, res) {
    student.findById(req.params.id, function(err, data) {
        if (!data)
            res.status(404).send('data is not found');
        else
            data.name = req.body.name;
            data.roll= req.body.roll;
            data.failures = req.body.failures;
            data.absences = req.body.absences;
            data.Gender = req.body.Gender;
            data.internships = req.internships;
            data.average = req.body.average;

            data.save().then(todo => {
                res.json('Data updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

app.use('/student', api);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
