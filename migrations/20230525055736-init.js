'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const sql = `CREATE TABLE IF NOT EXISTS "Categories" (id   SERIAL , description_en VARCHAR(255) NOT NULL, descripcion_es VARCHAR(255) NOT NULL, PRIMARY KEY (id));
      SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Categories' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
      CREATE TABLE IF NOT EXISTS "Ingredients" (id   SERIAL , description_en VARCHAR(255) NOT NULL, descripcion_es VARCHAR(255) NOT NULL, ndbn INTEGER, CategoryId INTEGER REFERENCES "Categories" (id) ON DELETE RESTRICT ON UPDATE CASCADE, PRIMARY KEY (id));
      SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Ingredients' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
      CREATE TABLE IF NOT EXISTS "MealTypes" (id   SERIAL , description_en VARCHAR(255), descripcion_es VARCHAR(255), ico VARCHAR(255), PRIMARY KEY (id));
      SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'MealTypes' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
      CREATE TABLE IF NOT EXISTS "Menus" (id   SERIAL , title VARCHAR(255) NOT NULL, date TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY (id));
      SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Menus' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
      CREATE TABLE IF NOT EXISTS "Recipes" (id   SERIAL , title VARCHAR(255) NOT NULL, instructions TEXT, mealType VARCHAR(255) NOT NULL, PRIMARY KEY (id));
      SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Recipes' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
      CREATE TABLE IF NOT EXISTS "Users" (id   SERIAL , email VARCHAR(255) NOT NULL UNIQUE, displayName VARCHAR(255) NOT NULL, active BOOLEAN NOT NULL DEFAULT true, coach BOOLEAN NOT NULL DEFAULT false, createdAt TIMESTAMP WITH TIME ZONE NOT NULL, updatedAt TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY (id));
      SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Users' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
      CREATE TABLE IF NOT EXISTS recipes_ingredients (createdAt TIMESTAMP WITH TIME ZONE NOT NULL, updatedAt TIMESTAMP WITH TIME ZONE NOT NULL, IngredientId INTEGER  REFERENCES "Ingredients" (id) ON DELETE RESTRICT ON UPDATE CASCADE, RecipeId INTEGER  REFERENCES "Recipes" (id) ON DELETE RESTRICT ON UPDATE CASCADE, PRIMARY KEY (IngredientId,RecipeId));
      SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'recipes_ingredients' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
      CREATE TABLE IF NOT EXISTS recipe_mealtypes (createdAt TIMESTAMP WITH TIME ZONE NOT NULL, updatedAt TIMESTAMP WITH TIME ZONE NOT NULL, MealTypeId INTEGER  REFERENCES "MealTypes" (id) ON DELETE RESTRICT ON UPDATE CASCADE, RecipeId INTEGER  REFERENCES "Recipes" (id) ON DELETE RESTRICT ON UPDATE CASCADE, PRIMARY KEY (MealTypeId,RecipeId));
      SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'recipe_mealtypes' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
      CREATE TABLE IF NOT EXISTS users_menus (createdAt TIMESTAMP WITH TIME ZONE NOT NULL, updatedAt TIMESTAMP WITH TIME ZONE NOT NULL, MenuId INTEGER  REFERENCES "Menus" (id) ON DELETE RESTRICT ON UPDATE CASCADE, UserId INTEGER  REFERENCES "Users" (id) ON DELETE RESTRICT ON UPDATE RESTRICT, PRIMARY KEY (MenuId,UserId));
      SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'users_menus' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
      CREATE TABLE IF NOT EXISTS menus_recipes (createdAt TIMESTAMP WITH TIME ZONE NOT NULL, updatedAt TIMESTAMP WITH TIME ZONE NOT NULL, MenuId INTEGER  REFERENCES "Menus" (id) ON DELETE RESTRICT ON UPDATE CASCADE, RecipeId INTEGER  REFERENCES "Recipes" (id) ON DELETE RESTRICT ON UPDATE CASCADE, PRIMARY KEY (MenuId,RecipeId));
      SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'menus_recipes' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
      CREATE TABLE IF NOT EXISTS coaches_trainees (createdAt TIMESTAMP WITH TIME ZONE NOT NULL, updatedAt TIMESTAMP WITH TIME ZONE NOT NULL, CoachId INTEGER  REFERENCES "Users" (id) ON DELETE RESTRICT ON UPDATE RESTRICT, TraineeId INTEGER  REFERENCES "Users" (id) ON DELETE RESTRICT ON UPDATE RESTRICT, PRIMARY KEY (CoachId,TraineeId));
      SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'coaches_trainees' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
      `;
    return queryInterface.sequelize.query(sql, { type: Sequelize.QueryTypes.RAW });
  },

  async down (queryInterface, Sequelize) {
    const sql = `
    DROP TABLE "coaches_trainees";
    DROP TABLE "menus_recipes";
    DROP TABLE "users_menus";
    DROP TABLE "recipe_mealtypes";
    DROP TABLE "recipes_ingredients";
    DROP TABLE "Users";
    DROP TABLE "Recipes";
    DROP TABLE "Menus";
    DROP TABLE "MealTypes";
    DROP TABLE "Ingredients";
    DROP TABLE "Categories";
    `;
    return queryInterface.sequelize.query(sql, { type: Sequelize.QueryTypes.RAW });
  }
};
