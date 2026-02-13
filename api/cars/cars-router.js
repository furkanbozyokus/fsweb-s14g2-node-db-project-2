const express = require("express");
const { getAll, getById, updateCarById, create } = require("./cars-model");
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require("./cars-middleware");
const router = express.Router();

router.get("/", async (req, res) => {
    const cars = await getAll();
    return res.json(cars);
});

router.get("/:id",checkCarId, async (req, res) => {
    const car = await getById(req.params.id);
    return res.json(car);
});

router.put("/:id",checkCarId,checkCarPayload,checkVinNumberValid,checkVinNumberUnique, async (req, res) => {
    const updatedCar = await updateCarById(req.params.id, req.body);
    return res.json(updatedCar);
});

router.post("/",checkCarPayload,checkVinNumberValid,checkVinNumberUnique, async (req, res) => {
    try {
        const newCar = await create(req.body);
        return res.status(201).json(newCar);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

module.exports = router;