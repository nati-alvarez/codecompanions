const env = require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());

if(process.env.NODE_ENV === "production")
    mongoose.connect(process.env.DB_CONNECTION_STRING, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});
else
    mongoose.connect("mongodb://localhost/codecompanions", {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});

//use cors if in development
//not needed in prod because api also serves react app
if(process.env.NODE_ENV === "development"){
    const cors = require("cors");
    app.use(cors());
}

//passport config for api auth
const User = require("./models/User");
const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const jwtOptions = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}
passport.use(new jwtStrategy(jwtOptions, (payload, done) => {
    User.findOne({_id: payload.user._id}).then(user => {
        if(!user) return done(null, false, {message: "You are not authorized to perform this action."});
        return done(null, user)
    }).catch(err => {
        return done(err, false, {message: "Error authenticating user."});
    });
}));
app.use(passport.initialize());

app.use(express.static(path.resolve(__dirname, "..", "dist")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//api routes
const apiRoutes = require("./routes");
app.use("/api", apiRoutes);

//serves react app on all other routes
app.get("/*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "..", "dist/index.html"));
});

//*************** WEBSOCKETS ***********************/

var notifications = io.of('/ws-notifications')
.on('connection', (socket)=>{
    //connects each user to a room specific to them to listen for notifications
    var room = socket.handshake.query.user;
    socket.join(room);
    
    socket.on('send-notification', (user)=>{
        socket.to(user).emit('new-notification');
    })
});

var chat = io.of('/ws-chat')
.on('connection', (socket)=>{
    //connects to chat channel room, to listen for new messages
    socket.on('get-messages', (projectId)=>{
        socket.join(projectId);
    });
    //lets all other users in the chat channel room know when a new message was sent
    socket.on('send-message', (message, author, channelName, projectId)=>{
        socket.to(projectId).emit('new-messages', message, author, channelName);
    });
    //lets all other users in the chat channel room know when a new channel was created
    socket.on('create-channel', (projectId)=>{
        socket.to(projectId).emit("new-channel")
    });
});

//********************* NOTE **************************//
//When using nodemon in development make sure to cd into
//the server folder before running the API
//Otherwise, nodemon will read any changes made to the client
//as changes made to the server and restart it casuing issues
//as the port will be in use when it restarts because nodemon
//didnt kill the previous process

server.listen(process.env.PORT || 8000, console.log("App is running"));