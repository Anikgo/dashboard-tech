import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import alertRoutes from "./routes/alerts.js";
import resolvedAlertRoutes from "./routes/resolvedAlerts.js";

const app = express();
const PORT = process.env.PORT || 8001;

// Connect to MongoDB Atlas - explicitly specify guardex database
mongoose.connect(
  "mongodb+srv://anikgo:CtNjTIxe12acTT0p@guardex.cb67k9p.mongodb.net/guardex?retryWrites=true&w=majority&appName=Guardex",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas - guardex database");
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/alerts", alertRoutes);
app.use("/resolved-alerts", resolvedAlertRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
