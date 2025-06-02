import { Router } from 'express';
import { createServiceProvider } from '../controllers/serviceprovider.controller';

const router = Router();


router.post('/', createServiceProvider);

export default router;
