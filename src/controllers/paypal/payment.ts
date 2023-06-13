import { NextFunction, Request, Response } from 'express'
import { Link, Payment, Transaction } from 'paypal-rest-sdk'
import { createPaypalPayment } from '../../servieces/paypal'
import { tokenSecret } from '../../controllers/user_mangment/userControler'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
export let role: string
import { GROUP, GROUPInfo } from '../../models/user_mangment/group'
import { USER_group, USER_groupInfo } from '../../models/user_mangment/user_group'

export const getPaymentPage = (req: Request, res: Response) => {
  res.render('finance', {
    isUser: res.locals.user
  })
}

export const UpdateGroupUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /*let payload1: JwtPayload = jwt.verify(
      tokenSecret,
      process.env.TOKEN_SECRET as Secret
    ) as JwtPayload
    */
    const userId = res.locals.user.id
    //console.log('role from UpdateGroupUser>>>>>>>>>>' + role)
    const info = new GROUPInfo()
    const USER_group = new USER_groupInfo()

    const idGroup = await info.showByName(role)
    //console.log('ID role from UpdateGroupUser>>>>>>>>>> ' + idGroup)
    //console.log('ID from payload1>>>>>>>>>> ' + payload1)
    //const idUser = payload1.user.id
    
    const updated = USER_group.updateGroup(userId, idGroup)

    //console.log('userID from UpdateGroupUser=>>>>>>>>' + idUser)
    next()
  } catch (err) {
    console.log(err)
  }
}
export const createPayment = (req: Request, res: Response, next: NextFunction) => {
  //console.log('total= ' + req.body.price)
  role = req.body.role

  // create payment object
  let payment: Payment = {
    intent: 'authorize',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: 'http://localhost:3000/api/payment/success',
      cancel_url: 'http://localhost:3000/api/payment/error'
    },
    transactions: [
      {
        amount: {
          total: req.body.price,
          currency: 'USD'
        },
        description: 'Gradution tools predction'
      }
    ]
  }
    
  createPaypalPayment(payment)
    .then((transaction: any) => {
//      console.log('Create Payment Response')
//      console.log('transaction : ' + JSON.stringify(transaction))
      let transactionId = transaction.id
//      console.log('id : ' + transactionId)
      //res.redirect('/api/payment/success')
      
      res.redirect(transaction.links[1].href)
    })
    .catch((err: any) => {
      console.log(err)
      res.redirect('/api/payment/error')
      throw err
    })
  }
