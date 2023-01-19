import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import BudgetCard from "./components/BudgetCard";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";
import TotalBudgetCard from "./components/TotalBudgetCard";

function App() {

  const [showAddBudgetModal,setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal,setShowAddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetId,setViewExpensesModalBudgetId] = useState()
  const [AddExpensetModalBudgetId,SetAddExpensetModalBudgetId] = useState()
  const {budgets,getBudgetExpenses} = useBudgets()

  function openAddExpenseModal(budgetId){
    setShowAddExpenseModal(true)
    SetAddExpensetModalBudgetId(budgetId)
  }

  return (
    <>
    <Container className="my-4">
      <Stack direction="horizontal" gap="2" className="mb-4">
        <h1 className="me-auto">Presupuesto</h1>
        <Button variant="primary"onClick={()=>setShowAddBudgetModal(true)}>Nuevo Presupuesto</Button>
        <Button variant="outline-primary" onClick={openAddExpenseModal}>Nuevo Gastos</Button>
      </Stack>
      <div style={{
        display:"grid", 
        gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",
        gap:"1rem",
        alignItems:"flex-start"
        }}> 
        {budgets.map(budget=>{
          const amount = getBudgetExpenses(budget.id).reduce(
            (total,expense)=> total + expense.amount, 
            0
            )
          return(
          <BudgetCard 
            key={budget.id} 
            name={budget.name} 
            amount={amount} 
            max={budget.max}
            onAddExpenseClick={()=> openAddExpenseModal(budget.id)}
            onViewExpensesClick={()=> setViewExpensesModalBudgetId(budget.id)} ></BudgetCard>
          )
          })}
          <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal} onViewExpensesClick={()=> setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}></UncategorizedBudgetCard>
          <TotalBudgetCard></TotalBudgetCard>
      </div>
    </Container>
    <AddBudgetModal show={showAddBudgetModal} handleClosed={()=>setShowAddBudgetModal(false)} />
    <AddExpenseModal show={showAddExpenseModal} defaultBudgetId={AddExpensetModalBudgetId} handleClosed={()=>setShowAddExpenseModal(false)} 
    />
    <ViewExpensesModal budgetId={viewExpensesModalBudgetId} handleClosed={()=>setViewExpensesModalBudgetId()} 
    />
    </>
  );
}

export default App;
