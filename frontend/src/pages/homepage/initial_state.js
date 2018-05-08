// TODO: initial state aus DB holen

const initialState = {
  lunchspace: {
    name: 'lunchspace-name',
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
      userIds: arrayOf({ id: number,}),
    }
 */
  locations: [{
    id: 0,
    name: 'Test Location',
    userIds: [],
  }],
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
