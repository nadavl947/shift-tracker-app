import React from 'react';
import {connect} from 'react-redux';
import DeleteShift from './DeleteShift.js';

class PastColumnsTable extends React.Component{
  renderitem = (x, y) => {
    return(
      <tr key={this.props.alldataReducer[y].id}>
        <td>{this.props.alldataReducer[y].month_and_year}</td>
        <td>{this.props.alldataReducer[y].shift_date}</td>
        <td>{this.props.alldataReducer[y].shift_start}</td>
        <td>{this.props.alldataReducer[y].shift_end}</td>
        <td>{this.props.alldataReducer[y].total_length}</td>
        <td><DeleteShift itemId={this.props.alldataReducer[y].id}/></td>
      </tr>
    )
  }
  renderList = (x) =>{
    var l = [];
    for(var i = 0; i < x.length; i++){
      l[i] = this.renderitem(x, i);
    }
    return l;
  }
  render(){
    return(
      <div className="pastColumnsTable">
        <h1>My Shifts</h1>
        <table>
          <tbody>
            <tr>
              <th>Month</th>
              <th>Day</th>
              <th>Starts</th>
              <th>End</th>
              <th>Length</th>
              <th>Remove</th>
            </tr>
            {this.renderList(this.props.alldataReducer)}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    alldataReducer: state.alldataReducer
  }
}
export default connect(mapStateToProps)(PastColumnsTable);
