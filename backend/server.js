const express = require("express");
const cors = require('cors');
require("dotenv").config();
const {connectDB} = require("./modules/db");
const contactsRoutes = require('./routes/contactsRoute')
// swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Routes
app.use("/", contactsRoutes);

//GET
app.get("/", (req, res) => {
    res.send("Hello There")
})

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
