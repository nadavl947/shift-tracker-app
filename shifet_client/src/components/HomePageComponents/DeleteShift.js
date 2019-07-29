import React from 'react';

class DeleteShift extends React.Component{

  onDeleteClick = () => {
    alert('Are you sure you want to delete this shift?')
    fetch(`http://localhost:4000/delete?shift_id=${this.props.itemId}`)
    .then(response => response.json())
    .catch(err => console.error(err))
  }
  render(){
    return(
      <form onSubmit={this.onDeleteClick} className="deleteBtn">
        <input type="submit" value="X"/>
      </form>
    )
  }
}
export default DeleteShift;
