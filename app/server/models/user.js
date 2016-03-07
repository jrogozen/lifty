import _ from 'lodash'
import humps from 'humps'
import bcrypt from 'bcrypt-nodejs'

const create = function create(userObj) {
  if (!userObj || _.isEmpty(userObj)) {

  }
}

const toDB = function toDB(params) {
  const parsedParams = {}
  const allowedKeys = ['email', 'first_name', 'last_name', 'age', 'weight', 'body_fat']

  _.forEach(params, (v, k) => {
    const decamelized = humps.decamelize(k)

    if (_.includes(allowedKeys, decamelized)) {
      parsedParams[decamelized] = v
    }
  })

  return parsedParams
}

const encryptPassword = function encryptPassword(pw) {
  return bcrypt.hashSync(pw)
}

const comparePassword = function comparePassword(pw) {
  const hash = bcrypt.hashSync(pw)

  return bcrypt.compareSync(pw, hash)
}

export { create, toDB, encryptPassword, comparePassword }