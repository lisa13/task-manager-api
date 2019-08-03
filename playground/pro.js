require('../src/db/mongoose');
const Task = require('../src/models/task');


// Task.findByIdAndDelete('5d32d28e089b812826df8aec')
//     .then((result) => {
//         return Task.countDocuments({ completed: false })
//     })
//     .then((result) => {
//         console.log(result)
//     })
//     .catch((err) => {
//         console.log(err)
//     })

const deleteTask = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false });
    return count;
}

deleteTask('5d32d2be089b812826df8aed')
    .then((count) => {
        console.log(count)
    })
    .catch((err) => {
        console.log(err)
    })


// const updateTask = async (id, completed) => {
//     const task = await Task.findByIdAndUpdate(id, { completed });
//     const count = await Task.countDocuments({ completed });
//     return count;

// }

// updateTask('5d32d1ac089b812826df8aeb', false)
//     .then((count) => {
//         console.log(count)

//     })
//     .catch((err) => {
//         console.log(err)

//     })
