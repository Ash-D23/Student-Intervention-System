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
      axios.get('http://localhost:4000/student/data')
          .then(response => {
            console.log('res ',response.data)
              this.setState({data: response.data});
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
          <h4> Student Intervention : {this.state.data.intern} </h4>
          <h4> Female students : {this.state.data.female} </h4>
          <h4> Internships/Projects : {this.state.data.intern} </h4>
          <h4> Highest Score : {this.state.data.high} </h4>

          </div>
            )
        }
    }
