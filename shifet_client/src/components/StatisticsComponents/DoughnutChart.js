import React from 'react';
import { Doughnut  } from 'react-chartjs-2';

class DoughnutChart extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      chartData: {
        labels: ['Mornings', 'Noons', 'Nights'],
        datasets: [
          {
            label: 'height',
            data: [this.props.morningData, this.props.noonData, this.props.nightData],
            backgroundColor: ['rgb(255, 105, 180)', 'rgb(123, 104, 238)', 'rgb(240, 230, 140)'],
            hoverBackgroundColor: ['rgb(255, 77, 166)', 'rgb(76, 48, 232)', 'rgb(232, 216, 74)']
          }
        ]
      }
    }
  }
  render(){
    return(
      <div>
      <Doughnut
        data = {this.state.chartData}
        height={200}
        options={{maintainAspectRatio: false }}
      />
      </div>
    )
  }
}
export default DoughnutChart;
