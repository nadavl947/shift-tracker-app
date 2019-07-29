import React from 'react';
import {connect} from 'react-redux';
import {GetShiftListAction, GetMonthStatisticsAction, GetStatisticsAction} from '../../actions';
import GoogleAuth from '../GoogleAuth.js';
import {Link} from 'react-router-dom';

class LogInBox extends React.Component{

  getData = () => {
    localStorage.setItem('user_email', this.props.auth.userId);
    fetch(`http://localhost:4000/?user_email=${JSON.stringify(this.props.auth.userId)}`)
    .then(response => response.json())
    .then (({ data }) => {
      this.props.GetShiftListAction(data);
    })
    .catch(err => console.error(err))

    fetch(`http://localhost:4000/month_statistics?user_email=${JSON.stringify(this.props.auth.userId)}`)
    .then(response => response.json())
    .then(({ data }) => {
      this.props.GetMonthStatisticsAction(data);
    })
    .catch(err => console.error(err))

    fetch(`http://localhost:4000/statistics?user_email=${JSON.stringify(this.props.auth.userId)}`)
    .then(response => response.json())
    .then (({ data }) => {
      this.props.GetStatisticsAction(data);
    })
    .catch(err => console.error(err))
  }

  render(){
    return(
      <div className="loginBox">
        <i className="material-icons">person</i>
        <h1>Current User:</h1>
        <h2><i className="material-icons">person</i> {this.props.auth.userId}</h2>
        <Link to='/Home'><button onClick={this.getData} className="confirmBtn">Confirm</button></Link>
        <GoogleAuth/>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return{
    auth: state.auth
  }
}

export default connect(mapStateToProps, {GetShiftListAction, GetMonthStatisticsAction, GetStatisticsAction})(LogInBox);
