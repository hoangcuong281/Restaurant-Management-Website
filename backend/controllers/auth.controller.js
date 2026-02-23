import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const sign_up = async (req, res) => {
    const {name, email, role, password, phone} = req.body;
    if(!name || !email || !role) return res.status(400).json({message: "Missing required fields"});

    const existingUser = await User.findByEmail(email);

    if (existingUser) return res.status(400).json({message: "Email has already registered"});
    
    const salt = await bcrypt.genSalt(10);
    const password_hash =await bcrypt.hash(password, salt);5
    const newUser = await User.create({
        name,
        email,
        role: role ?? 'customer',
        password_hash,
        phone
    });
    
    res.status(200).json({message: "Registed successfully"});
    console.log(newUser);
}
