import express from "express";

import * as adminController from '../controllers/admin.controller.js';
import adminAuth from "../middlewares/admin.auth.js";

const router = new express.Router();

router.post('/admin/signup', adminController.createAdmin);

router.post('/admin/login', adminController.login);

router.post('/admin/logout', adminAuth, adminController.logout);

export default router;