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
  async function deleteExpense(expenseid) {
    await db.none("DELETE FROM expense.expense WHERE id=$1", [expenseid]);
    return allExpenses();
  }
  async function categoryTotals() {
    let totals = await db.any(`
    SELECT SUM(e.amount), c.category_type FROM expense.category AS c RIGHT JOIN expense.expense AS e
    ON c.id=e.category_id GROUP BY c.category_type ORDER BY sum DESC;
    `);
    return totals;
  }
  return {
    addExpense,
    expenseForCategory,
    allExpenses,
    deleteExpense,
    categoryTotals,
  };
}
