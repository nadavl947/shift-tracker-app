import React from 'react';
import {connect} from 'react-redux';

class AddShift extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      shift_date: '',
      shift_start: '',
      shift_end: '',
      shift_month: 'now()'
    }
  }
  onAddClick = (event) => {
    fetch(`http://localhost:4000/add?shift_month=${this.state.shift_month}&shift_date=${this.state.shift_date}&shift_start=${this.state.shift_start}00&shift_end=${this.state.shift_end}00&user_email=${JSON.stringify(localStorage.getItem('user_email'))}`)
    .then(response => response.json())
    .catch(err => console.error(err))
  }

  render(){
    return(
      <div className="addShift">
        <h1>Add New Shift</h1>
        <form onSubmit={this.onAddClick}>
          <ul>
            <li>
              <label>Shift Date:</label>
              <input
                type='number'
                value={this.state.shift_date}
                onChange={(event) => {this.setState({shift_date: event.target.value})}}
              />
            </li>
            <li>
              <label>Shift Starts:</label>
              <input
                type='number'
                value={this.state.shift_start}
                onChange={(event) => {this.setState({shift_start: event.target.value})}}
              />
            </li>
            <li>
              <label>Shift Ends:</label>
              <input
                type='number'
                value={this.state.shift_end}
                onChange={(event) => {this.setState({shift_end: event.target.value})}}
              />
            </li>
          </ul>
          <p style={{fontSize: '12px'}}>To change month write full date (yyyy:mm:dd)</p>
          <label>Month:</label>
          <input
            type='number'
            value={this.state.shift_month}
            onChange={(event) => {this.setState({shift_month: event.target.value})}}
            placeholder={new Date().getMonth() + 1}
          />
          <br/>
          <input type='submit' value="Add" className="addBtn"/>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps)(AddShift);
