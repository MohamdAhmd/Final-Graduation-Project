import { Router } from 'express'
import { createPayment, getPaymentPage } from '../../controllers/paypal/payment'
import { totalAmountPremium } from '../../midellware/authintication'
import { totalAmountSuper } from '../../midellware/authintication'
import { UpdateGroupUser } from '../../controllers/paypal/payment'

const routes = Router()
routes.get('/finance', getPaymentPage)
routes.get('/buy/premium', totalAmountPremium, createPayment)
routes.get('/paymentPremium', (req, res) => {
  res.sendFile('F:/Graduation_project_last_version/paymentPremium.html')
})
routes.get('/buy/super', totalAmountSuper, createPayment)

routes.get('/paymentSuper', (req, res) => {
  res.sendFile('F:/Graduation_project_last_version/paymentSuper.html')
})

routes.get('/success', UpdateGroupUser, (req: any, res: { sendFile: (arg0: string) => void }) => {
  res.sendFile('F:/Graduation_project_last_version/success.html')
})

//routes.get('/success',updateRoleUser)
/*routes.get('/success', UpdateGroupUser, (req: any, res: any) => {
  res.render('success')
})*/
routes.get('/error', (req, res) => {
  res.sendFile('F:/Graduation_project_last_version/error.html')
})

export default routes
