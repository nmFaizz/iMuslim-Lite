// pages/api/proxy/doa/[sumber].ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { sumber } = req.query;

  if (!sumber || typeof sumber !== 'string') {
    return res.status(400).json({ error: 'Invalid sumber' });
  }

  try {
    const response = await fetch(`https://api-zhirrr.vercel.app/api/doa/${sumber}`);
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: (error as Error).message });
  }
}
