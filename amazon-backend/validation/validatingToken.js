import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const validToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // lowercase
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request if needed
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Token validation failed', user: 'false' });
    }
};

export default validToken;
