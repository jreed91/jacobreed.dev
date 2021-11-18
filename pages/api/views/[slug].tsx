// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const slug = req.query.slug.toString();

    if (req.method === 'POST') {
      const newOrUpdatedViews = await prisma.views.upsert({
        where: { slug },
        create: {
          slug
        },
        update: {
          count: {
            increment: 1
          }
        }
      });

      return res.status(200).json({
        total: newOrUpdatedViews.count.toString()
      });
    }

    if (req.method === 'GET') {
      const views = await prisma.views.findUnique({
        where: {
          slug
        }
      });
      
      if (!views) {
        return res.status(404).json({
          error: 'View not found'
        });
      } else {
        return res.status(200).json({
          total: views.count.toString()
        });
      }
    }
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
}
