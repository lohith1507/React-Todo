import React, { useContext, useEffect, useState } from "react";
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
import { GlobalContext } from "../App";

export default function Index() {
  const { todos, setTodos, fetchTodos, deleteTodo, addTodo, editTodo } =
    useContext(GlobalContext);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    task: "",
    msg: "",
    status: "Not Started",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (item = null) => {
    if (item) {
      setFormData(item);
      setIsEditMode(true);
      setEditId(item.id);
    } else {
      setFormData({
        task: "",
        msg: "",
        status: "Not Started",
      });
      setIsEditMode(false);
      setEditId(null);
    }
    setShow(true);
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
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
      ...formData,
    };
    try {
      const res = await addTodo(newTask);
      if (res.ok) {
        const savedTask = await res.json();
        setTodos([...todos, savedTask]);
      }
    } catch (err) {
      console.log("Failed to Save new Task: ", err);
    }
    fetchTodos();
    handleClose();
    setFormData({ task: "", msg: "", status: "Not Started" });
  };

  const handleEdit = (id) => {};

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((item) => item.id !== id));
      console.log("Deleted Todo with id : ", id);
    } catch (err) {
      alert(`Failed to delete Todo with id - ${id}`);
    }
    fetchTodos();
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
            <Table striped hover className="text-center">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Task</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.task}</td>
                    <td>{item.msg}</td>
                    <td>{item.status}</td>
                    <td>
                      <Button
                        onClick={handleEdit(item)}
                        variant="info"
                        className="me-2"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(item.id)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </td>
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
