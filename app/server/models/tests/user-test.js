import _ from 'lodash'

import * as User from '../user'
import { expect } from '../../testUtils'

describe('User Model', () => {
  describe('User.toDB', () => {
    it('filters out bad params', () => {
      const params = { age: 14, bicepLength: 42, shoeSize: 9.5 }
      const result = User.toDB(params)
      const keys = _.keys(result)

      expect(keys).to.contain('age')
      expect(keys).to.not.contain('bicepLength')
      expect(keys).to.not.contain('shoeSize')
    })

    it('decamelizes params and converst to underscore', () => {
      const params = { firstName: 'jon', lastName: 'rogozen' }
      const result = User.toDB(params)
      const keys = _.keys(result)

      expect(keys).to.contain('first_name')
      expect(keys).to.contain('last_name')
      expect(result.first_name).to.eq('jon')
    })
  })

  describe('User.encryptPassword', () => {
    it('should return a hashed password', () => {
      const result = User.encryptPassword('password123')

      expect(result).to.not.be.undefined
      expect(result).to.be.a('String')
      expect(result).to.not.eq('password123')
    })
  })
})