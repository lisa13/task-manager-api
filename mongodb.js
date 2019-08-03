//crud

//destructured these down below
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const  ObjectID = mongodb.ObjectID;


//destructuring result 
const { MongoClient, ObjectID } = require('mongodb');

const id = new ObjectID();
console.log(id)


const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {

    if (error) {
        return console.log('unable to connect');
    }

    const db = client.db(databaseName);


    //an example of one document with id
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'lisa',
    //     address: 'plaka'
    // }, (error, response) => {
    //     console.log(response.ops);
    // })


    //FINDONE
    // db.collection('users').findOne({ name: 'lisa' }, (error, user) => {
    //     if (error) {
    //         console(erro);
    //     }
    //     console.log(user);
    // });


    //FIND
    // db.collection('tasks').find({ completed: true }).toArray((error, location) => {

    //     if (error) {
    //         console.log(error);
    //     }
    //     console.log(location);
    // });

    //FINDONE TO FETCH BY ID
    db.collection('tasks').find({ _id: new ObjectID("5d248bb2df5a106a0caee63a") }).toArray((error, id) => {
        console.log(id);
    })

    //  an example of many  
    // db.collection('tasks').insertMany([
    //     {
    //         description: 'update file',
    //         completed: true
    //     },
    //     {
    //         description: 'delete file',
    //         completed: false
    //     },
    //     {
    //         description: 'create file',
    //         completed: true
    //     }

    // ], (error, response) => {

    //     if (error) {
    //         console.log(error);
    //     }
    //     console.log(response.ops);

    // })

    /////////////////UPDATE MANY
    // db.collection('tasks').updateMany(
    //     {
    //         completed: true,

    //     },
    //     {
    //         $set: {
    //             completed: false
    //         }
    //     }
    // ).then((result) => {

    //     console.log(result);

    // }).catch((err) => {

    // })

    ///////////////DELET one
    db.collection('tasks').deleteOne(
        {
            description: 'update file'
        }).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });



});