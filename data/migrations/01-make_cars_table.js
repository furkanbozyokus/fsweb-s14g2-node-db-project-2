exports.up = function (knex) {
  // SİHRİNİZİ GÖSTERİN
  return knex.schema.createTableIfNotExists("cars", function (table) {
    table.increments("id").primary();
    table.string("vin", 17).notNullable().unique();
    table.string("make",50).notNullable();
    table.string("model",50).notNullable(); 
    table.integer("mileage").notNullable();
    table.string("title", 50);
    table.string("transmission", 50);
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
  // SİHRİNİZİ GÖSTERİN
};
