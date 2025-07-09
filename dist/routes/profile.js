"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', auth_1.authenticateJWT, async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'User not authenticated' });
            return;
        }
        const existingProfile = await database_1.prisma.userProfile.findUnique({
            where: { authUserId: userId }
        });
        if (existingProfile) {
            res.json({
                success: true,
                profile: existingProfile
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'Profile not found. Use POST to create a profile.'
            });
        }
    }
    catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/', auth_1.authenticateJWT, async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'User not authenticated' });
            return;
        }
        const { name, origin, styleTags, totalKm, totalCountries, earthRotations } = req.body;
        if (!name) {
            res.status(400).json({ error: 'Name is required' });
            return;
        }
        const profile = await database_1.prisma.userProfile.upsert({
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
    }
    catch (error) {
        console.error('Error upserting profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=profile.js.map