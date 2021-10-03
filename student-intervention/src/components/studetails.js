import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';



export default class details extends Component {

  constructor(props) {
      super(props);
      this.state = {data: {}};
  }

  componentDidMount() {
      axios.get('https://student-performance-app23.herokuapp.com/student/data')
          .then(response => {
            console.log('resp ',response.data)
              let n=response.data.length
              let g=0
              let internship=0
              let inn=0
              let hi=0
              for(let i=0;i<n;i++){
                if(response.data[i].Gender === "F"){
                  g=g+1
                }
                if(response.data[i].inter === "0"){
                  inn+=1
                }
                if(response.data[i].average > hi){
                  hi=response.data[i].average
                }
                if(response.data[i].internships == "1"){
                  internship+=1
                }

              }
              this.setState({data: {total:n,inter:inn,female:g,intern:internship,high:hi}});
          })
          .catch(function (error) {
              console.log(error);
          });

  }

    render() {
        return (
          <div class = "g">

          <h3> Student Details </h3>

          <h4> Total Students : {this.state.data.total} </h4>
          <h4> Student Intervention : {this.state.data.inter} </h4>
          <h4> Female students : {this.state.data.female} </h4>
          <h4> Internships/Projects : {this.state.data.intern} </h4>
          <h4> Highest Score : {this.state.data.high} </h4>

          </div>
            )
        }
    }
