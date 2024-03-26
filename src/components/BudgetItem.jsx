// rrd imports
import { Form, Link } from "react-router-dom";

// library imports
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/outline";

// helper functions
import {
  formatCurrency,
  formatPercentage,
} from "../helpers";
import { useEffect, useState } from "react";

const BudgetItem = ({ budget, showDelete = false }) => {
  
  const { id, name, amount, color } = budget;
  const [expenses, setExpenses] = useState([]);
  const [expensesExist, setExpensesExist] = useState(false);

  useEffect(() => {
    // Fetch expenses from your backend when the component mounts
    fetchExpense();
  }, []);

  const fetchExpense = async () => {
    try {
      const response = await fetch('http://localhost:3000/expenses');
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      const data = await response.json();
      setExpenses(data); 
      setExpensesExist(data.Length > 0);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      toast.error('Failed to fetch expenses');
    }
  };


  const calculateSpentByBudget = (budgetId) => {
    const budgetSpent = expenses.reduce((acc, expense) => {
      if (expense.budgetId !== budgetId) return acc;
  
      // Check if expense.amount is a valid number
      const amount = parseFloat(expense.amount);
      if (!isNaN(amount)) {
        acc += amount;
      }
  
      return acc;
    }, 0);
  
    return budgetSpent;
  };
  
  
  const spent = calculateSpentByBudget(id);

  return (
    <div
      className="budget"
      style={{
        "--accent": color,
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>
      {showDelete ? (
        <div className="flex-sm">
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Are you sure you want to permanently delete this budget?"
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn">
              <span>Delete Budget</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`/budget/${id}`} className="btn">
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};
export default BudgetItem;