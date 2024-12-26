import { Router } from 'express'
import * as controller from '../controller/authcontroller.js'
const router = Router()

// authentication
router.route('/register').post(controller.register)
router.route('/login').post(controller.login)
router.route('/resetpassword').post(controller.resetpassword)

// items 
router.route('/item').post(controller.items)
router.route('/getitem').get(controller.getitems)




export default router