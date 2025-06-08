import { Router } from 'express';
import { createServiceProvider,updateProject,updateAllProject } from '../controllers/serviceprovider.controller';

const router = Router();


router.post('/', createServiceProvider);
router.put('/update', updateProject);

router.put('/updateall', updateAllProject);



export default router;
