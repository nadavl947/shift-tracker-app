import React from 'react';
import {connect} from 'react-redux';
import OneStatFormat from './OneStatFormat.js';
import DoughnutChart from './DoughnutChart.js';

class RenderTotalStatistics extends React.Component{
  renderStatistics = (y) => {
    return (
      <div key={this.props.statisticsReducr[y].total_hours}>
        <h1>All Times Stats</h1>
        <div className="statBox">
          <div>
            <DoughnutChart
              morningData={this.props.statisticsReducr[y].morning}
              noonData={this.props.statisticsReducr[y].noon}
              nightData={this.props.statisticsReducr[y].night}
            />
          </div>
          <div>
            <OneStatFormat statNumber={this.props.statisticsReducr[y].total_shifts} statTitle="Shifts"/>
            <OneStatFormat statNumber={this.props.statisticsReducr[y].total_hours} statTitle="Hours"/>
            <OneStatFormat statNumber={this.props.statisticsReducr[y].weekend} statTitle="Weekends"/>
          </div>
        </div>
      </div>
      )
    }

  renderByIndex = (x) => {
    var l = [];
    for(var i = 0; i < x.length; i++){
      l[i] = this.renderStatistics(i)
    }
    return l;
  }

  render(){
    return(
      <div className="statisticsLine">
        {this.renderByIndex(this.props.statisticsReducr)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    statisticsReducr: state.statisticsReducr
  }
}

export default connect(mapStateToProps)(RenderTotalStatistics);
