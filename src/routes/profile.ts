import { Router, Response } from 'express';
import { prisma } from '../config/database.js';
import { authenticateJWT, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateJWT, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    // Try to find existing profile
    const existingProfile = await prisma.userProfile.findUnique({
      where: { authUserId: userId }
    });

    if (existingProfile) {
      res.json({
        success: true,
        profile: existingProfile
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Profile not found. Use POST to create a profile.'
      });
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', authenticateJWT, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    const { name, origin, styleTags, totalKm, totalCountries, earthRotations } = req.body;

    // Validate required fields
    if (!name) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }

    // Upsert profile (create or update)
    const profile = await prisma.userProfile.upsert({
      where: { authUserId: userId },
      update: {
        name,
        origin: origin || null,
        styleTags: styleTags || [],
        totalKm: totalKm || 0,
        totalCountries: totalCountries || 0,
        earthRotations: earthRotations || 0,
        updatedAt: new Date()
      },
      create: {
        authUserId: userId,
        name,
        origin: origin || null,
        styleTags: styleTags || [],
        totalKm: totalKm || 0,
        totalCountries: totalCountries || 0,
        earthRotations: earthRotations || 0
      }
    });

    res.json({
      success: true,
      profile,
      message: 'Profile saved successfully'
    });
  } catch (error) {
    console.error('Error upserting profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 