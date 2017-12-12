import { unschema } from '../schema'
import { identificationBirthdate } from './identification-birthdate'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      Date: {}
    }

    expect(unschema(identificationBirthdate(data))).toEqual(data)
  })
})
