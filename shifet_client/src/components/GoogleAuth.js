import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';

class GoogleAuth extends React.Component{

  componentDidMount(){
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '55640308225-uu6q222lj1hhh7ek7akus78bcrhs876o.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get())
        this.auth.isSignedIn.listen(this.onAuthChange);
      })
    })
  }

  onAuthChange = (isSignedIn) => {
    if(isSignedIn === true) {
      this.props.signIn(this.auth.currentUser.get().w3.U3);
    } else {
      this.props.signOut();
    }
  }

  onSignInClick = () => {
    this.auth.signIn();
  }
  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if(this.props.isSignedIn === null){
      return null
    } else if(this.props.isSignedIn === true){
      return (
        <button onClick={this.onSignOutClick} className="changeUser">Sign Out</button>
      )
    } else {
      return (
        <button onClick={this.onSignInClick} className="changeUser">Sign In</button>
      )
    }
  }
  render(){
    return(
      <div>
        {this.renderAuthButton()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  }
}
export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);
