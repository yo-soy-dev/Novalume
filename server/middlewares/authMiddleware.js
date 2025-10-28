import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        console.log("🧩 Decoded token:", decoded);
        console.log("🧩 req.userId set to:", req.userId);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export default protect;