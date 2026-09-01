import db from "../database/database.js";

export const findAllDevices = ({
    search,
    category,
    brand
} = {}) => {

    let query = `
        SELECT
            devices.id,
            brands.name AS brand,
            devices.name,
            devices.model,
            devices.category,
            devices.description,
            devices.price,
            devices.release_date
        FROM devices
        INNER JOIN brands
            ON devices.brand_id = brands.id
        WHERE 1 = 1
    `;

    const params = [];

    if (search) {
        query += `
            AND (
                devices.name LIKE ?
                OR devices.model LIKE ?
            )
        `;

        const searchTerm = `%${search}%`;

        params.push(searchTerm, searchTerm);
    }

    if (category) {
        query += `
            AND devices.category = ?
        `;

        params.push(category);
    }

    if (brand) {
        query += `
            AND brands.name = ?
        `;

        params.push(brand);
    }

    query += `
        ORDER BY devices.release_date DESC
    `;

    const devices = db.prepare(query).all(...params);

    return devices;
};

export const findDeviceById = (id) => {
    const device = db.prepare(`
        SELECT
            devices.id,
            brands.name AS brand,
            devices.name,
            devices.model,
            devices.category,
            devices.description,
            devices.price,
            devices.release_date
        FROM devices
        INNER JOIN brands
            ON devices.brand_id = brands.id
        WHERE devices.id = ?
    `).get(id);

    return device;
};