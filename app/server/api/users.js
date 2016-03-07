import { isAuthenticated } from '../middleware/authentication.js'
import * as User from '../models/user'
import { query } from '../db'

export default function users(router) {
  router.post('/users', (req, res, next) => {
    const params = User.toDB(req.body.params)
    let { email, first_name, last_name, age, weight, body_fat } = params

    // encrypt password
    

    query(`INSERT INTO users(email, first_name, last_name, age, weight, body_fat),
      (${email}, ${first_name}, ${last_name}, ${age}, ${weight}, ${body_fat})
    `)
  })

  router.get('/users', isAuthenticated, (req, res, next) => {
    res.send({
      success: true,
      data: 'user!'
    })
  })
}