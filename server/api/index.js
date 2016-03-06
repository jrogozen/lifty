import express from 'express'

import users from './users'

const router = new express.Router()

users(router)

// router.get('/todos', isAuthenticated, (req, res) => {
//     res.send({
//         success: true,
//         data: 'hi'
//     })
// })

export default router