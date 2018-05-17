import React from 'react'
import renderer from 'react-test-renderer'
import App from '../../pages/index/components/app'

it('Homepage_app renders correctly', () => {
  fetch.once(JSON.stringify({ count: 0 }))
  const tree = renderer
    .create(<App />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
