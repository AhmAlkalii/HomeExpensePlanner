import React from 'react';
import { TrashIcon } from "@heroicons/react/24/solid";
import { formatCurrency, formatDateToLocaleString } from "../helpers";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const ExpenseItem = ({ expense, budgets, showBudget }) => {
  const budget = budgets.find(b => b.id === expense.budgetId);

  const handleDeleteExpense = async () => {
    try {
      const response = await fetch(`http://localhost:3000/expenses/${expense.id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        toast.success('Expense deleted successfully');
      } else {
        console.error('Failed to delete expense:', response.statusText);
        toast.error('Failed to delete expense');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast.error('Error deleting expense');
    }
  };
  
  return (
    <>
      <td>{expense.newExpense}</td>
      <td>{formatCurrency(expense.newExpenseAmount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      { showBudget && (
        <td>
          <Link
              to={`/budget/${budget.id}`}
              state={{
                budget: budget,
                expense: expense
              }}
              style={{
                "--accent": budget.color,
              }}
          >
              {budget.name}
          </Link>
        </td>
      )}
      <td>
        <button
          type="submit"
          className="btn btn--warning"
          aria-label={`Delete ${expense.newExpenseAmount} expense`}
          onClick={handleDeleteExpense}
        >
          
          <TrashIcon width={20} />
        </button>
      </td>

    </>
  );
};
export default ExpenseItem;




