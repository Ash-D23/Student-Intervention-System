import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const Stu = props => (
    <tr className='completed'>
        <td>{props.data.name}</td>
        <td>{props.data.Gender}</td>
        <td>{props.data.average}</td>
    </tr>
)

export default class Intervention extends Component {

    constructor(props) {
        super(props);
        this.state = {students: []};
    }

    componentDidMount() {
        axios.get('https://student-performance-app23.herokuapp.com/student/inter')
            .then(response => {
              console.log('res ',response.data)
                this.setState({students: response.data});
            })
            .catch(function (error) {
                console.log(error);
            });

    }




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
                <h3>Intervention Required : </h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Average</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.stuList() }
                    </tbody>
                </table>
                <br />
                </div>
            )
        }
    }
