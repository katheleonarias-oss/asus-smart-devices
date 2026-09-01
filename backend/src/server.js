import express from "express";
import cors from "cors";
import deviceRoutes from "./routes/deviceRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import db from "./database/database.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/devices", deviceRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
    res.json({
        mensaje: "API ASUS Smart Devices funcionando correctamente"
    });
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});