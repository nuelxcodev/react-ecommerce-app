import { Router } from 'express'
import * as controller from '../controller/appcontroller.js'

const router = Router()

router.route('/register').post(controller.register)
router.route('/login').post(controller.login)
router.route('/resetpassword').post(controller.resetpassword)

export default router