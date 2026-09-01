import db from "./database.js";

const existingUser = db
    .prepare("SELECT id FROM users WHERE email = ?")
    .get("kathe@example.com");

if (!existingUser) {
    const result = db.prepare(`
        INSERT INTO users (
            name,
            email,
            password,
            role
        )
        VALUES (?, ?, ?, ?)
    `).run(
        "Kathe",
        "kathe@example.com",
        "123456",
        "USER"
    );

    console.log("Usuario creado con ID:", result.lastInsertRowid);
} else {
    console.log("El usuario de prueba ya existe con ID:", existingUser.id);
}