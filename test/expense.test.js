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
        description: "monthly",
        amount: "200",
        category_id: 2,
      },
    ];

    let query = await expense.addExpense("monthly", 200, 2);
    assert.deepEqual(res, query);
  });

  after(function () {
    db.$pool.end();
  });
});
