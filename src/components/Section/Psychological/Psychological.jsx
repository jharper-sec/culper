import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { IntroHeader, Show } from '../../Form'
import Competence from './Competence/Competence'
import Consultation from './Consultation/Consultation'
import Hospitalizations from './Hospitalizations/Hospitalizations'
import Diagnoses from './Diagnoses/Diagnoses'
import ExistingConditions from './ExistingConditions/ExistingConditions'
import PsychologicalValidator, { showQuestion21E } from '../../../validators/psychological'
import { extractApplicantBirthDate } from '../extractors'

class Psychological extends SectionElement {
  // /**
  //  * Report errors and completion status
  //  */
  // onValidate (event, status, errorCodes) {
  //   if (!event) {
  //     return
  //   }

  //   if (!event.fake) {
  //     let errors = super.triageErrors(this.props.Section.section, [...this.props.Errors], errorCodes)
  //     this.props.dispatch(reportErrors(this.props.Section.section, '', errors))
  //   }

  //   let cstatus = new PsychologicalValidator(null, this.props).completionStatus(status)
  //   let completed = {
  //     ...this.props.Completed,
  //     ...status,
  //     status: cstatus
  //   }

  //   this.props.dispatch(reportCompletion(this.props.Section.section, this.props.Section.subsection, completed))
  // }

  diagnosesNextLabel () {
    if (this.props.ShowExistingConditions) {
      return i18n.t('psychological.destination.existingConditions')
    }
    return i18n.t('psychological.destination.review')
  }

  diagnosesNext () {
    if (this.props.ShowExistingConditions) {
      return 'psychological/conditions'
    }
    return 'psychological/review'
  }

  render () {
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="">
            <div className="legal intro review-screen">
              <div className="usa-grid-full">
                <IntroHeader Errors={this.props.Errors}
                             Completed={this.props.Completed}
                             tour={i18n.t('psychological.tour.para')}
                             review={i18n.t('psychological.review.para')}
                             onTour={this.handleTour}
                             onReview={this.handleReview}
                             />
              </div>
            </div>
          </SectionView>

          <SectionView name="intro"
                       back="legal/police/domesticviolence"
                       backLabel={ i18n.t('legal.destination.domesticViolence') }
                       next="psychological/competence"
                       nextLabel={ i18n.t('psychological.destination.competence') }>
            <h2>{ i18n.t('psychological.heading.intro') }</h2>
            { i18n.m('psychological.intro.para1') }
            { i18n.m('psychological.intro.para2') }
            { i18n.m('psychological.intro.para3') }
            { i18n.m('psychological.intro.para4') }
          </SectionView>

          <SectionView name="competence"
                       back="psychological/intro"
                       backLabel={ i18n.t('psychological.destination.intro') }
                       next="psychological/consultations"
                       nextLabel={ i18n.t('psychological.destination.consultation') }>
            <Competence name="Competence"
                        {...this.props.Competence}
                        ApplicantBirthDate={this.props.ApplicantBirthDate}
                        onError={this.handleError}
                        onUpdate={this.handleUpdate.bind(this, 'Competence')} />
          </SectionView>

          <SectionView name="consultations"
                       back="psychological/competence"
                       backLabel={ i18n.t('psychological.destination.competence') }
                       next="psychological/hospitalizations"
                       nextLabel={ i18n.t('psychological.destination.hospitalization') }>
            <Consultation name="Consultations"
                          {...this.props.Consultations}
                          ApplicantBirthDate={this.props.ApplicantBirthDate}
                          onError={this.handleError}
                          onUpdate={this.handleUpdate.bind(this, 'Consultation')} />
          </SectionView>
          <SectionView name="hospitalizations"
                       back="psychological/consultations"
                       backLabel={ i18n.t('psychological.destination.consultation') }
                       next="psychological/diagnoses"
                       nextLabel={ i18n.t('psychological.destination.diagnoses') }>
            <Hospitalizations name="Hospitalizations"
                              {...this.props.Hospitalizations}
                              ApplicantBirthDate={this.props.ApplicantBirthDate}
                              onError={this.handleError}
                              onUpdate={this.handleUpdate.bind(this, 'Hospitalization')} />
          </SectionView>
          <SectionView name="diagnoses"
                       back="psychological/hospitalizations"
                       backLabel={ i18n.t('psychological.destination.hospitalization') }
                       next={this.diagnosesNext()}
                       nextLabel={this.diagnosesNextLabel()}>
            <Diagnoses name="Diagnoses"
                       {...this.props.Diagnoses}
                       ApplicantBirthDate={this.props.ApplicantBirthDate}
                       onError={this.handleError}
                       onUpdate={this.handleUpdate.bind(this, 'Diagnoses')}
                       />
          </SectionView>
          <SectionView name="conditions"
                       back="psychological/diagnoses"
                       backLabel={ i18n.t('psychological.destination.diagnoses') }
                       next="psychological/review"
                       nextLabel={ i18n.t('psychological.destination.review') }>
            <ExistingConditions name="ExistingConditions"
                                {...this.props.ExistingConditions}
                                ApplicantBirthDate={this.props.ApplicantBirthDate}
                                onError={this.handleError}
                                onUpdate={this.handleUpdate.bind(this, 'ExistingConditions')}
                                />
          </SectionView>
          <SectionView name="review"
                       title="Let&rsquo;s make sure everything looks right"
                       showTop="true"
                       back="psychological/conditions"
                       backLabel={ i18n.t('psychological.destination.existingConditions') }>

            <Competence name="Competence"
                        {...this.props.Competence}
                        ApplicantBirthDate={this.props.ApplicantBirthDate}
                        defaultState={false}
                        onError={this.handleError}
                        onUpdate={this.handleUpdate.bind(this, 'Competence')} />
            <hr />
            <Consultation name="Consultations"
                          {...this.props.Consultations}
                          ApplicantBirthDate={this.props.ApplicantBirthDate}
                          defaultState={false}
                          onError={this.handleError}
                          onUpdate={this.handleUpdate.bind(this, 'Consultation')} />
            <hr />
            <Hospitalizations name="Hospitalizations"
                              {...this.props.Hospitalizations}
                              ApplicantBirthDate={this.props.ApplicantBirthDate}
                              defaultState={false}
                              onError={this.handleError}
                              onUpdate={this.handleUpdate.bind(this, 'Hospitalization')} />
            <hr />
            <Diagnoses name="Diagnoses"
                       {...this.props.Diagnoses}
                       ApplicantBirthDate={this.props.ApplicantBirthDate}
                       defaultState={false}
                       onError={this.handleError}
                       onUpdate={this.handleUpdate.bind(this, 'Diagnoses')}
                       />
            <Show when={this.props.ShowExistingConditions}>
              <div>
                <hr />
                <ExistingConditions name="ExistingConditions"
                                    {...this.props.ExistingConditions}
                                    ApplicantBirthDate={this.props.ApplicantBirthDate}
                                    defaultState={false}
                                    onError={this.handleError}
                                    onUpdate={this.handleUpdate.bind(this, 'ExistingConditions')}
                                    />
              </div>
            </Show>
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let section = state.section || {}
  let app = state.application || {}
  let psychological = app.Psychological || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Section: section,
    Psychological: psychological,
    Competence: psychological.Competence,
    Consultations: psychological.Consultation,
    Hospitalizations: psychological.Hospitalization,
    Diagnoses: psychological.Diagnoses,
    ExistingConditions: psychological.ExistingConditions,
    Errors: errors.financial || [],
    Completed: completed.psychological || [],
    ShowExistingConditions: showQuestion21E(psychological),
    ApplicantBirthDate: extractApplicantBirthDate(app)
  }
}

Psychological.defaultProps = {
  section: '',
  subsection: '',
  defaultView: 'intro',
  store: 'Psychological'
}

export default connect(mapStateToProps)(AuthenticatedView(Psychological))
