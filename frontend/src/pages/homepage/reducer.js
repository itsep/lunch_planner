import initialState from './initial_state'

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_LOCATION':
      return {
        ...state,
        locations: [action.location, ...state.locations],
      }
    case 'REQUEST_PAGE_DATA':
      return Object.assign({}, state, {
        isLoading: true,
      })
    case 'RECEIVE_PAGE_DATA':
      return Object.assign({}, state, {
        isLoading: false,
        locations: action.data.locations,
        participants: action.data.participants,
      })
    default: return state
  }
}
