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
    default: return state
  }
}
