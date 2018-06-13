const homepageActionTypes = {

  // LUNCHSPACES
  SET_LUNCHSPACES: Symbol('homepage/SET_LUNCHSPACES'),

  // USER
  ADD_PARTICIPANT: Symbol('homepage/ADD_PARTICIPANT'),
  REMOVE_PARTICIPANT: Symbol('homepage/REMOVE_PARTICIPANT'),

  // LOCATION
  ADD_LOCATION: Symbol('homepage/ADD_LOCATION'),
  REMOVE_LOCATION: Symbol('/homepage/REMOVE_LOCATION'),

  // ERROR HANDLING
  SET_ERROR: Symbol('homepage/SET_ERROR'),
  RESET_ERROR: Symbol('homepage/RESET_ERROR'),

  // PAGE
  REQUEST_PAGE_DATA: Symbol('homepage/REQUEST_PAGE_DATA'),
  RECEIVE_PAGE_DATA: Symbol('homepage/RECEIVE_PAGE_DATA'),

  // EVENT DIALOG
  OPEN_EVENT_DIALOG: Symbol('homepage/OPEN_EVENT_DIALOG'),
  CLOSE_EVENT_DIALOG: Symbol('homepage/CLOSE_EVENT_DIALOG'),

  // CHANGE DATE
  CHANGE_DATE: Symbol('homepage/CHANGE_DATE'),
}

export { homepageActionTypes }
export default homepageActionTypes
