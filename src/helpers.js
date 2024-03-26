//formating percentages
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined,{
      style: 'percent',
      minimumFractionDigits: 0,
    })
} 
  
  //format currency
  export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined,{
      style: 'currency',
      currency: 'USD'
    })
  }