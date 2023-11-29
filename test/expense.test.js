import assert from "assert";
import ExpenseTracker from "../services/expense.js";
import pgPromise from "pg-promise";
import dotenv from "dotenv";
dotenv.config();
const DATABASE_URL =
  process.env.DATABASE_URL || "postgresql://localhost:5432/expense_tracker";

const config = {
  connectionString: DATABASE_URL,
};

const pgp = pgPromise();
const db = pgp(config);

let expense = ExpenseTracker(db);
describe("The Booking Salon", function () {
  this.timeout(10000);
  beforeEach(async function () {
    await db.none("TRUNCATE TABLE expense.expense RESTART IDENTITY CASCADE");
  });

  it("should be able to add expense", async function () {
    let res = [
      {
        id: 1,
        description: "Lunch",
        amount: "200",
        category_id: 2,
      },
    ];

    let query = await expense.addExpense("Lunch", 200.0, 2);
    assert.deepEqual(res, query);
  });
  it("should filter expense by given category", async function () {
    await expense.addExpense("Lunch", 1600.0, 3);
    await expense.addExpense("Taxi", 1200.0, 3);
    await expense.addExpense("Coffee", 200.0, 4);
    await expense.addExpense("Brunch", 290.0, 5);
    await expense.addExpense("Rent", 1600.0, 2);
    await expense.addExpense("Toiletries", 459.0, 1);
    await expense.addExpense("Socials", 550.0, 4);
    await expense.addExpense("Visit friends", 240.0, 4);

    let expenseFor = await expense.expenseForCategory(3);
    assert.equal(2, expenseFor.length);
  });
  it("should get all the expenses", async function () {
    await expense.addExpense("Lunch", 1600.0, 3);
    await expense.addExpense("Taxi", 1200.0, 3);
    await expense.addExpense("Socials", 550.0, 4);
    let result = await expense.allExpenses();
    assert.equal(3, result.length);
  });
  it("delete given expense", async function () {
    await expense.addExpense("Lunch", 1600.0, 3);
    await expense.addExpense("Taxi", 1200.0, 3);
    await expense.addExpense("Socials", 550.0, 4);
    let result = await expense.deleteExpense(2);
    assert.equal(2, result.length);
  });
  it("should return category and its total", async function () {
    await expense.addExpense("Lunch", 1600.0, 3);
    await expense.addExpense("Taxi", 1200.0, 3);
    await expense.addExpense("Coffee", 200.0, 4);
    await expense.addExpense("Brunch", 290.0, 5);
    await expense.addExpense("Rent", 1600.0, 2);
    await expense.addExpense("Toiletries", 459.0, 1);
    await expense.addExpense("Socials", 550.0, 4);
    await expense.addExpense("Visit friends", 240.0, 4);
    let totals = [
      { sum: "2800", category_type: "weekday" },
      { sum: "1600", category_type: "monthly" },
      { sum: "990", category_type: "weekend" },
      { sum: "459", category_type: "weekly" },
      { sum: "290", category_type: "once-off" },
    ];

    let result = await expense.categoryTotals();
    assert.deepEqual(totals, result);
  });
  after(async function () {
    await db.none("TRUNCATE TABLE expense.expense RESTART IDENTITY CASCADE");
    db.$pool.end();
  });
});
