import React from 'react';
import {GetShiftListAction} from '../actions';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';

import HomePage from './HomePage.js';
import StatisticsPage from './StatisticsPage.js';
import Header from './Header.js';
import Fotter from './Fotter.js';
import LogInPage from './LogInPage.js';

class App extends React.Component{

  componentDidMount(){
    this.getData();
  }

  getData = () => {
    fetch(`http://localhost:4000/?user_email=${JSON.stringify(localStorage.getItem('user_email'))}`)
    .then(response => response.json())
    .then (({ data }) => {
      this.props.GetShiftListAction(data);
    })
    .catch(err => console.error(err))
  }

  render(){
    var background = {
      background: 'url(background_homePage.jpg) 0% 0% / cover',
      backgroundAttachment: 'fixed'
    }
    return(
      <div style={background}>
        <BrowserRouter>
          <Header/>
          <Route path='/' exact component={LogInPage}/>
          <Route path='/Home' exact component={HomePage}/>
          <Route path='/statistics' exact component={StatisticsPage}/>
          <Fotter/>
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {GetShiftListAction})(App);
