const express = require("express")
const bp = require("body-parser")
const fetch = require("node-fetch")
const axios = require('axios');
const db = require("db-service")
const app = express()
const PORT = 8082
const SERVICE_ID = 2

app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())

app.get("/", (req, res) => {
    res.json({
        serviceId: SERVICE_ID
    })
})

app.post("/init/comments/", async (req, res) => {
    let { userId, comment } = req.body
    let my_body = {
        "userId": +userId,
        "data": {
            "comment": comment
        }
    }
    let resData = await fetch('http://localhost:8081/user/update', { method: 'POST', body: JSON.stringify(my_body), headers: { 'Content-Type': 'application/json' } })
    let resDataJson = await resData.json()
    res.json(resDataJson)
})

app.get("/comments", (req, res)=>{
    let c = db.services.getComments()
    res.json({c: c})
})

app.listen(PORT, () => {
    console.log(`Service ${SERVICE_ID} is running on port ${PORT}`);
})