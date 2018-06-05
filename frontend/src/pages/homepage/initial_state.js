const initialState = {
  lunchspace: {
    id: 1,
    name: 'Team It - bffeae',
    subdomain: 'vsf-experts-ma',
  },
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
}

export default initialState
