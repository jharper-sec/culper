import React from 'react'
import ValidationElement from '../ValidationElement'
import Generic from '../Generic'

export default class Text extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value || '',
      error: props.error || false,
      valid: props.valid || false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.value === nextProps.value) {
      return
    }
    this.setState({ value: nextProps.value })
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    event.persist()
    this.setState({ value: event.target.value }, () => {
      super.handleChange(event)
      if (this.props.onUpdate) {
        this.props.onUpdate({
          value: this.state.value,
          name: this.props.name
        })
      }
    })
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, errorCodes) {
    this.setState({error: status === false, valid: status === true}, () => {
      super.handleValidation(event, status, errorCodes)
    })
  }

  render () {
    return (
      <Generic name={this.props.name}
               label={this.props.label}
               placeholder={this.props.placeholder}
               type="text"
               className={this.props.className}
               disabled={this.props.disabled}
               minlength={this.props.minlength}
               maxlength={this.props.maxlength}
               pattern={this.props.pattern}
               readonly={this.props.readonly}
               required={this.props.required}
               value={this.state.value}
               focus={this.props.focus}
               error={this.props.error}
               valid={this.state.valid}
               onChange={this.handleChange}
               onFocus={this.props.onFocus}
               onBlur={this.props.onBlur}
               onValidate={this.handleValidation}
               onKeyDown={this.props.onKeyDown}
               onCopy={this.props.onCopy}
               onCut={this.props.onCut}
               onPaste={this.props.onPaste}
               clipboard={this.props.clipboard}
               tabBack={this.props.tabBack}
               tabNext={this.props.tabNext}
               ref="text"
               />
    )
  }
}
