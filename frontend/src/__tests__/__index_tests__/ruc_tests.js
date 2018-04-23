import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import Ruc from '../../pages/index/components/ruc'


describe('Ruc', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })
  it('renders correctly', () => {
    fetch.once(JSON.stringify({ count: 0 }))
    const tree = renderer
      .create(<Ruc />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  // TODO: Mock to get user number
  // TODO: Mount ruc component
  it('counts correctly', async () => {
    fetch.mockResponse(JSON.stringify({ count: 6 }))
    const ruc = mount(<Ruc />)
    const count = await ruc.instance().getRegisteredUserNumber()
    expect(count).toEqual(6)
    expect(ruc.state('registeredUserNumber')).toEqual(6)
  })
})
