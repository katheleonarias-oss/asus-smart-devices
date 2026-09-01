import {
    findSpecificationsByDeviceId
} from "../repositories/specificationRepository.js";

export const getSpecificationsByDeviceId = (deviceId) => {
    return findSpecificationsByDeviceId(deviceId);
};