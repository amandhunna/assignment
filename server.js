const express = require("express");
const app = express();

const db = require("./models");

const PORT = process.env.PORT || 4000;

const apiRoutes = require("./routes/apiRoutes");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api", apiRoutes);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`app listening on port ${PORT}`);
    });
});