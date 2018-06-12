import moment from '../../lib/localized_moment'

const initialState = {
  lunchspace: {},
  currentDate: moment(),
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
