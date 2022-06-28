
 delete from recipes_ingredients;
 delete from "Recipes"
;
 insert into "Ingredients" (id,description_en,descripcion_es,ndbn)
select id, description_en,descripcion_es,null from "Categories";

 delete from "Ingredients" where description_en='No Category';
 delete from "Categories" where id >6;
 update "Categories"
set description_en='Fruit',descripcion_es='Fruta' where id=1;
 update "Categories"
set description_en='Grains',descripcion_es='Granoss' where id=2;
 update "Categories"
set description_en='Meat',descripcion_es='Carne' where id=3;
 update "Categories"
set description_en='Milk products',descripcion_es='Lacteos' where id=4;
 update "Categories"
set description_en='Meats',descripcion_es='Carnes' where id=3;
 update "Categories"
set description_en='Grains',descripcion_es='Granos' where id=2;

 update "Categories"
set description_en='Seeds',descripcion_es='Semillas' where id=5;
 update "Categories"
set description_en='Vegetals',descripcion_es='Vegetales' where id=6;

 update "Ingredients" set "CategoryId" = 4 where description_en like '%BUTTER%';
 update "Ingredients" set "CategoryId" = 3 where description_en like '%FISH%';
 update "Ingredients" set "CategoryId" = 4 where description_en like '%CHEESE%';
 update "Ingredients" set "CategoryId" = 4 where description_en like '%CREAM%';
 update "Ingredients" set "CategoryId" = 4 where description_en like '%MILK%';
 update "Ingredients" set "CategoryId" = 4 where description_en like '%YOGURT%';
 update "Ingredients" set "CategoryId" = 3 where description_en like '%EGG%';
 update "Ingredients" set "CategoryId" = 3 where description_en like '%TURKEY%';
 update "Ingredients" set "CategoryId" = 3 where description_en like '%CHICKEN%';
 update "Ingredients" set "CategoryId" = 3 where description_en like '%SAUSAGE%';
 update "Ingredients" set "CategoryId" = 3 where description_en like '%BEEF%';
 update "Ingredients" set "CategoryId" = 1 where description_en like '%BERRY%';
 update "Ingredients" set "CategoryId" = 6 where description_en like '%ONION%';
 update "Ingredients" set "CategoryId" = 1 where description_en like '%TOMATO%';
 update "Ingredients" set "CategoryId" = 6 where description_en like '%ESPINACH%';
 update "Ingredients" set "CategoryId" = 1 where description_en like '%APPLE%';
 update "Ingredients" set "CategoryId" = 2 where description_en like '%RICE%';
 update "Ingredients" set "CategoryId" = 5 where description_en like '%CORN%';
