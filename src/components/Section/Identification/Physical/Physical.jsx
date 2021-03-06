import React from 'react'

import { i18n } from 'config'

import {
  Field, Height, Weight, HairColor, EyeColor, Sex,
} from 'components/Form'

import { IDENTIFICATION, IDENTIFICATION_PHYSICAL } from 'config/formSections/identification'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import Subsection from 'components/Section/shared/Subsection'

const sectionConfig = {
  key: IDENTIFICATION_PHYSICAL.key,
  section: IDENTIFICATION.name,
  store: IDENTIFICATION.store,
  subsection: IDENTIFICATION_PHYSICAL.name,
  storeKey: IDENTIFICATION_PHYSICAL.storeKey,
}

export class Physical extends Subsection {
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

  handleUpdate(field, values) {
    this.props.onUpdate(this.storeKey, {
      Height: this.props.Height,
      Weight: this.props.Weight,
      HairColor: this.props.HairColor,
      EyeColor: this.props.EyeColor,
      Sex: this.props.Sex,
      Comments: this.props.Comments,
      [field]: values,
    })
  }

  render() {
    const klass = `section-content physical ${this.props.className || ''}`.trim()

    return (
      <div
        className={klass}
        data-section={IDENTIFICATION.key}
        data-subsection={IDENTIFICATION_PHYSICAL.key}
      >
        <h1 className="section-header">{i18n.t('identification.destination.physical')}</h1>

        <Field
          title={i18n.t('identification.traits.heading.height')}
          titleSize="h4"
          help="identification.traits.help.height"
          adjustFor="labels"
          scrollIntoView={this.props.scrollIntoView}
          shrink={true}
        >
          <Height
            name="height"
            {...this.props.Height}
            onUpdate={(values) => { this.handleUpdate('Height', values) }}
            onError={this.handleError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('identification.traits.heading.weight')}
          titleSize="h4"
          help="identification.traits.help.weight"
          adjustFor="labels"
          scrollIntoView={this.props.scrollIntoView}
          shrink={true}
        >
          <Weight
            name="weight"
            {...this.props.Weight}
            onUpdate={(values) => { this.handleUpdate('Weight', values) }}
            onError={this.handleError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('identification.traits.heading.hair')}
          titleSize="h4"
          adjustFor="big-buttons"
          scrollIntoView={this.props.scrollIntoView}
          help="identification.traits.help.hair"
        >
          <HairColor
            name="hair"
            help="identification.traits.help.hair"
            className=""
            {...this.props.HairColor}
            onUpdate={(values) => { this.handleUpdate('HairColor', values) }}
            onError={this.handleError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('identification.traits.heading.eye')}
          titleSize="h4"
          adjustFor="big-buttons"
          scrollIntoView={this.props.scrollIntoView}
          help="identification.traits.help.eye"
        >
          <EyeColor
            name="eye"
            className=""
            {...this.props.EyeColor}
            onUpdate={(values) => { this.handleUpdate('EyeColor', values) }}
            onError={this.handleError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('identification.traits.heading.sex')}
          titleSize="h4"
          adjustFor="big-buttons"
          scrollIntoView={this.props.scrollIntoView}
          shrink={true}
        >
          <Sex
            name="sex"
            {...this.props.Sex}
            onUpdate={(values) => { this.handleUpdate('Sex', values) }}
            onError={this.handleError}
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

Physical.defaultProps = {
  Height: {},
  Weight: {},
  HairColor: '',
  EyeColor: '',
  Sex: '',
  Comments: {},
  onError: (value, arr) => arr,
  dispatch: () => {},
  required: false,
}

export default connectSubsection(Physical, sectionConfig)
