const express = require("express");
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



const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
    createdDate: { type: Date, default: Date.now }
})

const UserModel = mongoose.model('User', UserSchema, 'users');

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`App Server listening on port ${port}`)
})


// New User
app.post('/users', async function(req, res) {
    console.log(`POST /newUser: ${JSON.stringify(req.body)}`);
    console.log(req);
    let user = new UserModel({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, age: req.body.age})
    try {
        console.log(user)
        const result = await user.save();
        res.send(result)
    } catch (err) {
        console.log(err)
    }
});

// Listing all users
app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (err) {
        res.status(500).send(err);
    }
})

// Deleting a user (WIP)
app.delete('/deleteUser/:firstName', async (req, res) => {
    const name = req.params.firstName;
    try {
        const user = await UserModel.findOneAndDelete({ firstName: name });
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
})

// Updating an existing user
app.put('/users/:firstName', async (req, res) => {
    try {
        const firstName = req.params.firstName;
        const updatedUser = req.body;

        const user = await UserModel.findOneAndUpdate({ firstName: firstName }, updatedUser, { new: true });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        console.log(user)
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Error updating user' });
    }
})