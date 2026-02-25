import jwt from jsonwebtoken;
import dotenv from 'dotenv';

dotenv.config();

const verify_token = (req, res, next) => {
    const token = req.headers['authorization']?.split(" ")[1];
    if (!token) return res.status(401).json({valid: false, message: "Unauthorized!"});
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
        if (err) return res.status(400).json({valid: false, message: "Expired or not available token!"});
        req.user = decoded;
        next();
    });
};

export default verify_token;