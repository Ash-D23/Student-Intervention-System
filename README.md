# Student Intervention System

# Introduction

Web Application for Student’s Performance Analysis and to Identify students who might need early intervention before they fail to graduate. It is generally meant for Department HOD and faculties to analyze student's Performance and Results. It stores Student Deltails in a database and uses Machine Learning Model to identify Students who might need early intervention and Python Data Analysis tools like Pandas and Data Visualization tools like Seaborn is used to analyze the overall Performance of the Class or Department.

## Tech Stack 

`React JS, Data Analysis & Machine Learning with Python, Flask, MongoDB and Node JS`

```
Frontend : React JS & BootStrap
Backend : Node JS & MongoDB
Machine Learning Model running on Flask
Data Analysis & Data Visualization using Python
```

## How to Run

* Clone the Repository
* Use Jupyter Lab to Open the ML and Python files and run the Flask server
* Goto student-intervention folder and type `npm install` ( React app ) and then `npm start` in Command Prompt
* Goto api folder and type `npm install` ( Node JS Server) and `node server.js` also run the MongoDB database
* React App will start running on `localhost:3000`

## DataSet

The dataset used in this project is included as `student-intervention.csv`. This dataset has the following attributes:

* `sex` : student's sex (binary: "F" - female or "M" - male)
* `failures` : number of past class failures (numeric: n if 1<=n<3, else 4)
* `paid` : extra paid classes like online courses (binary: yes or no)
* `activities` : extra-curricular activities (binary: yes or no)
* `absences` : number of school absences (numeric: from 0 to 93)
* `G1 G2 G3` : Internal marks of students
* `passed` : did the student pass the final exam (binary: yes or no)

![Student](https://github.com/Ash-D23/Student-Intervention-System/blob/master/Screenshots/2019-06-28%20(1).png)

Demo : https://ash-d23.github.io/student-performance-react-app/
