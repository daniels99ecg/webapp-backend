import express from 'express';
import homeOwnerRoutes from './routes/homeowner.routes';
import serviceproviderRoutes from './routes/serviceprovider.routes'
import cors from 'cors';
const app = express();
app.use(cors());  
app.use(express.json());

// Usar rutas
app.use('/api/homeowner', homeOwnerRoutes);
app.use('/api/serviceprovider', serviceproviderRoutes);
export default app;
