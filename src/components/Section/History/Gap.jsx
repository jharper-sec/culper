import React from 'react'
import { i18n } from '../../../config'
import { Show } from '../../Form'

/**
 * Renders a formatted gap row
 */
export class Gap extends React.Component {
  render () {
    if (!this.props.dates.from || !this.props.dates.to) {
      return null
    }

    const from = (this.props.dates.from || {}).date || {}
    const to = (this.props.dates.to || {}).date || {}

    return (
      <div className="item">
        <div className="summary">
          <Show when={this.props.first === true}>
            <div className="caption gutters">
                <div className="title">
                  <h4>{i18n.t('collection.summary')}</h4>
                  <hr />
                </div>
            </div>
          </Show>
          <div className="gap row gutters">
            <div className="help">
              <div className="message eapp-error-message">
                <i className="fa fa-exclamation"></i>
                <span className="dates">{`${from.getMonth() + 1}/${from.getFullYear()}-${to.getMonth() + 1}/${to.getFullYear()}`}</span>
                <h4>{this.props.title}</h4>
                <p>{this.props.para}</p>
                <button className="usa-button-outline" onClick={this.props.onClick}>
                  <span>{this.props.btnText}</span>
                  <i className="fa fa-plus-circle"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="divider gutters">
            <hr />
          </div>
        </div>
      </div>
    )
  }
}

Gap.defaultProps = {
  title: '',
  btnText: '',
  para: '',
  first: false,
  dates: {
    from: null,
    to: null
  }
}
