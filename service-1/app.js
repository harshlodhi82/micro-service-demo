const express = require("express")
const bp = require("body-parser")
const db = require("db-service")
const app = express()
const PORT = 8081
const SERVICE_ID = 1

const users = [
    {
        id: 1,
        username: "h4r5",
        pass: "h4r5h999",
        token: "xyz123"
    },
    {
        id: 2,
        username: "abc",
        pass: "abc999",
        token: "abc123"
    },
    {
        id: 3,
        username: "cba",
        pass: "cba999",
        token: "cba123"
    }
]

app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())

app.get("/", (req, res)=>{
    res.json({
        serviceId: SERVICE_ID
    })
})

app.post('/auth', (req, res)=>{
    const { username, pass } = req.body;
    let user = users.find((elm)=> elm.username === username &&   elm.pass === pass)
    if(!user){
        res.json({msg: "user not found!"})
    }
    res.json(user)
})

app.get("/user/**", (req, res)=>{
    let id = +req.params[0]
    let user = users.find((elm)=> elm.id === id)
    if(!user){
        res.json({msg: "user not found!"})
    }
    res.json(user)
})

app.post("/varify", (req, res)=>{
    const { token } = req.body; 
    let user = users.find((elm)=> elm.token === token)
    if(!user){
        res.json({status: false})
    }
    res.json({status: true})
})

app.post("/user/update", (req, res)=>{
    const { userId, data } = req.body; 
    let index = -1
    users.forEach((e, i)=>{
        if(e.id === +userId){
            index = i
        }
    })
    if(index < 0){
        res.json({msg: "user not found!"})
    }
    users[index]["comments"] = data.comment
    res.json({status: true})
})

app.get("/users", (req, res)=>{
    let users = db.services.getAllUser()
    res.json({users: users})
})

app.listen(PORT, () => {
    console.log(`Service ${SERVICE_ID} is running on port ${PORT}`);
})

module.exports = {
    app
}