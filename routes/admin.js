const { Router } = require('express');
const { adminMiddleware } = require('../Middlewares/admin');
const { Admin, Course } = require('../db');
const jwt = require('jsonwebtoken');
const privateKey = "private-key" ; 
const router = Router();

router.post('/signup', async (req, res) => {
    const { username, password, name} = req.body;
    const existingAdmin = await Admin.findOne({username})

    const token = jwt.sign({
        username: username,
        role: "admin"
    }, privateKey) ;

    if(existingAdmin){
        return res.status(403).json({ message: 'Admin already exists' });
    }

    const admin = new Admin({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name
    })

    admin.save().then(() => {
        res.status(201).json({ message: 'Admin created successfully', token: token });
    }).catch((err) => {
        res.status(500).json({ message: 'Internal server error' })})
}) ;

router.post('/courses', adminMiddleware, async (req, res) => {
    const { title, description, price, course_id } = req.body;

    if(title === undefined || description === undefined || price === undefined){
        return res.status(400).json({ message: 'Title, description and price are required' });
    }
    const course = new Course({ title, description, price, course_id });

    const existingCourse = await Course.findOne({ title });

    if(existingCourse){
        return res.status(403).json({ message: 'Course with this title already exists' });
    }

    try {
        await course.save();
        res.status(201).json({ message: 'Course created successfully', courseId: course._id });
    } catch (err) {
        console.log('Error saving course:', err);
        console.log('Error message:', err.message);
        res.status(500).json({ message: 'Failed to create course', error: err.message });
    }
}) ; 

router.get('/courses', adminMiddleware, async (req, res) => {

    
    try {
        const allCourses = await Course.find({}) ;
        res.status(201).json({ courses: allCourses });
    } catch (err) {
        console.log('Error getting the courses:', err);
        console.log('Error message:', err.message);
        res.status(500).json({ message: 'Failed to get the courses', error: err.message });
    }
}) ; 

module.exports = router ;
