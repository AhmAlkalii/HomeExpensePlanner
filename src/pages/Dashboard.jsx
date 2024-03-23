import React from 'react'

//tract-router-dom imports
import { Link } from 'react-router-dom';
//components
import Intro from '../components/Intro';
import { toast } from 'react-toastify';
import AddBudgetForm from '../components/AddBudgetForm';
import { useLocation } from 'react-router-dom';



//action
export async function dashboardAction({request}){
  const data = await request.formData();
  const {_action, ...values} = Object.fromEntries(data)
  if(_action === 'login')
  {
    try{
      return toast.success(`Welcome `)
    } catch(e){
      throw new Error("There was a problem creating your account.")
    }
  }

  if(_action === 'register')
  {
    try{
      return toast.success(`Welcome `)
    } catch(e){
      throw new Error("There was a problem creating your account.")
    }
  }

  if(_action === 'createBudget'){
    try{
    //   createBudget({
    //     name: values.newBudget,
    //     amount: values.newBudgetAmount,
    //   })

      return toast.success('Budget Created!')
    }catch(e){
      throw new Error("There was a problem creating your budget.")
    }
  }

}

function Dashboard() {

  const location = useLocation();
  // const { isLogin } = location.state;

  return (
    <>
        <div className="dashboard">
            <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm/>
            </div>
        </div>
    </>
  )
}

export default Dashboard