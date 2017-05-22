import React from 'react'
import { i18n } from '../../../../config'
import { api } from '../../../../services/api'
import { ValidationElement, Field, DateControl, Show } from '../../../Form'

export default class ApplicantBirthDate extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value,
      estimated: props.estimated
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  /**
   * Handle the change event.
   */
  onUpdate (value) {
    this.setState({ value: value.date }, () => {
      this.handleValidation({}, null, null)
      if (this.props.onUpdate) {
        this.props.onUpdate({
          month: value.month,
          day: value.day,
          year: value.year,
          estimated: value.estimated
        })
      }
    })
  }

  handleError (value, arr) {
    const then = new Date(this.state.value)
    if (isNaN(then.getFullYear()) || then.getFullYear() < 1000) {
      return this.props.onError(value, arr)
    }

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr.concat(this.constructor.errors.map(err => {
      return {
        code: err.code,
        valid: err.func(then, this.props)
      }
    })))
  }

  render () {
    const klass = `birthdate ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <Field help="identification.birthdate.help"
               adjustFor="labels"
               shrink={true}>
          <DateControl name={this.props.name}
                       value={this.state.value}
                       estimated={this.state.estimated}
                       onUpdate={this.onUpdate}
                       onError={this.handleError}
                       />
        </Field>
      </div>
    )
  }
}

ApplicantBirthDate.defaultProps = {
  onError: (value, arr) => { return arr }
}

ApplicantBirthDate.errors = [
  {
    code: 'birthdate.age',
    func: (value, props) => {
      const now = new Date()
      const m = now.getMonth() - value.getMonth()

      let age = now.getFullYear() - value.getFullYear()
      if (m < 0 || (m === 0 && now.getDate() < value.getDate())) {
        age--
      }

      return age > 16 && age < 130
    }
  }
]
