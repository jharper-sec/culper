import React from 'react'
import { i18n } from '../../../../config'
import { PoliceOtherOffensesValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import { DateSummary } from '../../../Summary'
import OtherOffense from './OtherOffense'

export default class OtherOffenses extends SubsectionElement {
  constructor (props) {
    super(props)
    this.state = {
      HasOtherOffenses: props.HasOtherOffenses,
      List: props.List,
      ListBranch: props.ListBranch
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateList = this.updateList.bind(this)
    this.updateHasOtherOffenses = this.updateHasOtherOffenses.bind(this)
  }

  onUpdate (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        HasOtherOffenses: this.props.HasOtherOffenses,
        List: this.props.List,
        ListBranch: this.props.ListBranch,
        ...updateValues
      })
    }
  }
  updateList (values) {
    this.onUpdate({
      List: values.items,
      ListBranch: values.branch
    })
  }

  updateHasOtherOffenses (value) {
    if (value === 'No') {
      this.onUpdate({
        HasOtherOffenses: value,
        List: [],
        ListBranch: ''
      })
    } else {
      this.onUpdate({
        HasOtherOffenses: value
      })
    }
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const o = (item || {}).Item || {}
    const description = o.Description && o.Description.value
          ? o.Description.value
          : i18n.t('legal.police.collection.summary.unknown')
    const dates = DateSummary(o.Date)

    return (
      <span>
        <span className="index">{i18n.t('legal.police.collection.summary.item')} {index + 1}:</span>
        <span className="info"><strong>{description}</strong></span>
        <span className="dates"><strong>{dates}</strong></span>
      </span>
    )
  }

  otherOffenseBranch () {
    return (
      <div>
        <ul className="other-offenses">
          <li>{i18n.m('legal.police.para.otherOffense.first')}</li>
          <li>{i18n.m('legal.police.para.otherOffense.second')}</li>
          <li>{i18n.m('legal.police.para.otherOffense.third')}</li>
          <li>{i18n.m('legal.police.para.otherOffense.fourth')}</li>
          <li>{i18n.m('legal.police.para.otherOffense.fifth')}</li>
        </ul>
      </div>
    )
  }

  render () {
    return (
      <div className="police-other-offenses">
        <h2>{i18n.t('legal.police.para.otherOffense.intro')}</h2>
        <Branch name="has_otheroffenses"
          className="has-otheroffenses"
          value={this.props.HasOtherOffenses}
          onUpdate={this.updateHasOtherOffenses}
          onError={this.handleError}>
          <ul>
            <li>{i18n.m('legal.police.para.otherOffense.first')}</li>
            <li>{i18n.m('legal.police.para.otherOffense.second')}</li>
            <li>{i18n.m('legal.police.para.otherOffense.third')}</li>
            <li>{i18n.m('legal.police.para.otherOffense.fourth')}</li>
            <li>{i18n.m('legal.police.para.otherOffense.fifth')}</li>
          </ul>
        </Branch>

        <Show when={this.props.HasOtherOffenses === 'Yes'}>
          <Accordion minimum="1"
            items={this.props.List}
            defaultState={this.props.defaultState}
            branch={this.props.ListBranch}
            onUpdate={this.updateList}
            onError={this.handleError}
            summary={this.summary}
            description={i18n.t('legal.police.collection.summary.title')}
            appendTitle={i18n.t('legal.police.collection.appendTitle')}
            appendMessage={this.otherOffenseBranch()}
            appendLabel={i18n.t('legal.police.collection.append')}>
            <OtherOffense name="Item"
              bind={true}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

OtherOffenses.defaultProps = {
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'police/additionaloffenses',
  dispatch: () => {},
  validator: (state, props) => {
    return new PoliceOtherOffensesValidator(props).isValid()
  },
  defaultState: true
}