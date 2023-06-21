import express, { Application, Request, Response, NextFunction } from 'express'
import routes from './handlers/api/user_mangment/user'
import route from './handlers'
import tools from './handlers/api/tools'
import payment from './handlers/api/payment'
import { checkUser } from './midellware/authintication'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import cors from 'cors'
import flash from 'connect-flash'
// eslint-disable-next-line no-var, @typescript-eslint/no-var-requires
var contentType = require('content-type')
// eslint-disable-next-line no-var, @typescript-eslint/no-var-requires
var getRawBody = require('raw-body')

interface IGetUserAuthInfoRequest extends Request {
  text?: string
}
function defaultContentTypeMiddleware(req: Request, _res: Response, next: NextFunction) {
  req.headers['content-type'] = req.headers['content-type'] || 'application/json'
  next()
}

//import db from './database'
//import client from './database'
dotenv.config()
//console.log(dotenv.config())

const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()
app.use(cors())
app.use(flash())
app.use(cookieParser())
app.use(express.json())
app.use(defaultContentTypeMiddleware)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// HTTP request logger middleware
app.use(morgan('common'))

app.use(express.static(path.join(__dirname, 'public')))
// view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('*', checkUser)

app.get('/', (_req: Request, res: Response) => {
  res.render('Home', {
    isUser: res.locals.user
  })
})

app.get('/user', (_req: Request, res: Response) => {
  res.render('admin/user')
})

app.get('/roles', (_req: Request, res: Response) => {
  res.render('admin/roles')
})

app.get('/group', (_req: Request, res: Response) => {
  res.render('admin/group')
})

app.get('/profile', (_req: Request, res: Response) => {
  res.render('profile', {
    user: res.locals.user,
    isUser: res.locals.user
  })
})
app.use('/api', route)
app.use(routes)
app.use(payment)
app.use(tools)
// add routing for / path

// limt data to 1mega sent to body
app.use((req: IGetUserAuthInfoRequest, res: Response, next) => {
  getRawBody(
    req,
    {
      length: req.headers['content-length'],
      limit: '1mb',
      encoding: contentType.parse(req).parameters.charset
    },
    function (err: Error, string: string) {
      if (err) return next(err)
      req.text = string
      next()
    }
  )
})
// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})
export default app
