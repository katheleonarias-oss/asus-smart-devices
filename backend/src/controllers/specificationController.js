import {
    getSpecificationsByDeviceId
} from "../services/specificationService.js";

export const getSpecifications = (req, res) => {
    const { deviceId } = req.params;

    const specifications =
        getSpecificationsByDeviceId(deviceId);

    if (!specifications) {
        return res.status(404).json({
            mensaje: "Especificaciones no encontradas"
        });
    }

    res.json(specifications);
};