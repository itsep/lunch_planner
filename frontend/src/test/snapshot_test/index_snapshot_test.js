import React from 'react'
import renderer from 'react-test-renderer'
import { expect } from 'jest'
import App from '../../pages/index/IndexApp'

it('renders correctly', () => {
  const tree = renderer
    .create(<App />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
