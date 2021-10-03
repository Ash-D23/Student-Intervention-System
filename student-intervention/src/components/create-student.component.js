import React, {Component} from 'react';
import axios from 'axios';

export default class CreateStudent extends Component {

    constructor(props) {
        super(props);

        this.onChangeStudentname = this.onChangeStudentname.bind(this);
        this.onChangeStudentroll = this.onChangeStudentroll.bind(this);
        this.onChangeStudentfailures = this.onChangeStudentfailures.bind(this);
        this.onChangeStudentabsences = this.onChangeStudentabsences.bind(this);
        this.onChangeStudentgender = this.onChangeStudentgender.bind(this);
        this.onChangeStudentinternships = this.onChangeStudentinternships.bind(this);
        this.onChangeStudentaverage = this.onChangeStudentaverage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            roll: '',
            failures: '',
            absences: '',
            Gender:'',
            internships:'',
            average:''
        }
    }

    onChangeStudentname(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeStudentroll(e) {
        this.setState({
            roll: e.target.value
        });
    }

    onChangeStudentfailures(e) {
        this.setState({
            failures: e.target.value
        });
    }

    onChangeStudentabsences(e) {
        this.setState({
            absences: e.target.value
        });
    }

    onChangeStudentgender(e) {
        this.setState({
            Gender: e.target.value
        });
    }

    onChangeStudentinternships(e) {
        this.setState({
            internships: e.target.value
        });
    }

    onChangeStudentaverage(e) {
        this.setState({
            average: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.name}`);
        console.log(`Todo Responsible: ${this.state.roll}`);
        console.log(`Todo Priority: ${this.state.failures}`);
        console.log(`Todo Completed: ${this.state.absences}`);
        console.log(`Todo Description: ${this.state.Gender}`);
        console.log(`Todo Responsible: ${this.state.internships}`);
        console.log(`Todo Priority: ${this.state.average}`);

        const newStudent = {
            name: this.state.name,
            roll: this.state.roll,
            failures: this.state.failures,
            absences: this.state.absences,
            Gender: this.state.Gender,
            internships: this.state.internships,
            average: this.state.average
        }

        axios.post('https://student-performance-app23.herokuapp.com/student/add', newStudent)
            .then(res => console.log(res.data));

      /*  this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        })
*/
        this.props.history.push('/');
    // return <Redirect to="/" />
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Create New Student</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeStudentname}
                                />
                    </div>
                    <div className="form-group">
                        <label>Roll No: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.roll}
                                onChange={this.onChangeStudentroll}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                        <label className="form-check-label">Gender : </label>
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityLow"
                                    value="M"
                                    checked={this.state.Gender ==='M'}
                                    onChange={this.onChangeStudentgender}
                                    />
                            <label className="form-check-label">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityMedium"
                                    value="F"
                                    checked={this.state.Gender==='F'}
                                    onChange={this.onChangeStudentgender}
                                    />
                            <label className="form-check-label">Female</label>
                        </div>

                    </div>
                    <div className="form-group">
                        <label>Failures: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.failures}
                                onChange={this.onChangeStudentfailures}
                                />
                    </div>
                    <div className="form-group">
                        <label>Absences: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.absences}
                                onChange={this.onChangeStudentabsences}
                                />
                    </div>
                    <div className="form-group">
                        <label>Average: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.average}
                                onChange={this.onChangeStudentaverage}
                                />
                    </div>

                    <div className="form-group">
                        <div className="form-check form-check-inline">
                        <label className="form-check-label">Internship: </label>
                            <input  className="form-check-input"
                                    type="radio"
                                    name="iOptions"
                                    id="iLow"
                                    value='1'
                                    checked={this.state.internships==='1'}
                                    onChange={this.onChangeStudentinternships}
                                    />
                            <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityMedium"
                                    value='0'
                                    checked={this.state.internships==='0'}
                                    onChange={this.onChangeStudentinternships}
                                    />
                            <label className="form-check-label">No</label>
                        </div>

                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Student" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
