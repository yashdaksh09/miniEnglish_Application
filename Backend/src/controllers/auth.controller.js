const pool= require("../config/db.js");
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");
async function signup(req, res) {
    try{

        const {name, email, password}= req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                messsage: "Name, email and Password is required"
            });
        }
            // check user already registred or not 
        const [existingUser]= await pool.query(`SELECT id FROM users WHERE email= ?`,[email]);

        if(existingUser.length>0){
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const passwordHash= await bcrypt.hash(password, 10);

        const [result]= await pool.query(`INSERT INTO users(name, email, password_hash) VALUES (?,?,?)`, [name, email, passwordHash]);

        const token = jwt.sign(
            {
                userId: result.insertId,
                email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
);

        res.status(201).json({
            messsage: "User Created Sucessfully",
            token,
            user: {
                id: result.insertId,
                name,
                email
            }
        });
    }catch(error){
        console.error("Signup error", error);

        res.status(500).json({
            messsage: "Failed to create user"
        })
    }
}


async function login(req, res) {
    try{

        const {email, password}= req.body;

        if(!email || !password){
            return res.status(400).json({
                messsage: "Email and Password are required"
            })
        }

        const [users]= await pool.query(`SELECT id, name, email, password_hash, avatar_url FROM users WHERE email= ? AND is_active= TRUE`, [email]);

        if(users.length === 0){
            return res.status(401).json({
                messsage: "Invalid email or password",
            })
        }

        const user = users[0];
        
        const passwordMatches= await bcrypt.compare(password, user.password_hash);

        if(!passwordMatches){
            return res.status(401).json({
                messsage: "Invalid Password",
            })
        }

        //JWT will be added in the next steps
        const token= jwt.sign(
        {
            userId: user.id,
            email: user.email
        },

        process.env.JWT_SECRET,

        {
            expiresIn: "7d"
        }
    
        )


        res.json({
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar_url: user.avatar_url,
            },
        });
    }catch(error){
        console.error("Login Error", error);
        
        res.status(500).json({
            messsage: "Failed to Login"
        })
    }
}


async function getMe(req, res) {
    try{

        const {userId}= req.user;
        const [users]= await pool.query(`SELECT id, name, email, avatar_url FROM users WHERE id=? AND is_active= TRUE`, [userId]);

        if(users.length === 0){
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.json({
            message: "Authenticated successfully",
            user: users[0],
        });
    }catch(error){
        console.error("Get me error:", error);

        res.status(500).json({
            message: "Failed to get user",
        })
    }
}

module.exports={
    signup,
    login,
    getMe
}