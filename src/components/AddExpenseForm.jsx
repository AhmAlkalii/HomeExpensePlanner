import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const AddExpenseForm = ({ budgets }) => {
  const formRef = useRef();
  const focusRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);
    const jsonData = Object.fromEntries(formData.entries());
    console.log(Object.fromEntries(formData));


    try {
      const response = await fetch('http://localhost:3000/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      });

      if (!response.ok) {
        throw new Error('Failed to create expense');
      }

      const responseData = await response.json();
      toast.success(responseData.message);

      // Clear the form after successful submission
      formRef.current.reset();
      focusRef.current.focus();
    } catch (error) {
      console.error('Error creating expense:', error);
      toast.error('Failed to create expense');
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">Add New{" "}<span className="accent">
        {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
      </span>{" "}
        Expense
      </h2>
      <form method="post" className="grid-sm" ref={formRef} onSubmit={handleSubmit}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g., Coffee"
              ref={focusRef}
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g., 3.50"
              required
            />
          </div>
        </div>
        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget">Budget Category</label>
          <select name="budgetId" id="newExpenseBudget" required>
            {
              budgets
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((budget) => {
                  return (
                    <option key={budget.id} value={budget.id}>
                      {budget.name}
                    </option>
                  )
                })
            }
          </select>
        </div>
        <input type="hidden" name="_action" value="createExpense" />
        <button type="submit" className="btn btn--dark">
          <span>Add Expense</span>
          <PlusCircleIcon width={20} />
        </button>
      </form>
    </div>
  )
}

export default AddExpenseForm;
