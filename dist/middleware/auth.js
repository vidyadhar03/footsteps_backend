"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const supabase_1 = require("../config/supabase");
const authenticateJWT = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Missing or invalid authorization header' });
            return;
        }
        const token = authHeader.substring(7);
        const { data: { user }, error } = await supabase_1.supabase.auth.getUser(token);
        if (error || !user) {
            res.status(401).json({ error: 'Invalid or expired token' });
            return;
        }
        req.user = {
            id: user.id,
            ...(user.email && { email: user.email })
        };
        next();
    }
    catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ error: 'Internal server error during authentication' });
    }
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=auth.js.map