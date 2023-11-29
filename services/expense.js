export default function Expense(db) {
  async function addExpense(description, amount, catergoryid) {
    if (catergoryid && amount && description) {
      await db.any(
        "INSERT INTO expense.expense (description, amount, category_id) VALUES($1,$2,$3)",
        [description, amount, catergoryid]
      );
      return await db.manyOrNone("SELECT * FROM expense.expense");
    }
  }
  async function expenseForCategory(categoryid) {
    return await db.any("SELECT * FROM expense.expense WHERE category_id=$1", [
      categoryid,
    ]);
  }
  async function allExpenses() {
    return await db.any("SELECT * FROM expense.expense");
  }
  return {
    addExpense,
    expenseForCategory,
    allExpenses,
  };
}
