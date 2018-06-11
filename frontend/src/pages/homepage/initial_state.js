const initialState = {
  lunchspace: {},
  currentDate: new Date(),
  user: {
    id: -1,
    email: '',
    imageUrl: '',
    firstName: '',
    lastName: '',
  },
  locationsInLunchspace: [],
  locations: {},
  users: {},
  error: null,
  eventDialog: undefined /* { locationId, eventTimeId, show } */,
}

export default initialState
