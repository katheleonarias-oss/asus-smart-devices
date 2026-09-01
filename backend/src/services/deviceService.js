import {
    findAllDevices,
    findDeviceById
} from "../repositories/deviceRepository.js";

export const getAllDevices = (filters = {}) => {
    return findAllDevices(filters);
};

export const getDeviceById = (id) => {
    return findDeviceById(id);
};