import React from 'react'
import renderer from 'react-test-renderer'
import App from '../../pages/index/components/app'

it('renders correctly', () => {
  const tree = renderer
    .create(<App />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
