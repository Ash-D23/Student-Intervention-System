import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader'
import './styles.css';

const Stu = props => (
    <tr className='completed'>
        <td>{props.data.name}</td>
        <td>{props.data.Gender}</td>
        <td>{props.data.average}</td>
        <td>
            <Link to={"/edit/"+props.data._id}>Edit</Link>
        </td>
    </tr>
)

export default class Display extends Component {

    constructor(props) {
        super(props);
        this.state = {students: []};
    }

    componentDidMount() {
        axios.get('https://student-performance-app23.herokuapp.com/student/')
            .then(response => {
              console.log('res ',response.data)
                this.setState({students: response.data});
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    /*

    componentDidUpdate() {
      axios.get('http://localhost:4000/student/')
          .then(response => {
            console.log('res ',response.data)
              this.setState({students: response.data});
          })
          .catch(function (error) {
              console.log(error);
          });

    }*/


    stuList() {
        return this.state.students.map(function(currentStudent, i) {
            console.log('current ',currentStudent.name)
            return <Stu data={currentStudent} key={i} />;
        });
    }


    render() {
        return (
            <div>
                <br />
                <h3>Students List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Average</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                     { this.state.students[0] ? this.stuList() : <Loader />  }
                    </tbody>
                </table>
                <br />
                </div>
            )
        }
    }
