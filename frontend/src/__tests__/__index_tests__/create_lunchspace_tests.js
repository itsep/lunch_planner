import React from 'react'
import renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'
import { escapeSubdomain } from 'shared/lib/subdomain'
import { LocalizableError } from 'shared/lib/error/localizable_error'
import CreateLunchspace from '../../pages/create_lunchspace/components/create_lunchspace'


it('Create Lunchspace renders correctly', () => {
  // fetch.once(JSON.stringify({ count: 0 }))
  const tree = renderer
    .create(<CreateLunchspace />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

describe('create lunchspace', () => {
  const lunchspaceName = 'VSF Experts Mannheim'
  const lunchspaceSubdomain = escapeSubdomain(lunchspaceName)
  const shortSubdomainName = 'vsf-experts-ma'
  let createLunchspace
  let nameInput
  beforeEach(() => {
    createLunchspace = mount(shallow(<CreateLunchspace />).get(0))
    nameInput = createLunchspace.find("input[name='lunchspace-name']")
    nameInput.instance().value = lunchspaceName
    nameInput.simulate('change')
  })
  it('update subdomain correctly', async () => {
    expect(createLunchspace.state('lunchspaceName')).toEqual(lunchspaceName)
    expect(createLunchspace.state('lunchspaceSubdomain')).toEqual(lunchspaceSubdomain)
  })
  it('update subdomain without chaining the name', async () => {
    const subdomainInput = createLunchspace.find("input[name='subdomain']")
    subdomainInput.instance().value = shortSubdomainName
    subdomainInput.simulate('change')

    expect(createLunchspace.state('lunchspaceName')).toEqual(lunchspaceName)
    expect(createLunchspace.state('lunchspaceSubdomain')).toEqual(shortSubdomainName)
  })
  it('update name without chaining the subdomain', async () => {
    // change subdomain to a custom name
    const subdomainInput = createLunchspace.find("input[name='subdomain']")
    subdomainInput.instance().value = shortSubdomainName
    subdomainInput.simulate('change')
    expect(createLunchspace.state('lunchspaceName')).toEqual(lunchspaceName)
    expect(createLunchspace.state('lunchspaceSubdomain')).toEqual(shortSubdomainName)
    // remove the last char of the name
    const nameWithoutLastChar = lunchspaceName.substring(0, lunchspaceName.length - 1)
    nameInput.instance().value = nameWithoutLastChar
    nameInput.simulate('change')
    // subdomain should not change
    expect(createLunchspace.state('lunchspaceName')).toEqual(nameWithoutLastChar)
    expect(createLunchspace.state('lunchspaceSubdomain')).toEqual(shortSubdomainName)
  })
  it('create a new lunchspace successful', async () => {
    fetch.mockResponse(JSON.stringify({ lunchspaceName, lunchspaceSubdomain }))
    await createLunchspace.instance().handleSubmit()

    expect(createLunchspace.state('isLoading')).toBeFalsy()
    expect(createLunchspace.state('lunchspaceCreated')).toBeTruthy()
  })
  it('create new lunchspace failure - lunchspace subdomain already exists', async () => {
    const errorMessage = 'Lunchspace subdomain already exists.'
    fetch.mockResponse(JSON.stringify({ message: errorMessage }), { status: 409 })
    await createLunchspace.instance().handleSubmit()

    expect(createLunchspace.state('isLoading')).toBeFalsy()
    expect(createLunchspace.state('lunchspaceCreated')).toBeFalsy()
    expect(createLunchspace.state('error')).toBeDefined()
    expect(createLunchspace.state('error')).toBeInstanceOf(LocalizableError)
    expect(createLunchspace.state('lastError')).toBeDefined()
    expect(createLunchspace.state('lastError')).toEqual(createLunchspace.state('error'))

  })
})

