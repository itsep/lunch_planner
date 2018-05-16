import initialState from './initial_state'
import actionTypes from './action_types'

/*
reducer should get split to multiple reducer and then with combine(reducerList) combined in the end
so its easier to search for an statechange
 */

/*
where do function come in?
 */

/*
there is something to do
when the state gets changed by some functions, there should be an call,
to send requests to the backend and thend get the current state of the db again
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_LOCATION:
      return {
        ...state,
        locations: [action.location, ...state.locations],
      }
    case actionTypes.REQUEST_PAGE_DATA:
      return {
        ...state,
        isLoading: true,
      }
    case actionTypes.RECEIVE_PAGE_DATA:
      return {
        ...state,
        isLoading: false,
        locations: action.data.locations,
        participants: action.data.participants,
      }
    case actionTypes.ADD_USER:
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
                // array like old userIDs just with the new one added
                newTimeStamp.userIDs = [...timeStamp.userIDs, action.user.userId]
                newTimeStamp.participants = [...timeStamp.participants, action.user]
                return newTimeStamp
              }
              return timeStamp
            })
            return newLocation
          }
          return location
        }),
      }
    case actionTypes.DELETE_USER:
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
                /*
                array like old userIDs just whenever an userID is like the one that should get
                deleted, it gets deleted out of the array
                */
                newTimeStamp.userIDs = timeStamp.userIDs.filter(userID => userID !== action.user.userId)
                newTimeStamp.participants = timeStamp.participants.filter(user => user.userId !== action.user.userId)
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
