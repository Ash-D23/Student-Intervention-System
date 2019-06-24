const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const api = express.Router();
var request = require('request');
const PORT = 4000;

let student = require('./student.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/students', { useNewUrlParser: true });
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

  obj=[]
        student.
     countDocuments({
       absences: { $eq: 0}
     }).
     exec(function(err, c) {
            obj.push(c)
            student.
         countDocuments({
           absences: { $gt: 0, $lt: 10 }
         }).
         exec(function(err, c) {
                obj.push(c)
                student.
             countDocuments({
               absences: { $gt: 10, $lt: 20 }
             }).
             exec(function(err, c) {
                    obj.push(c)
                    student.
                 countDocuments({
                   absences: { $gt: 20, $lt: 30 }
                 }).
                 exec(function(err, c) {
                        obj.push(c)
                        student.
                     countDocuments({
                       absences: { $gt: 30}
                     }).
                     exec(function(err, c) {
                            obj.push(c)
                            res.json(obj)
                       });
                   });
               });
           });
       });
});

api.route('/column').get(function(req, res) {

    /*student.countDocuments({Gender: 'M'}, function(err, c) {
           console.log('Count is ' + c);
           res.json(c)
      });*/
obj=[]
      student.
   countDocuments({
     average: { $gt: 0, $lt: 40 }
   }).
   exec(function(err, c) {
          obj.push(c)
          student.
       countDocuments({
         average: { $gt: 40, $lt: 60 }
       }).
       exec(function(err, c) {
              obj.push(c)
              student.
           countDocuments({
             average: { $gt: 60, $lt: 80 }
           }).
           exec(function(err, c) {
                  obj.push(c)
                  student.
               countDocuments({
                 average: { $gt: 80, $lt: 90 }
               }).
               exec(function(err, c) {
                      obj.push(c)
                      student.
                   countDocuments({
                     average: { $gt: 90, $lt: 100 }
                   }).
                   exec(function(err, c) {
                          obj.push(c)
                          res.json(obj)
                     });
                 });
             });
         });
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

      var obj = {};

      student.countDocuments({Gender: 'F'}, function(err, c) {
             obj.female = c;
             student.countDocuments({internships : 1}, function(err, i) {
                    obj.intern = i;
                    student.countDocuments({}, function(err, t) {
                           obj.total = t;
                           student.find().limit(1).sort({average:-1}).select({average:1,name:1}).exec(function(err, k) {
                             if (err) {
                                 console.log(err);
                             } else {

                                 obj.high = k[0].average
                                 obj.topper = k[0].name

                                 student.countDocuments({inter: '0'}, function(err, c) {
                                        obj.inter = c;
                                        res.json(obj)
                                   });
                             }
                             });

                      });

               });

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

    request.post({
  headers: {'content-type' : 'application/json'},
  url:     'http://127.0.0.1:5000/api',
  body:    JSON.stringify(data)
}, function(error, response, body){
  console.log(body);

  obj.inter=JSON.parse(body);
  console.log(obj);
  let stu = new student(obj);
    stu.save()
        .then(todo => {
            res.status(200).json({'student': 'student added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new student failed');
        });
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
