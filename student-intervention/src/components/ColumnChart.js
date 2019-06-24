import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';

class ColumnChart extends Component{
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
      axios.get('http://localhost:4000/student/column')
          .then(response => {
            console.log('res ',response.data)
              this.setState({chartData:{
                labels: ['0-40', '40-60', '60-80', '80-90', '90-100'],
                datasets:[
                  {
                    label:'Marks',
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
			<Bar
      data={this.state.chartData}
			width={100}
			height={75}
      options={{
	    title:{
		  display:this.props.displayTitle,
		  text:'Students Marks',
		  fontSize:35,
			maintainAspectRatio: false
	  }
   }}
    />
			</div>
			)
		}
	}

export default ColumnChart;
