import { Router } from 'express';
import {  createHomeOwner, loginHomeOwner } from '../controllers/homeowner.controller';
import { listAllHomeOwner, listAlllHomeOwner, registerHomeOwner } from '../controllers/project.controller';

const router = Router();

router.get('/allhome', listAllHomeOwner);
router.get('/list', listAlllHomeOwner);
router.post('/', createHomeOwner);
router.post('/login', loginHomeOwner);
router.post('/register', registerHomeOwner);

// router.post('/login', (req, res) => {
//   loginHomeOwner
// });



export default router;
