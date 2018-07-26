import errorReducer from './error'
import { clearErrors, updateApplication } from '../actions/ApplicationActions'

describe('Error reducer', () => {
  it('should return default state', () => {
    expect(errorReducer('')(undefined, {})).toEqual({})
  })

  it('can add new error', () => {
    const sectionName = 'errorTest'
    const defaultState = {}
    const action = updateApplication(sectionName, 'identification', [
      {
        section: 'identification',
        subsection: 'othernames',
        uid: '1',
        code: 'something.looks.off',
        valid: false
      },
      {
        section: 'identification',
        subsection: 'othernames',
        uid: '2',
        code: 'something.smells',
        valid: false
      }
    ])
    expect(errorReducer(sectionName)(defaultState, action)[action.property].length).toBe(2)
  })

  it('can update error', () => {
    const sectionName = 'errorTest'
    const defaultState = {
      identification: [
        {
          section: 'identification',
          subsection: 'othernames',
          uid: '1',
          code: 'something.looks.off',
          valid: false
        }
      ]
    }
    const action = updateApplication(sectionName, 'identification', [
      {
        section: 'identification',
        subsection: 'othernames',
        uid: '1',
        code: 'something.looks.off',
        valid: true
      }
    ])
    expect(errorReducer(sectionName)(defaultState, action)[action.property].length).toBe(1)
    expect(errorReducer(sectionName)(defaultState, action)[action.property][0].valid).toBe(true)
  })

  it('can clear errors for a section', () => {
    const defaultState = {
      identification: [
        {
          section: 'identification',
          subsection: 'othernames',
          uid: '1',
          code: 'something.looks.off',
          valid: false
        }
      ],
      foreign: [
        {
          section: 'foreign',
          subsection: 'passport',
          uid: '1',
          code: 'something.looks.off',
          valid: false
        }
      ]
    }
    const action = clearErrors('identification', 'othernames')
    expect(errorReducer('Errors')(defaultState, action)[action.property].length).toBe(0)
    expect(errorReducer('Errors')(defaultState, action)['foreign'].length).toBe(1)
  })
})