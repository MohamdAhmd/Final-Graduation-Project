import Router from 'express'
import userRouter from './api/user_mangment/user'
import adminRouter from './api/user_mangment/admin'
import groupRouter from './api/user_mangment/group'
import roleRouter from './api/user_mangment/role'
import paymentRouter from './api/payment'
import Tools from './api/tools'

const routes = Router()
routes.use('/users', userRouter)
routes.use('/tools', Tools)
routes.use('/admin', adminRouter)
routes.use('/group', groupRouter)
routes.use('/role', roleRouter)
routes.use('/payment', paymentRouter)

export default routes
