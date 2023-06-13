import { NextFunction, Request, Response } from 'express'
import client from '../database'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
/*
export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const headerAuth = req.headers.authorization
    const token = (headerAuth as string).split(' ')[1]
    let payload1: JwtPayload = jwt.verify(token, process.env.TOKEN_SECRET as Secret) as JwtPayload

    req.body.id = payload1.user.id
    req.body.payload1 = payload1.user
    next()
  } catch (error) {
    res.status(401)
    res.json(`Access denied invalid token ${error}`)
    return
  }
}
*/
export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt
    // check if json web token exist
    if (token) {
      //if exist so verify token
      jwt.verify(token, process.env.TOKEN_SECRET as Secret, (err: any, decodedToken: any) => {
        if (err) {
          console.log(err.message)
          res.redirect('/login')
          //res.send('INVALID_ACCESS_TOKEN FROM MIDDELWARE')
        } else {
          console.log(decodedToken)
          next()
        }
      })
    } else {
      res.redirect('/login')
      //res.send('INVALID_ACCESS_TOKEN FROM MIDDELWARE')
    }
  } catch (error) {
    res.status(401)
    res.json(`Access denied invalid token ${error}`)
    return
  }
}

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const headerAuth = req.headers.authorization
    const token = (headerAuth as string).split(' ')[1]
    console.log('!!!!!!!!!!!!!!!!!!!' + token)
    jwt.verify(token, process.env.TOKEN_SECRET_admin as Secret)
    next()
  } catch (error) {
    res.status(401)
    res.json(`Access denied invalid token ${error}`)
    return
  }
}

export const verifyRole = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = res.locals.user.id
      console.log('id_user===>' + id)
      res.locals.user.user_type_name = role
      const arr: string[] = ['user', 'premium', 'super_user', 'admin']
      const sql = `
      select group_name from app_group
      WHERE  group_id=(select group_id from user_group
      WHERE  "user_id"=$1);`

      const connect = await client.connect()
      const result = await connect.query(sql, [id])
      connect.release()
      const group_name = result.rows[0].group_name
      console.log('group_nameOfUser==>' + group_name)
      console.log(arr.indexOf(group_name))
      console.log(arr.indexOf(role))

      if (arr.indexOf(group_name) >= arr.indexOf(role)) {
        next()
      } else if (role === 'premium') {
        res.sendFile('F:/Graduation_project_last_version/paymentPremium.html')
      } else {
        res.redirect('http://localhost:3000/api/payment/paymentSuper')
      }
    } catch (error) {
      res.status(401)
      res.send(error)
      return
      /*res.render('error', {
        isUser: res.locals.user,
        roleErr: true
      })*/
    }
  }
}

export const totalAmountPremium = async (req: Request, res: Response, next: NextFunction) => {
  req.body.role = 'premium'
  req.body.price = '19.99'
  
  next()
}

export const totalAmountSuper = async (req: Request, res: Response, next: NextFunction) => {
  req.body.price = '39.00'
  req.body.role = 'super_user'
  console.log('from totalAmountSuper=> ' + req.body.price)

  next()
}

export const checkUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt
  // check if json web token exist
  if (token) {
    //if exist so verify token
    jwt.verify(token, process.env.TOKEN_SECRET as Secret, async (err: any, decodedToken: any) => {
      if (err) {
        console.log(err.message)
        res.locals.user = null
        next()
      } else {
        const sql = `
      select * from users
      WHERE id = $1;`
        const connect = await client.connect()
        const user = await connect.query(sql, [decodedToken.id])
        connect.release()
        res.locals.user = user.rows[0]
        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}
