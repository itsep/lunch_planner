import initialState from './initial_state'

/*
reducer should get split to multiple reducer and then with combine(reducerList) combined in the end
so its easier to search for an statechange
 */

/*
where do function come in?
 */
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
      /*
      searches for location, that is getting changed, action.locationID
      in location for timestamp with action.timeStampID
      then adds User to User list of timeStampID
       */
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
        /*
        searches timestamp the same way, but deletes userID of timestamps user List
        very redundant, new function or other way to search for object in array an then change it
         */
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
