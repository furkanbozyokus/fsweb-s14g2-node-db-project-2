const { getById, getByVin } = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
    const car = await getById(req.params.id);
    if (!req.params.id || !car) {
        return res.status(404).json({
            message: `${req.params.id} kimliğine sahip araba bulunamadı`
        });
    } else {
        req.car = car;
        next();
    }
};

const checkCarPayload = (req, res, next) => {

    const requiredFields = ["vin", "make", "model", "mileage"];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
        return res.status(400).json({ 
            message: `${missingFields.join(", ")} eksik` 
        });
    }
    next();
};

const checkVinNumberValid = (req, res, next) => {
    if (!vinValidator.validate(req.body.vin)) {
        return res.status(400).json({ 
            message: `vin ${req.body.vin} geçersiz` 
        });
    }
    next();
};

const checkVinNumberUnique = async (req, res, next) => {
    try {
        const car = await getByVin(req.body.vin);
        
        if (!car) {
            return next();
        }
        
    
        if (req.params && req.params.id && String(car.id) === String(req.params.id)) {
            return next();
        }
        
        return res.status(400).json({ 
            message: `vin ${req.body.vin} zaten var` 
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    checkCarId,
    checkCarPayload,
    checkVinNumberUnique,
    checkVinNumberValid,
};