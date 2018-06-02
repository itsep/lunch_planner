const homepageActionTypes = {

  // USER
  ADD_PARTICIPANT: Symbol('homepage/ADD_PARTICIPANT'),
  REMOVE_PARTICIPANT: Symbol('homepage/REMOVE_PARTICIPANT'),

  // LOCATION
  ADD_LOCATION: Symbol('homepage/ADD_LOCATION'),

  // ERROR HANDLING
  SET_ERROR: Symbol('homepage/SET_ERROR'),
  RESET_ERROR: Symbol('homepage/RESET_ERROR'),

  // PAGE
  REQUEST_PAGE_DATA: Symbol('homepage/REQUEST_PAGE_DATA'),
  RECEIVE_PAGE_DATA: Symbol('homepage/RECEIVE_PAGE_DATA'),
}

export { homepageActionTypes }
export default homepageActionTypes
