import React, { useRef, useState } from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

const AddBudgetForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();
  const focusRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(formRef.current);
    const jsonData = Object.fromEntries(formData.entries());
    console.log(Object.fromEntries(formData));

    
    try {
      const response = await fetch('http://localhost:3000/budgets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      });


      if (!response.ok) {
        throw new Error('Failed to create budget');
      }

      const responseData = await response.json();
      toast.success(responseData.message);


      setIsSubmitting(false);
      formRef.current.reset();
      focusRef.current.focus();
    } catch (error) {
      console.error('Error creating budget:', error);
      setIsSubmitting(false);
    }
  };


  
  return (
    <div className="form-wrapper">
      <h2 className="h3">Create Budget</h2>
      <form method="post" className="grid-sm" ref={formRef} onSubmit={handleSubmit}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="name"
            id="newBudget"
            placeholder="e.g., Groceries"
            required
            ref={focusRef}
          />

        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            name="amount"
            id="newBudgetAmount"
            placeholder="e.g., $350"
            required
            inputMode="decimal"
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Create Budget</span>
              <CurrencyDollarIcon width={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddBudgetForm;
