const initialState = {
  lunchspace: {
    id: 1,
    name: 'VSF Experts Mannheim',
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
  /*
  locations is an array of many locations. One location has the shape of:
    {
      id: number,
      name: string,
      coordiantes: { long: number, lat: number },
      timeStamps: arrayOf({
        key: number,
        hour: number,
        minute: number,
        userIDs: arrayOf({
          id: number,
        })
    }
 */
  locations: [],
  /*
  joinUpAt is an array of the relation between user
  and location and a single object has the shape of:
    {
      userId: number,
      locationId: number,
      time: { hour: number, minute: number, },
      date: string,
    }
  */
  joinUpAt: [],
  error: null,
}

export default initialState
