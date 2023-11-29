--Expenses Table
CREATE TABLE expense.expense (
   id serial primary key,
   description text not null,
   amount numeric not null, 
   category_id int not null,
   foreign key (category_id) references expense.category(id)
);

--Categories Table
CREATE TABLE expense.category (
   id serial primary key,
   category_type text NOT NULL
);
