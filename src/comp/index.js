import React, { useEffect, useState } from "react";
import "../index.css";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Modal,
  Form,
} from "react-bootstrap";
export default function Index() {
  const [todos, setTodos] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    task: "",
    msg: "",
    status: "Not Started",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchTodos = async () => {
    const res = await fetch("http://localhost:5000/items");
    if (!res.ok) {
      throw new Error("Data not Fetched");
    }
    const data = await res.json();
    setTodos(data);
    console.log(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const newTask = {
        id : todos.length > 0 ? todos[todos.length-1].id + 1 : 1,
        ...formData 
    }
    try{
        const res = await fetch("http://localhost:5000/items", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(newTask), 
        });
        if(res.ok){
            const savedTask = await res.json();
            setTodos([...todos, savedTask]);
        }
    }
    catch(err){
        console.log("Failed to Save new Task: ", err)
    }
    fetchTodos();
    handleClose();
    setFormData({task:"",msg:"",status:"Not Started"});
};

  return (
    <>
      <h1 className="text-center mt-3" style={{ textAlign: "center" }}>
        Task Management
      </h1>

      <div className="content">
        <Card style={{ width: "50rem" }}>
          <CardHeader>
            <CardTitle>ToDo Items</CardTitle>
            <Button className="float-end" onClick={handleShow}>
              Add task
            </Button>
          </CardHeader>
          <CardBody>
            <Table striped hover>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Task</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.task}</td>
                    <td>{item.msg}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                placeholder="Task Name"
                onChange={handleChange}
                value={formData.task}
                name="task"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={handleChange}
                value={formData.msg}
                name="msg"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
