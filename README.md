CREATING A BASIC BACKEND APPLICATION

It needs to support two types of users:

1.) Admins -> are allowed to signup and create courses
2.) Users -> allowed to signup and purchase courses

ROUTES: 


POST/admin/signup

POST/admin/courses

GET/admin/courses



POST/users/signup

GET/users/courses

POST/users/courses/:courseId 

GET/users/purchasedCourses