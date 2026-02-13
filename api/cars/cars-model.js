const db = require("./../data/db-config");

const getAll = async () => {
  const carsDb = db("cars");
  return await carsDb;
};

const getById = async (id) => {
  const carsDb = db("cars");
  return await carsDb.where("id", id).first();
};

const getByVin = async (vin) => {
  const carsDb = db("cars");
  return await carsDb.where("vin", vin).first();
};

const create = async (car) => {
  const carsDb = db("cars");
  await carsDb.insert(car);
  const newCar = await getByVin(car.vin);
  return newCar;
};

const updateCarById = async (id, car) => {
  const carsDb = db("cars");
  await carsDb.where("id", id).update(car);
  const updatedCar = await getById(id);
  return updatedCar;
};

module.exports = {
  getAll,
  getById,
  getByVin,
  create,
  updateCarById,
};