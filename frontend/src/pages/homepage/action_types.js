const homepageActionTypes = {

  // USER
  ADD_USER: Symbol('homepage/ADD_USER'),
  DELETE_USER: Symbol('homepage/DELETE_USER'),

  // LOCATION
  ADD_LOCATION: Symbol('homepage/ADD_LOCATION'),

  // PAGE
  REQUEST_PAGE_DATA: Symbol('homepage/REQUEST_PAGE_DATA'),
  RECEIVE_PAGE_DATA: Symbol('homepage/RECEIVE_PAGE_DATA'),
}

export { homepageActionTypes }
export default homepageActionTypes
