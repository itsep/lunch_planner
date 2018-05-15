import initialState from './initial_state'

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_LOCATION':
      return Object.assign({}, state, {
        locations: state.locations.concat([{
          id: state.locations.length,
          name: 'Test Location',
          userIds: [],
        }]),
      })
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
    case 'ADD_TIMESTAMPS':
      return {
        ...state,
      }
    default: return state
  }
}
