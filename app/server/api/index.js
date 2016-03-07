import express from 'express'

import users from './users'

const router = new express.Router()

users(router)

export default router