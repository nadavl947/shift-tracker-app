import React from 'react';
import {connect} from 'react-redux';
import {GetMonthStatisticsAction, GetStatisticsAction} from '../actions';
import RenderTotalStatistics from './StatisticsComponents/RenderTotalStatistics.js';
import RenderMonthStatistics from './StatisticsComponents/RenderMonthStatistics.js';

class StatisticsPage extends React.Component{

  componentDidMount(){
    this.getStatistic()
  }

  getStatistic = () => {
    fetch(`http://localhost:4000/month_statistics?user_email=${JSON.stringify(localStorage.getItem('user_email'))}`)
    .then(response => response.json())
    .then(({ data }) => {
      this.props.GetMonthStatisticsAction(data);
    })
    .catch(err => console.error(err))

    fetch(`http://localhost:4000/statistics?user_email=${JSON.stringify(localStorage.getItem('user_email'))}`)
    .then(response => response.json())
    .then (({ data }) => {
      this.props.GetStatisticsAction(data);
    })
    .catch(err => console.error(err))
  }

  render(){
    return(
      <div className="StatisticsPage">
        <RenderTotalStatistics/>
        <RenderMonthStatistics/>
      </div>
    )
  }
}

export default connect(null, {GetMonthStatisticsAction, GetStatisticsAction})(StatisticsPage);
