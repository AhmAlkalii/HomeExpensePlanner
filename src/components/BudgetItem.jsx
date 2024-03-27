import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { formatCurrency, formatPercentage } from "../helpers";

const BudgetItem = ({ budget, showDelete = false }) => {
  const { id, name, amount, color } = budget;
  const [spent, setSpent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSpent();
  }, []);

  const fetchSpent = async () => {
    try {
      const response = await fetch(`http://localhost:3000/budgets/${id}/spent`);
      if (!response.ok) {
        throw new Error('Failed to fetch spent amount');
      }
      const data = await response.json();
      setSpent(data.spent);
    } catch (error) {
      console.error('Error fetching spent amount:', error);
      toast.error('Failed to fetch spent amount');
    }
  };

  return (
    <div
      className="budget"
      style={{
        '--accent': color,
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
          <button
            className="btn"
            onClick={() => {
              if (
                !window.confirm(
                  "Are you sure you want to permanently delete this budget?"
                )
              ) {
                return;
              }
              // Handle delete action here
            }}
          >
            <span>Delete Budget</span>
            <TrashIcon width={20} />
          </button>
        </div>
      ) : (
        <div className="flex-sm">
          <button
            className="btn"
            onClick={() => navigate(`/budget/${id}`)}
          >
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default BudgetItem;
