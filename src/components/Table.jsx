import ExpenseItem from "./ExpenseItem";


const Table = ({ expenses, budgets}) => {

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {["Name", "Amount", "Date", "Budget", ""].map(
              (i, index) => (
                <th key={index}>{i}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <ExpenseItem expense={expense} budgets={budgets} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;