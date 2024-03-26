import React, { useEffect, useState } from 'react'

//tract-router-dom imports
import { Link } from 'react-router-dom';
//components
import Intro from '../components/Intro';
import { toast } from 'react-toastify';
import AddBudgetForm from '../components/AddBudgetForm';
import { useLocation } from 'react-router-dom';
import AddExpenseForm from '../components/AddExpenseForm';




// //action
// export async function dashboardAction({request}){
//   const data = await request.formData();
//   const {_action, ...values} = Object.fromEntries(data)
 

//   if(_action === 'login')
//   {
//     try{
//       return toast.success(`Welcome `)
//     } catch(e){
//       throw new Error("There was a problem creating your account.")
//     }
//   }

//   if(_action === 'register')
//   {
//     try{
//       return toast.success(`Welcome `)
//     } catch(e){
//       throw new Error("There was a problem creating your account.")
//     }
//   }

//   if (_action === 'createBudget') {
//     try {
//       // await createBudget({
//       //   name: values.newBudget,
//       //   amount: values.newBudgetAmount,
//       // });
  
//       toast.success('Budget Created!');
//     } catch (e) {
//       throw new Error("There was a problem creating your budget.");
//     }
//   }  

// }

function Dashboard() {

  const location = useLocation();
  const [budgetsExist, setBudgetsExist] = useState(false);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    // Fetch budgets from your backend when the component mounts
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await fetch('http://localhost:3000/budgets');
      if (!response.ok) {
        throw new Error('Failed to fetch budgets');
      }
      const data = await response.json();
      setBudgets(data); // Set the fetched budgets
      setBudgetsExist(data.length > 0); // Set budgetsExist based on whether budgets array is empty or not
    } catch (error) {
      console.error('Error fetching budgets:', error);
      toast.error('Failed to fetch budgets');
    }
  };


  return (
    <>
      <div className="dashboard">
        {budgetsExist ? ( // Render appropriate content based on budgetsExist
          <div className="grid-lg">
            <div className="flex-lg">
              <AddBudgetForm />
              <AddExpenseForm budgets={budgets} /> {/* Pass budgets as prop to AddExpenseForm */}
            </div>
          </div>
        ) : (
          <div className="grid-sm">
            <p>Personal budgeting is the secret to financial freedom.</p>
            <p>Create a budget to get started!</p>
            <AddBudgetForm />
          </div>
        )}
      </div>
    </>
  );

}

export default Dashboard