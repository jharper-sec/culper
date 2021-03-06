import { validateModel } from 'models/validate'
import selectiveService from 'models/selectiveService'

describe('The selective service model', () => {
  it('the WasBornAfter branch is required', () => {
    const expectedErrors = ['WasBornAfter.hasValue.MISSING_VALUE']
    const testData = {
      WasBornAfter: { value: '' },
    }

    expect(validateModel(testData, selectiveService))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the HasRegistered branch is required', () => {
    const expectedErrors = ['HasRegistered.presence.REQUIRED']
    const testData = {
      WasBornAfter: { value: 'Yes' },
      HasRegisteredNotApplicable: { applicable: true },
    }

    expect(validateModel(testData, selectiveService))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the RegistrationNumber must have a value', () => {
    const expectedErrors = ['RegistrationNumber.presence.REQUIRED']
    const testData = {
      WasBornAfter: { value: 'Yes' },
      HasRegistered: { value: 'Yes' },
    }

    expect(validateModel(testData, selectiveService))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Explanation must have a value if not registered', () => {
    const expectedErrors = ['Explanation.presence.REQUIRED']
    const testData = {
      WasBornAfter: { value: 'Yes' },
      HasRegistered: { value: 'No' },
    }

    expect(validateModel(testData, selectiveService))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('the Explanation must have a value if applicant doesnt know selective service registration status', () => {
    const expectedErrors = ['Explanation.presence.REQUIRED']
    const testData = {
      WasBornAfter: { value: 'Yes' },
      HasRegistered: { value: '' },
      HasRegisteredNotApplicable: { applicable: false },
    }

    expect(validateModel(testData, selectiveService))
      .toEqual(expect.arrayContaining(expectedErrors))
  })
})
