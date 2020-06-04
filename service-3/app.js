const express = require("express")
const app = express()
const PORT = 8083
const SERVICE_ID = 3

app.get("/", (req, res)=>{
    res.json({
        serviceId: SERVICE_ID
    })
})

app.listen(PORT, () => {
    console.log(`Service ${SERVICE_ID} is running on port ${PORT}`);
})