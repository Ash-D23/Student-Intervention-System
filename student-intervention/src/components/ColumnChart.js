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

  convert(data){
    let res=[0,0,0,0,0]
    
    for (let x of data){
      if(x.average >= 90) {
        res[4]+=1
      }else if (x.average >= 80){
        res[3]+=1
      }else if (x.average >= 60){
        res[2]+=1
      }else if (x.average >= 40) {
        res[1]+=1
      }else{
        res[0]+=1
      }
    }

    return res
  }

  componentDidMount() {
      axios.get('https://student-performance-app23.herokuapp.com/student/column')
          .then(response => {
              console.log('res-col ',response.data)
              this.setState({chartData:{
                labels: ['0-40', '40-60', '60-80', '80-90', '90-100'],
                datasets:[
                  {
                    label:'Marks',
                    data: this.convert(response.data),
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
          /*
          this.setState({chartData:{
            labels: ['0-40', '40-60', '60-80', '80-90', '90-100'],
            datasets:[
              {
                label:'Marks',
                data:[4,3,6,2,7],
                backgroundColor:[
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)'
                ]
              }
            ]
          }});*/

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
