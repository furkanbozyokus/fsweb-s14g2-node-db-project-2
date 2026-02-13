module.exports = {
  async seed(knex) {
    const cars = [
      {
        vin: "111111111111111111",
        make: "Toyota",
        model: "Corolla",
        mileage: 100000,
        title: "Clean",
        transmission: "Automatic"
      },
      {
        vin: "222222222222222222",
        make: "Honda",
        model: "Civic",
        mileage: 150000,
        title: "Salvage",
        transmission: "Manual"
      },
      {
        vin: "333333333333333333",
        make: "Ford",
        model: "Focus",
        mileage: 120000,
        title: null,
        transmission: null
      }
    ];
    
    for(const car of cars) {
    await knex('cars').insert(cars);
  }
}}