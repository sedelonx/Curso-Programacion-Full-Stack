const express = require("express")
const app = express()
const port = 3000;



app.use(express.static("public"));

app.get("/", (req, res) =>{
    res.sendFile("public/index.html");
})

app.listen(port, "127.0.0.1", () =>{
    console.log("server running");
});