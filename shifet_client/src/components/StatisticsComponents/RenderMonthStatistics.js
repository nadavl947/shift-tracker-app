import React from 'react';
import {connect} from 'react-redux';

import OneStatFormat from './OneStatFormat.js';
import DoughnutChart from './DoughnutChart.js';

class RenderMonthStatistics extends React.Component{
  renderList = (y) => {
    return(
      <div key={this.props.monthStatisticsReducr[y].curent_month}>
        <h1>{this.props.monthStatisticsReducr[y].curent_month}</h1>
          <div className="statBox">
            <div>
              <DoughnutChart
                morningData={this.props.monthStatisticsReducr[y].morning}
                noonData={this.props.monthStatisticsReducr[y].noon}
                nightData={this.props.monthStatisticsReducr[y].night}
              />
            </div>
            <div>
              <OneStatFormat statNumber={this.props.monthStatisticsReducr[y].total_shifts} statTitle="Shifts"/>
              <OneStatFormat statNumber={this.props.monthStatisticsReducr[y].total_hours} statTitle="Hours"/>
              <OneStatFormat statNumber={this.props.monthStatisticsReducr[y].weekend} statTitle="Weekends"/>
            </div>
          </div>
      </div>
    )
  }
  renderByIndex = (x) => {
    var l = [];
    for(var i = 0; i < x.length; i++){
      l[i] = this.renderList(i)
    }
    return l
  }
  render(){
    return(
      <div className="statisticsLine">
        {this.renderByIndex(this.props.monthStatisticsReducr)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    monthStatisticsReducr: state.monthStatisticsReducr
  }
}
export default connect(mapStateToProps)(RenderMonthStatistics);
