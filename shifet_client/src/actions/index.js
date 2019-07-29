
export const GetShiftListAction = (data) => {
  return {
    type: 'GET_ALL_DATA',
    payload: data
  }
}

export const GetStatisticsAction = (data) => {
  return {
    type: 'STATISTICS_LIST',
    payload: data
  }
}

export const GetMonthStatisticsAction = (data) => {
  return {
    type: 'MONTH_STATISTICS',
    payload: data
  }
}

export const signIn = (userId) => {
  return {
    type: 'SIGN_IN',
    payload: userId
  }
}

export const signOut = () => {
  return {
    type: 'SIGN_OUT'
  }
}
