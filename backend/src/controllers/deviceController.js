import {
    getAllDevices,
    getDeviceById
} from "../services/deviceService.js";

export const getDevices = (req, res) => {
    const {
        search,
        category,
        brand
    } = req.query;

    const devices = getAllDevices({
        search,
        category,
        brand
    });

    res.json(devices);
};

export const getDevice = (req, res) => {
    const { id } = req.params;

    const device = getDeviceById(id);

    if (!device) {
        return res.status(404).json({
            mensaje: "Dispositivo no encontrado"
        });
    }

    res.json(device);
};