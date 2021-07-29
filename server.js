// 1 - import express
const express = require("express")

// require users
let users = require('./data')




// 2 - instance of express
const app = express()

// require auth middleware
const auth = require('./middleware/auth')
// app.use(auth)

// global middleware body-parser
app.use(express.json())

// 4 - testing route
app.get("/test", (req, res) => {
    console.log("Hello Express")
    console.table({ method: req.method, path: req.path })
    res.send("yessss")
})

// 5 - Routes

/**
 * List of users
 * @method : GET
 * @path : '/'
 * @params : no
 * @body : no
 */
app.get('/', (req, res) => {
    res.status(200).send({ msg: "List of users : ", users })
})

/**
 * one user
 * @method : GET
 * @path : '/user/:id'
 * @params : yes
 * @body : no
 */
app.get('/user/:id', (req, res) => {
    const userId = req.params.id
    // console.log(typeof req.params.id)
    const userFound = users.find(user => user.id === +userId)

    if (userFound) {
        res.status(200).send({ msg: "User found  !", userFound })
    }
    else {
        res.status(400).send("Can not find user with this id !!")
    }
})


/**
 * add new user
 * @method : POST
 * @path : '/'
 * @params : no
 * @body : yes
 */
app.post('/', (req, res) => {
    // console.log(req.body)
    const newUser = req.body
    users = [...users, newUser]
    res.status(200).send({ msg: "User added succ !!!", users })
})

/**
 * delete  user
 * @method : DELETE
 * @path : '/user/:id'
 * @params : yes
 * @body : no
 */
app.delete('/user/:id', auth, (req, res) => {
    const userId = +req.params.id

    const userToDelete = users.find(user => user.id === userId)

    if (userToDelete) {
        users = users.filter(user => user.id !== userId)
        res.status(200).send({ msg: "User deleted succ !!!", users })
    }
    else {
        res.status(400).send("Can not find the user to delete !!")
    }
})

/**
 * edit  user
 * @method : PUT
 * @path : '/user/:id'
 * @params : yes
 * @body : yes
 */
app.put('/user/:id', auth, (req, res) => {
    const userId = +req.params.id
    const newUser = req.body

    const userToEdit = users.find(user => user.id === userId)
    console.log(userToEdit)
    if (userToEdit) {
        users = users.map(user => user.id === userId ? { ...user, ...newUser } : user)
        res.status(200).send({ msg: "User edited succ !!", users })
    }
    else {
        res.status(400).send('Can not edit the user !!!')
    }
})


// 3 - create server
const port = 5000
app.listen(port, error =>
    error ? console.log('Can not connect to server !!!') : console.log(`Server is running on port ${port} ...`)
)

