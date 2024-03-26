// //color generator 
// const generateRandomColor = () => {
//     const existingBudgetLength = fetchData('budgets')?. length ?? 0;
//     return `${existingBudgetLength * 34} 65% 50%`

// }

// // Function to send data to backend
// const sendDataToBackend = async (data) => {
//   try {
//     const response = await fetch('http://localhost:3000/budgets', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to send data to backend');
//     }
//     console.log('Data sent to backend successfully');
//   } catch (error) {
//     console.error(error);
//   }
// };

// // Create budget function without local storage operations
// export const createBudget = async ({
//   name,
//   amount
// }) => {
//   const newItem = {
//     name: name,
//     amount: +amount,
//     color: generateRandomColor()
//   };

//   try {
//     await sendDataToBackend(newItem);
//   } catch (error) {
//     console.error('Failed to create budget:', error);
//   }
// };
