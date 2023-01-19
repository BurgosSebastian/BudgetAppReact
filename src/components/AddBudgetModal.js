import { Button, Form, Modal} from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../contexts/BudgetsContext";

export default function AddBudgetModal({show,handleClosed}){

    const nameRef =  useRef()
    const maxRef = useRef()
    const {addBudget} = useBudgets()

    function handleSubmit(e){
        e.preventDefault()
        addBudget({
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value)
        })
        handleClosed()
    }

    return(
        <Modal show={show} onHide = {handleClosed}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Presupuesto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control ref={nameRef} type="text" required></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="max">
                        <Form.Label>Gasto Maximo</Form.Label>
                        <Form.Control 
                            ref={maxRef} 
                            type="number" 
                            required 
                            min={0} 
                            step={0.01}
                        ></Form.Control>
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