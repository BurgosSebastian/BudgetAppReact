import { Button, Form, Modal} from "react-bootstrap";
import { useRef } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";

export default function AddExpenseModal({show,handleClosed,defaultBudgetId}){

    const descriptionRef =  useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    const {addExpense, budgets} = useBudgets()

    function handleSubmit(e){
        e.preventDefault()
        addExpense({
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            budgetId: budgetIdRef.current.value
        })
        handleClosed()
    }

    return(
        <Modal show={show} onHide = {handleClosed}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Gasto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control ref={descriptionRef} type="text" required></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control 
                            ref={amountRef} 
                            type="number" 
                            required 
                            min={0} 
                            step={0.01}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="budgetId">
                        <Form.Label>Presupuesto</Form.Label>
                        <Form.Select 
                            defaultValue={defaultBudgetId}
                            ref={budgetIdRef}>
                                <option id={UNCATEGORIZED_BUDGET_ID}>Sin Definir</option>
                                {budgets.map(budget=>(
                                <option key={budget.id} value={budget.id}>{budget.name}</option>
                              ))}  
                            </Form.Select>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">
                            Agregar
                        </Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}