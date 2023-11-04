require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const resourcesRoutes = require("./routes/resources");
const scheduleRoutes = require("./routes/schedule");
const freesessionRoutes = require("./routes/freesession");
const oneoffsessionRoutes = require("./routes/oneoffsession");
const recurringRoutes = require("./routes/recurringsession");
const upcomingRoutes = require("./routes/upcomingsession");

const app = express();

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use("/api/resources", resourcesRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/free-session", freesessionRoutes);
app.use("/api/one-off-session", oneoffsessionRoutes);
app.use("/api/recurring-session", recurringRoutes);
app.use("/api/upcoming-session", upcomingRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("connected to database");
        // listen to port
        app.listen(process.env.PORT, () => {
            console.log("listening for requests on port", process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });
