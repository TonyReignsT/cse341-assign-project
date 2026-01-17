const express = require("express");
const cors = require('cors');
// const bodyParser = require('body-parser');
require("dotenv").config();
const {connectDB} = require("./modules/db");
const profRoutes = require('./routes/profRoute')

const app = express();
// const PORT = process.env.PORT || 8000;
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use("/", profRoutes);

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch(err => {
        console.log('Failed to start server:', err);
        process.exit(1)
    })
