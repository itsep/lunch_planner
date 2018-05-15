// TODO: initial state aus DB holen

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
      timeStamps: arrayOf({
        key: number,
        hour: number,
        minute: number,
        userIDs: arrayOf({
          id: number,
        })
    }
 */
  locations: [{
    id: 0,
    name: 'dean & david',
    timeStamps: [],
  },
  {
    id: 1,
    name: 'Metzgerei',
    userIds: [],
    timeStamps: [],
  },
  {
    id: 2,
    name: 'Pizzeria',
    userIds: [],
    timeStamps: [],
  },
  {
    id: 3,
    name: 'McDonalds',
    userIds: [],
    timeStamps: [],
  },
  {
    id: 4,
    name: 'VSF-dining room',
    userIds: [],
    timeStamps: [],
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
