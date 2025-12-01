import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
    const token = req.headers.authorization;
    console.log("Auth Header:", token);

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id || decoded.userId || decoded._id;
        console.log("🧩 Decoded token:", decoded);
        console.log("🧩 req.userId set to:", req.userId);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export default protect;


// import jwt from 'jsonwebtoken';

// const protect = async (req, res, next) => {
//     const authHeader = req.headers.authorization; // correctly define the variable
//     console.log("Auth Header:", authHeader);

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }

//     // Extract the token part after "Bearer "
//     const token = authHeader.split(" ")[1];

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.userId = decoded.id || decoded.userId || decoded._id;

//         console.log("🧩 Decoded token:", decoded);
//         console.log("🧩 req.userId set to:", req.userId);

//         next();
//     } catch (error) {
//         console.error("JWT verification failed:", error.message);
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
// };

// export default protect;
