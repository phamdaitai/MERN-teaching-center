const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const courseRouter=require('./routers/course')

const app = express()
const port = process.env.PORT || 5000

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down. Check back soon!')
// })
app.use(express.static('public'));
app.use(express.json())
app.use(userRouter)
app.use(courseRouter)
//Register
// {
//     "username":"1anhthanh1997",
//     "password":"Anhthanh@1997",
//     "name":"Nguyễn Chí Thanh",
//     "address":"Hà Nội",
//     "phoneNumber":"0988950215",
//     "email":"3anhthanh1997",
//     "class":"10A8",
//     "permission":"user"
// }

//Course
// app.get()
app.listen(port, () => {
    console.log('Started on port 5000');
});
// module.exports = {app};
