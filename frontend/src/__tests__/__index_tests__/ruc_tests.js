import React from 'react'
import renderer from 'react-test-renderer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import 'isomorphic-fetch'
import Ruc from '../../pages/index/components/ruc'

describe('Ruc', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MuiThemeProvider><Ruc /></MuiThemeProvider>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  // TODO: Mock to get user number
  // TODO: Mount ruc component
  it('counts correctly', async () => {
    const ruc = new Ruc()
    const count = await ruc.getRegisteredUserNumber()
    expect(count).toEqual(6)
  })
})
