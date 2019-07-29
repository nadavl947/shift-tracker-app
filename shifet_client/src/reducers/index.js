import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';

const alldataReducer = (dataList = '', action) =>{
  switch(action.type) {
    case 'GET_ALL_DATA':
      return dataList = action.payload;
    default:
      return dataList
  }
}

const statisticsReducr = (statisticsList = '', action) => {
  switch(action.type){
    case 'STATISTICS_LIST':
      return statisticsList = action.payload;
    default:
      return statisticsList;
  }
}

const monthStatisticsReducr = (monthStatistics = '', action) =>{
  switch(action.type){
    case 'MONTH_STATISTICS':
     return monthStatistics = action.payload;
   default:
    return monthStatistics;
  }
}

export default combineReducers({
  alldataReducer: alldataReducer,
  statisticsReducr: statisticsReducr,
  monthStatisticsReducr: monthStatisticsReducr,
  auth: AuthReducer,
})
