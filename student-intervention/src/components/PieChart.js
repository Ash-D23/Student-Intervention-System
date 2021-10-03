import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';
import axios from 'axios';

class PieChart extends Component{
  constructor(props){
    super(props);
    this.state = {
     chartData:{}
  }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right'
  }

  componentDidMount() {
      axios.get('https://student-performance-app23.herokuapp.com/student/pie')
          .then(response => {
            console.log('res ',response.data)
              this.setState({chartData:{
                labels: ['Male', 'FeMale'],
                datasets:[
                  {
                    label:'Population',
                    data:response.data,
                    backgroundColor:[
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 99, 132, 0.6)',
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
        <Pie
          data={this.state.chartData}
					width={100}
	        height={75}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Male Female',
              fontSize:35,
							maintainAspectRatio: false
            }
          }}
        />
			</div>
			)
		}
	}

export default PieChart;
