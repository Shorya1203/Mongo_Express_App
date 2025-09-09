const { Router } = require('express');
const { userMiddleware } = require('../Middlewares/users');
const { User, Course } = require('../db');
const jwt = require('jsonwebtoken');
const router = Router();
const privateKey = "private-key";

router.post('/signup', async (req, res) => {

    const { username, password, name} = req.body;

    try{
        const existingAdmin = await User.findOne({username}); 
        if(existingAdmin) {
            res.status(403).json({message: "User already exists"})
        }
    }catch{
        return res.status(500).json({message: "Internal Server Error"}) ; 
    }

    const token = jwt.sign({
        username: username,
        role: "user"
    }, privateKey)

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        purchasedCourses: []
    })

    user.save().then(() => {
        return res.status(201).json({ message: 'User created successfully', token: token });
    }).catch((err) => {
        return res.status(500).json({ message: 'Internal server error' })})
}) ;

router.post('/courses/:course_id', userMiddleware, async (req, res) => {
    
    const { title, description, price, username } = req.body;
    const { course_id } = req.params;

    try{
        const user = await User.findOne({
            username: username
        })
        
        const course = await Course.findOne({
            course_id: course_id
        }); // Use findById for _id
        
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (user.purchasedCourses.includes(course._id)) {
            return res.status(400).json({ message: "Course already purchased" });
        }

        user.purchasedCourses.push(course._id);
        await user.save();

        res.json({ message: "Course purchased successfully", user: user });     
    }catch(err){
        res.status(500).json({message: "Internal Server Error"}) ;
    }

}) ; 

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const { username} = req.body;

    try{
        const user = await User.findOne({
            username: username
        })

        const course_ids = user['purchasedCourses']

        const ALL_COURSES = [] ; 

        for(var i = 0; i < course_ids.length; i++) 
        {
            const course = await Course.findById(course_ids[i]) ;
            ALL_COURSES.push(course);     
        }

        return res.status(201).json({
            message: "All courses are fetched",
            Courses: ALL_COURSES
        })

    }catch(err){
        return res.status(500).json({ message: 'Interal Server Error'});
    }
}) ; 


router.get('/Courses', userMiddleware, async (req, res) => {
    try{


        const courses = await Course.find({}) ; 
        
        return res.status(201).json({
            message: "All courses are fetched",
            Courses: courses
        })

    }catch(err){
        return res.status(500).json({ message: 'Interal Server Error'});
    }
}) ; 

module.exports = router ;