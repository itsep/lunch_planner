const defaultState = {
  lunchspace: {
    name: 'lunchspace-name',
    subdomain: 'test-subdomain/',
  },
  profile: {
    src: 'https://pbs.twimg.com/profile_images/845411989589504000/af0aKVig_400x400.jpg',
    firstName: 'David',
    lastName: 'Nadoba',
  },
  locations: [{
    id: 0,
    name: 'Hello',
  }, {
    id: 1,
    name: 'Hi',
  }, {
    id: 2,
    name: 'Hey',
  }, {
    id: 3,
    name: 'Hui',
  }],
  joinUpAt: [{
    userId: 0,
    locationID: 0,
    time: '12:00',
    date: 'today',
  }],
  user: [{
    id: 0,
    src: '',
    firstName: '',
    lastName: '',
  }],
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case '': return state
    default: return state
  }
}
