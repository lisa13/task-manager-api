const app = require('./app');
const port = process.env.PORT;

app.listen(port, () => {
    console.log("server's running " + port);

});


//upload images with multer
// const multer = require('multer');
// const upload = multer({
//     dest: 'images',

// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//     try {
//         res.send();
//     } catch (err) {
//         console.log(err);
//     }
// })

//finding the task of the user
// const main = async () => {

//     const task = await Task.findById("5d3ad654a408df7273f4ddda");
//     // await task.populate('owner').execPopulate();
//     // console.log(task.owner);
// }

// main()


///findgin the user of the task

// const main = async () => {

//     const user = await User.findById("5d3eed5e47aa3544399cc5b2");
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);
// }

// main()