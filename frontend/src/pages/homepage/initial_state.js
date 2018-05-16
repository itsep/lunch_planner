// TODO: everything should be empty

const initialState = {
  lunchspace: {
    name: 'VSF Experts',
    subdomain: 'test-subdomain/',
  },
  profile: {
    src: 'https://pbs.twimg.com/profile_images/845411989589504000/af0aKVig_400x400.jpg',
    firstName: 'David',
    lastName: 'Nadoba',
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
  /*
   user is an array of user and a single object has the shape of:
    {
      id: number,
      src: string,
      firstName: string,
      lastName: string,
    }
   */
  user: [],
}

export default initialState
