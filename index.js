const express = require("express")
const fs = require('fs');


const app = express()

const PORT = 3000

// middleware function that logs the request being made on the console
const logIncomingRequests = (req, res, next) => {
    console.log(`Received ${req.method} request at http://localhost:${PORT}${req.url}`);
    next(); 
};

//Using line 16, it will call the middleware function for all request made on any routes instead of specifying them one after the other  
// app.use(logIncomingRequests)


// middleware function to log request being made on this "/" route
app.use("/",logIncomingRequests)

//sendind a message "Hello node.js" to the / route which seems to be the base route
app.get("/", (req, res) => {
    res.send("Hello, Node.js")
})


// middleware function to log request being made on this "/file" route
app.use("/file", logIncomingRequests)

// reading content from data.txt file and sending the content to the "/file" route
app.get("/file", (req, res) => {
    fs.readFile("data.txt", "utf8", (error, data) => {
        if (error) {
            res.status(500).send('Error when trying to get content from data.txt file')
        } else {
            res.send(data)
        }
    })
    
})


// middleware function to log request being made on this "/api/user" route
app.use("api/user",logIncomingRequests)

// sending a userObject to the /api/user route 
app.get("/api/user", (req, res) => {
    const userObject = {
        "name": "Gyimah Emmanuel",
        "email": "olatunbossemma17@gmail.com",
        "age": 19
    }
    res.json(userObject)

})


app.listen(PORT, () => {
    console.log("Server running on port", PORT, `\nCheck it out here http://localhost:${PORT}`);
})