const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://<Username>:<Password>@<cluster-id>/FirstDB');


const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course' 
    }]
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    course_id: Number
});

const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String
});

const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course', courseSchema);
const Admin = mongoose.model('Admin', adminSchema);


module.exports = {
    User, Course, Admin 
};

