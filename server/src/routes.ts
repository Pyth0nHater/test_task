import { Router, Request, Response } from 'express';
import { AmoCRMService } from './amoCRM.service';

const router = Router();
const amoCRMService = new AmoCRMService();

router.get('/api/leads', async (req: Request, res: Response) => {
  try {
    const query = req.query.query as string;
    const leads = await amoCRMService.getLeads(query);
    res.json(leads);
  } catch (error) {
    const err = error as Error; 
    res.status(500).json({ error: err.message });
  }
});

export default router;
