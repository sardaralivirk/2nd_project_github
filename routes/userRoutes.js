// const express = require('express');
// const mongoose = require('mongoose')
// const router = express.Router();
// const app = express();
// const jwt=require('jsonwebtoken')
// const bcrypt = require('bcrypt');
// const Blog = require('../modles/modle.js');
// //const { setTheUsername } = require('whatwg-url');
// router.post('/post', async (req, res) => {
//     console.log('entered');
//     const { username, password } = req.body;
//     try {
//         console.log("----------------");
//         // Check if user already exists
//         const existingUser = await Blog.find({username}); 

//         console.log("-------2---------");
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }
        

        
//         const saltRounds = 10;
//         const hash = await bcrypt.hash(password, saltRounds);
//         console.log("hashed password", hash);

//         const newBlog = await Blog.create({ username, password: hash });
// const token = jwt.sign({ username: newBlog.username, id: newBlog._id }, secretKey, { expiresIn: '1h' });
//         return res.status(201).json({ newBlog, sign: 'Signup successfu' });
        
//     } catch (error) {
//         // Handle any errors that occur during the process
//         console.error('Error creating blog:', error);
//         return res.status(500).json({ message: 'Server error' });
//     }
// });

// router.get('/',(req,res)=>{
//     res.send("ok")
// })

// module.exports = router





const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Blog = require('../modles/modle.js'); // Ensure the path is correct

const router = express.Router();
const app = express();

const secretKey = 'your-secret-key'; // Define your secret key

// Middleware to parse JSON bodies
app.use(express.json());

router.post('/post', async (req, res) => {
    console.log('entered');
    const { username, password } = req.body;
    try {
        console.log("----------------");

        // Check if user already exists
        const existingUser = await Blog.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        console.log("hashed password", hash);

        // Create new blog user
        const newBlog = new Blog({ username, password: hash });
        await newBlog.save();

        // Generate JWT token
        const token = jwt.sign({ username: newBlog.username, id: newBlog._id }, secretKey, { expiresIn: '1h' });

        return res.status(201).json({ newBlog, token, message: 'Signup successful' });
        
    } catch (error) {
        console.error('Error creating blog:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.get('/', (req, res) => {
    res.send("ok");
});

module.exports = router;

