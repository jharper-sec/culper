import * as sections from 'constants/sections'
import { i18n } from 'config'

const FOREIGN = {
  key: sections.FOREIGN,
  name: 'foreign',
  path: '/foreign',
  store: 'Foreign',
  label: i18n.t('foreign.section.name')
}

const FOREIGN_INTRO = {
  key: sections.FOREIGN_INTRO,
  name: 'intro',
  path: `${FOREIGN.path}/intro`,
  label: i18n.t('foreign.subsection.intro')
}

const FOREIGN_PASSPORT = {
  key: sections.FOREIGN_PASSPORT,
  name: 'passport',
  path: `${FOREIGN.path}/passport`,
  storeKey: 'Passport',
  label: i18n.t('foreign.subsection.passport')
}

const FOREIGN_CONTACTS = {
  key: sections.FOREIGN_CONTACTS,
  name: 'contacts',
  path: `${FOREIGN.path}/contacts`,
  storeKey: 'Contacts',
  label: i18n.t('foreign.subsection.contacts')
}

const FOREIGN_ACTIVITIES = {
  key: sections.FOREIGN_ACTIVITIES,
  name: 'activities',
  path: `${FOREIGN.path}/activities`,
  label: i18n.t('foreign.subsection.activities.label')
}

const FOREIGN_ACTIVITIES_DIRECT = {
  key: sections.FOREIGN_ACTIVITIES_DIRECT,
  name: 'direct',
  path: `${FOREIGN_ACTIVITIES.path}/direct`,
  storeKey: 'DirectActivity',
  label: i18n.t('foreign.subsection.activities.direct')
}

const FOREIGN_ACTIVITIES_INDIRECT = {
  key: sections.FOREIGN_ACTIVITIES_INDIRECT,
  name: 'indirect',
  path: `${FOREIGN_ACTIVITIES.path}/indirect`,
  storeKey: 'IndirectActivity',
  label: i18n.t('foreign.subsection.activities.indirect')
}

const FOREIGN_ACTIVITIES_REAL_ESTATE = {
  key: sections.FOREIGN_ACTIVITIES_REAL_ESTATE,
  name: 'realestate',
  path: `${FOREIGN_ACTIVITIES.path}/realestate`,
  storeKey: 'RealEstateActivity',
  label: i18n.t('foreign.subsection.activities.realestate')
}

const FOREIGN_ACTIVITIES_BENEFITS = {
  key: sections.FOREIGN_ACTIVITIES_BENEFITS,
  name: 'benefits',
  path: `${FOREIGN_ACTIVITIES.path}/benefits`,
  storeKey: 'BenefitActivity',
  label: i18n.t('foreign.subsection.activities.benefits')
}

const FOREIGN_ACTIVITIES_SUPPORT = {
  key: sections.FOREIGN_ACTIVITIES_SUPPORT,
  name: 'support',
  path: `${FOREIGN_ACTIVITIES.path}/support`,
  storeKey: 'Support',
  label: i18n.t('foreign.subsection.activities.support')
}

const FOREIGN_BUSINESS = {
  key: sections.FOREIGN_BUSINESS,
  name: 'business',
  path: `${FOREIGN.path}/business`,
  label: i18n.t('foreign.subsection.business.label')
}

const FOREIGN_BUSINESS_ADVICE = {
  key: sections.FOREIGN_BUSINESS_ADVICE,
  name: 'advice',
  path: `${FOREIGN_BUSINESS.path}/advice`,
  storeKey: 'Advice',
  label: i18n.t('foreign.subsection.business.advice')
}

const FOREIGN_BUSINESS_FAMILY = {
  key: sections.FOREIGN_BUSINESS_FAMILY,
  name: 'family',
  path: `${FOREIGN_BUSINESS.path}/family`,
  storeKey: 'Family',
  label: i18n.t('foreign.subsection.business.family')
}

const FOREIGN_BUSINESS_EMPLOYMENT = {
  key: sections.FOREIGN_BUSINESS_EMPLOYMENT,
  name: 'employment',
  path: `${FOREIGN_BUSINESS.path}/employment`,
  storeKey: 'Employment',
  label: i18n.t('foreign.subsection.business.employment')
}

const FOREIGN_BUSINESS_VENTURES = {
  key: sections.FOREIGN_BUSINESS_VENTURES,
  name: 'ventues',
  path: `${FOREIGN_BUSINESS.path}/ventures`,
  storeKey: 'Ventures',
  label: i18n.t('foreign.subsection.business.ventures')
}

const FOREIGN_BUSINESS_CONFERENCES = {
  key: sections.FOREIGN_BUSINESS_CONFERENCES,
  name: 'conferences',
  path: `${FOREIGN_BUSINESS.path}/conferences`,
  storeKey: 'Conferences',
  label: i18n.t('foreign.subsection.business.conferences')
}

const FOREIGN_BUSINESS_CONTACT = {
  key: sections.FOREIGN_BUSINESS_CONTACT,
  name: 'contact',
  path: `${FOREIGN_BUSINESS.path}/contact`,
  storeKey: 'Contact',
  label: i18n.t('foreign.subsection.business.contact')
}

const FOREIGN_BUSINESS_SPONSORSHIP = {
  key: sections.FOREIGN_BUSINESS_SPONSORSHIP,
  name: 'sponsorship',
  path: `${FOREIGN_BUSINESS.path}/sponsorship`,
  storeKey: 'Sponsorship',
  label: i18n.t('foreign.subsection.business.sponsorship')
}

const FOREIGN_BUSINESS_POLITICAL = {
  key: sections.FOREIGN_BUSINESS_POLITICAL,
  name: 'political',
  path: `${FOREIGN_BUSINESS.path}/political`,
  storeKey: 'Political',
  label: i18n.t('foreign.subsection.business.political')
}

const FOREIGN_BUSINESS_VOTING = {
  key: sections.FOREIGN_BUSINESS_VOTING,
  name: 'voting',
  path: `${FOREIGN_BUSINESS.path}/voting`,
  storeKey: 'Voting',
  label: i18n.t('foreign.subsection.business.voting')
}

const FOREIGN_TRAVEL = {
  key: sections.FOREIGN_TRAVEL,
  name: 'travel',
  path: `${FOREIGN.path}/travel`,
  storeKey: 'Travel',
  label: i18n.t('foreign.subsection.travel')
}

const FOREIGN_REVIEW = {
  key: sections.FOREIGN_REVIEW,
  name: 'review',
  path: `${FOREIGN.path}/review`,
  label: i18n.t('foreign.subsection.review')
}

export default {
  FOREIGN,
  FOREIGN_INTRO,
  FOREIGN_PASSPORT,
  FOREIGN_CONTACTS,
  FOREIGN_ACTIVITIES,
  FOREIGN_ACTIVITIES_DIRECT,
  FOREIGN_ACTIVITIES_INDIRECT,
  FOREIGN_ACTIVITIES_REAL_ESTATE,
  FOREIGN_ACTIVITIES_BENEFITS,
  FOREIGN_ACTIVITIES_SUPPORT,
  FOREIGN_BUSINESS,
  FOREIGN_BUSINESS_ADVICE,
  FOREIGN_BUSINESS_FAMILY,
  FOREIGN_BUSINESS_EMPLOYMENT,
  FOREIGN_BUSINESS_VENTURES,
  FOREIGN_BUSINESS_CONFERENCES,
  FOREIGN_BUSINESS_CONTACT,
  FOREIGN_BUSINESS_SPONSORSHIP,
  FOREIGN_BUSINESS_POLITICAL,
  FOREIGN_BUSINESS_VOTING,
  FOREIGN_TRAVEL,
  FOREIGN_REVIEW
}


