import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';

class LineChart extends Component{
  constructor(props){
    super(props);
    this.state = {
     chartData:{}
  }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }

  componentDidMount() {
      axios.get('http://localhost:4000/student/line')
          .then(response => {
            console.log('line ',response.data)
              this.setState({chartData:{
                labels: ['0', '10', '20', '30', '>30'],
                datasets:[
                  {
                    label:'Absences',
                    data:response.data,
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)'
                    ]
                  }
                ]
              }});
          })
          .catch(function (error) {
              console.log(error);
          });

  }



  render(){
    return (
      <div className="chart">
			<Line
      data={this.state.chartData}
			width={100}
			height={75}
      options={{
	    title:{
		  display:this.props.displayTitle,
		  text:'Students Attendance',
		  fontSize:35,
			maintainAspectRatio: false
	  }
   }}
    />
			</div>
			)
		}
	}


export default LineChart;
