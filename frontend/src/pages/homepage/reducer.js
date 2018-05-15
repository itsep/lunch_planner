import initialState from './initial_state'

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_LOCATION':
      return {
        ...state,
        locations: [action.location, ...state.locations],
      }
    case 'REQUEST_PAGE_DATA':
      return {
        ...state,
        isLoading: true,
      }
    case 'RECEIVE_PAGE_DATA':
      return {
        ...state,
        isLoading: false,
        locations: action.data.locations,
        participants: action.data.participants,
      }
    case 'ADD_USER':
      return {
        ...state,
        locations: state.locations.map((location) => {
          if (location.id === action.locationID) {
            const newLocation = location
            newLocation.timeStamps = newLocation.timeStamps.map((timeStamp) => {
              if (timeStamp.id === action.timeStampID) {
                const newTimeStamp = timeStamp
                newTimeStamp.userIDs = [action.userID, ...timeStamp.userIDs]
                return newTimeStamp
              }
              return timeStamp
            })
            return newLocation
          }
          return location
        }),
      }
    case 'DELETE_USER':
      return {
        ...state,
        locations: state.locations.map((location) => {
          if (location.id === action.locationID) {
            const newLocation = location
            newLocation.timeStamps = newLocation.timeStamps.map((timeStamp) => {
              if (timeStamp.id === action.timeStampID) {
                const newTimeStamp = timeStamp
                newTimeStamp.userIDs = timeStamp.userIDs.filter(userID => userID !== action.userID)
                return newTimeStamp
              }
              return timeStamp
            })
            return newLocation
          }
          return location
        }),
      }
    default: return state
  }
}
