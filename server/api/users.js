import { isAuthenticated } from '../middleware/authentication.js'

export default function users(router) {
    router.post('/users', (req, res, next) => {

    })

    router.get('/users', isAuthenticated, (req, res, next) => {
        res.send({
            success: true,
            data: 'user!'
        })
    })

}