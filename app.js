const express = require("express");

// const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

const mongoose = require('mongoose');
const db_uri = process.env.DB_URI || 'mongodb://localhost:27017/test';
mongoose.connect(db_uri);
const db = mongoose.connection;

db.on('error', (err) => {
    console.error(err);
});
db.once('open', () => {
    console.log('Database connected');
})

const User = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
    createdDate: { type: Date, default: Date.now }
});

const UserModel = mongoose.model('User', User);

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`App Server listening on port ${port}`)
})

app.post('/newUser', (req, res) => {
    console.log(`POST /newUser: ${JSON.stringify(req.body)}`);
    const newUser = new User();
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;
    newUser.age = req.body.age;
    newUser.save((err, data) => {
        if (err) {
            return console.error(err);
        }
        console.log(`new user save: ${data}`);
        res.send(`done ${data}`)
    })
});

function newUser() {
    document.getElementById('le').innerHTML = 'hello'
}



// app.post('/users', async (req, res) => {
//     const name = req.body.name;
//     const role = req.body.role;
//     const age = req.body.age;
//     try {
//         const user = new UserModel({ name, role, age });
//         const result = await user.save();
//         res.send(result);
//     } catch (err) {
//         res.status(500).send(err);
//      }
    
//     const user = new UserModel(req.body);
    
//     try {
//         const result = await user.save();
//         res.send(result);
//     } catch (err) {
//         res.status(500).send
//     }
// })