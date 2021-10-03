import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ColumnChart from './ColumnChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import Intervention from './intervention.component';
import Details from './studetails';
import Loader from './Loader'
import './styles.css';

const Stu = props => (
    <tr >
        <td>{props.data.name}</td>
        <td>{props.data.Gender}</td>
        <td>{props.data.average}</td>
    </tr>
)

export default class StudentList extends Component {

    constructor(props) {
        super(props);
        this.state = {students: [],
        redirect : true};
    }

    componentDidMount() {
        axios.get('https://student-performance-app23.herokuapp.com/student/qr')
            .then(response => {
              console.log('res ',response.data)
                this.setState({students: response.data});
            })
            .catch(function (error) {
                console.log(error);
            });

    }

/*  componentDidUpdate() {
        axios.get('http://localhost:4000/student/qr')
            .then(response => {
              console.log('res ',response.data)
                this.setState({students: response.data});
            })
            .catch(function (error) {
                console.log(error);
            });

    }
*/
    //componentDidUpdate(){
    //  window.location.reload();
    //console.log("came to update");
    //}

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
                <h3>Top Students List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Average</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.students[0] ? this.stuList() : <Loader />  }
                    </tbody>
                </table>
                <br />
                <div class="row">

                <div class="col-lg-6 col-md-6 gallery" >
                <ColumnChart />
                </div>
                <div class="col-lg-6 col-md-6 gallery">
                <Details />
                </div>
                <div class="col-lg-6 col-md-6 gallery">
                <LineChart />
                </div>
                <div class="col-lg-6 col-md-6 gallery">
                <PieChart />
                </div>

                </div>
                <br />
                <br />
                <Intervention />

            </div>
        )
    }
}
