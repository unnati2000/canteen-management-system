const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const path = require("path");

require("dotenv").config();

connectDB();
app.use(express.json({ extended: false }));

app.use(cors());

app.use(require("./routes/auth.routes"));
app.use(require("./routes/food.routes"));
app.use(require("./routes/order.routes"));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
