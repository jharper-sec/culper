import daterange from '../daterange'

describe('The date range validator', () => {
  it('fails a date range missing a "from" value', () => {
    const testData = {
      to: { year: 2000, month: 12, day: 1 },
      present: false,
    }

    expect(daterange(testData, {})).toEqual(['from.presence.REQUIRED'])
  })

  it('fails an invalid date object', () => {
    const testData = {
      to: { test: 'not a date' },
      from: { test: 'not a date' },
    }

    expect(daterange(testData, {}))
      .toEqual([
        'from.date.day.presence.REQUIRED',
        'from.date.month.presence.REQUIRED',
        'from.date.year.presence.REQUIRED',
        'to.date.day.presence.REQUIRED',
        'to.date.month.presence.REQUIRED',
        'to.date.year.presence.REQUIRED',
      ])
  })

  it('fails a date range missing a "to" value and present is false', () => {
    const testData = {
      from: { year: 2000, month: 12, day: 1 },
      present: false,
    }

    expect(daterange(testData, {})).toEqual(['to.presence.REQUIRED'])
  })

  it('fails a date range with an invalid "from" value', () => {
    const testData = {
      from: 'blah',
      to: { year: 2000, month: 12, day: 1 },
      present: false,
    }

    expect(daterange(testData, {})).toEqual([
      'from.date.day.presence.REQUIRED',
      'from.date.month.presence.REQUIRED',
      'from.date.year.presence.REQUIRED',
    ])
  })

  it('fails a date range with an invalid "to" value', () => {
    const testData = {
      from: { year: 2000, month: 12, day: 1 },
      to: { year: '', month: '', day: '' },
      present: false,
    }

    expect(daterange(testData, {})).toEqual([
      'to.date.day.presence.REQUIRED',
      'to.date.month.presence.REQUIRED',
      'to.date.year.presence.REQUIRED',
      'to.date.date.datetime.INVALID_DATE',
    ])
  })

  it('fails a date range where the "from" value is after the "to" value', () => {
    const testData = {
      to: { year: 1990, month: 5, day: 12 },
      from: { year: 2000, month: 12, day: 1 },
      present: false,
    }

    expect(daterange(testData, {})).toEqual('INVALID_DATE_RANGE')
  })

  it('fails a date range where the "from" value is in the future', () => {
    const testData = {
      from: { year: 3000, month: 12, day: 1 },
      present: true,
    }

    expect(daterange(testData, {})).toEqual('INVALID_DATE_RANGE')
  })

  it('passes a valid date range where present is false', () => {
    const testData = {
      from: { year: 2000, month: 12, day: 1 },
      to: { year: 2010, month: 10, day: 25 },
      present: false,
    }

    expect(daterange(testData, {})).toBe(null)
  })

  it('passes a valid date range where the dates are the same', () => {
    const testData = {
      from: { year: 2010, month: 10, day: 25 },
      to: { year: 2010, month: 10, day: 25 },
      present: false,
    }

    expect(daterange(testData, {})).toBe(null)
  })

  describe('with a maxDuration option', () => {
    it('fails if the date range diff is greater than the max duration', () => {
      const testData = {
        from: { year: 2010, month: 10, day: 25 },
        to: { year: 2015, month: 10, day: 25 },
        present: false,
      }

      expect(daterange(testData, { maxDuration: { years: 1 } })).toEqual('DATE_RANGE_TOO_LONG')
    })

    it('passes if the date range diff is less than or equal to the max duration', () => {
      const testData = {
        from: { year: 2010, month: 10, day: 25 },
        to: { year: 2011, month: 10, day: 25 },
        present: false,
      }

      expect(daterange(testData, { maxDuration: { years: 1 } })).toBe(null)
    })
  })

  describe('with a minDuration option', () => {
    it('fails if the date range diff is less than the min duration', () => {
      const testData = {
        from: { year: 2010, month: 10, day: 25 },
        to: { year: 2010, month: 12, day: 2 },
        present: false,
      }

      expect(daterange(testData, { minDuration: { years: 1 } })).toEqual('DATE_RANGE_TOO_SHORT')
    })

    it('passes if the date range diff is greater than or equal to the min duration', () => {
      const testData = {
        from: { year: 2010, month: 10, day: 25 },
        to: { year: 2011, month: 10, day: 25 },
        present: false,
      }

      expect(daterange(testData, { minDuration: { years: 1 } })).toBe(null)
    })
  })
})
