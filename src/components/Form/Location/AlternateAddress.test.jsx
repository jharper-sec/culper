import React from 'react'
import { shallow, mount } from 'enzyme'
import { AlternateAddress } from './AlternateAddress'
import { address } from '../../../config/locales/en/address'

describe('<AlternateAddress />', () => {
  describe('when a user indicates a foreign address', () => {
    it('renders a Branch component', () => {
      const props = {
        country: '',
        address: {
          HasDifferentAddress: '',
          Address: { country: '' },
        },
      }

      const component = mount(<AlternateAddress {...props} />)
      const branch = component.find('Branch')

      expect(branch.length).toEqual(1)
      expect(branch.prop('label')).toEqual(address.militaryAddress.meEmployment)
    })

    it('renders an APO/FPO-only component when Branch value is yes', () => {
      const props = {
        country: '',
        address: {
          HasDifferentAddress: { value: 'Yes' },
        },
      }

      const component = mount(<AlternateAddress {...props} />)

      expect(component.find('Branch').length).toBe(1)
      expect(component.find('Location').prop('disableToggle')).toEqual(true)
    })

    it('passes the branch value to the branch', () => {
      const props = {
        country: '',
        address: {
          HasDifferentAddress: { value: 'No' },
        },
      }
      const component = mount(<AlternateAddress {...props} />)

      expect(component.find('Branch').prop('value')).toEqual(props.address.HasDifferentAddress.value)
    })

    describe('when the user toggles to an APO address', () => {
      it('toggles the secondary APO address form properly', () => {
        const props = {
          onUpdate: () => ({}),
          country: 'Spain',
          address: {
            HasDifferentAddress: { value: 'Yes' },
          },
        }
        const component = mount(<AlternateAddress {...props} />)
        expect(component.find('Branch').length).toBe(1)
        component.setProps({ country: { value: 'POSTOFFICE' } })

        expect(component.find('Branch').length).toBe(0)

        const location = component.find('Location')
        // The secondary APO form has a country value of POSTOFFICE
        expect(location.prop('country')).toEqual(undefined)
        expect(location.prop('disableToggle')).toEqual(undefined)
      })
    })
  })

  it('renders the correct field label', () => {
    const props = {
      country: 'POSTOFFICE',
      address: {
        HasDifferentAddress: { value: '' },
        Address: {},
      },
    }
    const component = mount(<AlternateAddress {...props} />)
    const field = component.find('Field')

    expect(field.length).toEqual(1)
    expect(field.prop('title')).toEqual(address.physicalLocationRequired)
  })

  it('resets the alternate address when a new country type is selected', () => {
    const props = {
      belongingTo: 'Address',
      onUpdate: jest.fn(),
      country: 'Germany',
      address: {
        Address: {
          country: 'POSTOFFICE',
          state: 'AA',
        },
        HasDifferentAddress: { value: 'Yes' },
      },
    }

    const component = mount(<AlternateAddress {...props} />)
    expect(component.prop('address').Address.country).toEqual(props.address.Address.country)

    component.setProps({ country: 'United States' })

    expect(props.onUpdate.mock.calls.length).toBe(1)
    expect(props.onUpdate.mock.calls[0][0]).toEqual({
      Address: {
        Address: {},
        HasDifferentAddress: { value: '' },
        Telephone: {},
      },
    })
  })

  it('always shows the APO field when the `forceAPO` prop is supplied', () => {
    const props = {
      belongingTo: 'Address',
      onUpdate: jest.fn(),
      country: 'United States',
      address: {
        Address: {},
        HasDifferentAddress: { value: '' },
      },
    }

    const component = shallow(<AlternateAddress {...props} />)
    expect(component.find('Branch').length).toBe(1)
  })

  describe('when the user indicates an APO address', () => {
    it('supplies the correct props to the Location component', () => {
      const props = {
        country: 'POSTOFFICE',
        address: {
          Address: {
            country: '',
          },
          HasDifferentAddress: { value: '' },
        },
      }
      const component = mount(<AlternateAddress {...props} />)
      const location = component.find('Location')

      expect(location.prop('disableToggle')).toEqual(undefined)
      expect(location.prop('geocode')).toEqual(true)
      expect(location.prop('country')).toEqual(props.address.Address.country)
    })
  })
})
