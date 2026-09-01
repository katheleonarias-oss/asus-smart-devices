import db from "./database.js";

// Insertar la marca ASUS
const brandExists = db
    .prepare("SELECT id FROM brands WHERE name = ?")
    .get("ASUS");

let brandId;

if (brandExists) {
    brandId = brandExists.id;
} else {
    const result = db
        .prepare(`
            INSERT INTO brands (name, description, website)
            VALUES (?, ?, ?)
        `)
        .run(
            "ASUS",
            "ASUS es una compañía dedicada al desarrollo de computadores y tecnología.",
            "https://www.asus.com/"
        );

    brandId = result.lastInsertRowid;
}

// Insertar dispositivos ASUS
const devices = [
    {
        name: "ASUS Vivobook 15",
        model: "X1504VA",
        category: "Portátil",
        description: "Computador portátil ASUS diseñado para productividad y uso diario.",
        price: 2499000,
        releaseDate: "2024-05-15"
    },
    {
        name: "ASUS ROG Strix G16",
        model: "G614J",
        category: "Gaming",
        description: "Portátil gaming ASUS diseñado para alto rendimiento.",
        price: 5999000,
        releaseDate: "2024-01-20"
    }
];

for (const device of devices) {
    const exists = db
        .prepare("SELECT id FROM devices WHERE model = ?")
        .get(device.model);

    if (!exists) {
        db.prepare(`
            INSERT INTO devices (
                brand_id,
                name,
                model,
                category,
                description,
                price,
                release_date
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(
            brandId,
            device.name,
            device.model,
            device.category,
            device.description,
            device.price,
            device.releaseDate
        );
    }
}

console.log("Datos iniciales ASUS insertados correctamente.");
