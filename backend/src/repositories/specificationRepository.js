import db from "../database/database.js";

export const findSpecificationsByDeviceId = (deviceId) => {
    const specifications = db.prepare(`
        SELECT
            id,
            device_id,
            processor,
            ram,
            storage,
            storage_type,
            screen_size,
            screen_resolution,
            graphics,
            operating_system,
            battery,
            weight
        FROM specifications
        WHERE device_id = ?
    `).get(deviceId);

    return specifications;
};