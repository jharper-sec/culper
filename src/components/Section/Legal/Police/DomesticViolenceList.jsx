import React from 'react'
import { i18n } from 'config'
import { Accordion, Branch, Show } from 'components/Form'
import { Summary, DateSummary } from 'components/Summary'
import {
  LEGAL,
  LEGAL_POLICE_DOMESTIC_VIOLENCE,
} from 'config/formSections/legal'
import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import DomesticViolence from './DomesticViolence'

const sectionConfig = {
  key: LEGAL_POLICE_DOMESTIC_VIOLENCE.key,
  section: LEGAL.name,
  store: LEGAL.store,
  subsection: LEGAL_POLICE_DOMESTIC_VIOLENCE.name,
  storeKey: LEGAL_POLICE_DOMESTIC_VIOLENCE.storeKey,
}

export class DomesticViolenceList extends Subsection {
  constructor(props) {
    super(props)

    const {
      section, subsection, store, storeKey,
    } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey
  }

  update = (queue) => {
    this.props.onUpdate(this.storeKey, {
      HasDomesticViolence: this.props.HasDomesticViolence,
      List: this.props.List,
      ...queue,
    })
  }

  updateBranch = (values) => {
    this.update({
      HasDomesticViolence: values,
      List: values.value === 'No' ? Accordion.defaultList : this.props.List,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  summary = (item, index) => {
    const o = (item || {}).Item || {}
    const dates = DateSummary(o.Issued)
    const description = o.Explanation && o.Explanation.value
      ? o.Explanation.value
      : ''

    return Summary({
      type: i18n.t('legal.police.collection.summary.item'),
      index,
      left: description,
      right: dates,
      placeholder: i18n.t('legal.police.collection.summary.unknown'),
    })
  }

  render() {
    const { errors } = this.props
    const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

    return (
      <div
        className="section-content domestic-violence-list"
        data-section={LEGAL.key}
        data-subsection={LEGAL_POLICE_DOMESTIC_VIOLENCE.key}
      >
        <h1 className="section-header">{i18n.t('legal.subsection.police.domesticViolence')}</h1>
        <Branch
          name="has_domestic_violence"
          label={i18n.t('legal.police.label.domesticViolence')}
          labelSize="h4"
          className="has-domestic-violence"
          {...this.props.HasDomesticViolence}
          warning={true}
          onUpdate={this.updateBranch}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}
        />
        <Show when={(this.props.HasDomesticViolence || {}).value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            label={i18n.t('legal.police.label.domesticViolence')}
            labelSize="h2"
            className="has-order"
            summary={this.summary}
            appendTitle={i18n.t('legal.police.label.domesticViolenceAppend')}
            onError={this.handleError}
            onUpdate={this.updateList}
            errors={accordionErrors}
            required={this.props.required}
            scrollToBottom={this.props.scrollToBottom}
            scrollIntoView={this.props.scrollIntoView}
          >
            <DomesticViolence
              name="Item"
              addressBooks={this.props.addressBooks}
              dispatch={this.props.dispatch}
              bind={true}
              onError={this.handleError}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

DomesticViolenceList.defaultProps = {
  HasDomesticViolence: {},
  List: Accordion.defaultList,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'legal',
  subsection: 'police/domesticviolence',
  addressBooks: {},
  dispatch: () => {},
  scrollToBottom: '',
  errors: [],
}

export default connectSubsection(DomesticViolenceList, sectionConfig)
