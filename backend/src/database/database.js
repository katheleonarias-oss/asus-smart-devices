import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Obtener la ubicación actual del archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta donde se guardará nuestra base de datos
const dbPath = path.join(__dirname, "asus.db");

// Crear o abrir la base de datos
const db = new Database(dbPath);

// Activar las claves foráneas
db.pragma("foreign_keys = ON");

// Leer el archivo schema.sql
const schemaPath = path.join(__dirname, "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf-8");

// Ejecutar el esquema
db.exec(schema);

console.log("Base de datos ASUS Smart Devices conectada correctamente.");

export default db;