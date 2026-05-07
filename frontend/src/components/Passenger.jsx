import {useState, useEffect} from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import {ButtonGroup, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";

const baseURL = `${import.meta.env.VITE_APP_API_URL ?? '/api'}/passenger`;
var add = '/add';
var get = '/get/';
var edit = '/update/';
var del = '/delete/';

const Passenger = () => {
    const [passengers, setPassengers] = useState([]);
    const [person, setPerson] = useState({id: 0, name: '', address: '', telephone: ''});
    const {
        register, resetField,
        handleSubmit, formState: {errors}
    } = useForm();
    const {handleSubmit: handleUpdate} = useForm();
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);

    const getAllPassengers = async () => {
        await axios.get(baseURL + '/all')
            .then((res) => setPassengers(res.data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getAllPassengers();
    }, []);

    const onAdd = async (data) => {
        await axios.post(baseURL + add, data)
            .then(() => {
                resetField("name");
                resetField("address");
                resetField("telephone");
                setModalAdd(false);
                getAllPassengers();
            })
            .catch((err) => console.log(err));
    };

    const onUpdate = async (cid) => {
        await axios.get(baseURL + get + cid)
            .then((res) => setPerson(res.data))
            .catch((err) => console.log(err));
        setModalUpdate(true);
    };

    const onUpdateSet = async () => {
        await axios.put(baseURL + edit + person.id, person)
            .then(() => getAllPassengers())
            .catch((err) => console.log(err));
        setModalUpdate(false);
    };

    const onDelete = (cid) => {
        let conf = confirm('Customer ' + cid + ' will be deleted!');
        if (conf === true) {
            axios.delete(baseURL + del + cid)
                .then(() => getAllPassengers())
                .catch((err) => console.log(err));
        }
        ;
    };

    return (
        <div>
            {/* Modal for adding new passenger */}
            <Modal show={modalAdd} onHide={() => setModalAdd(false)}>
                <Modal.Header closeButton>ADD PASSENGER</Modal.Header>
                <div>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(onAdd)}>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Control type="text" placeholder="Name"
                                                  {...register("name", {required: true})}/>
                                    {errors.name && <p style={{color: 'red'}}>Name is required</p>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="address">
                                    <Form.Control type="text" placeholder="Address"
                                                  {...register("address", {required: true})}/>
                                    {errors.address && <p style={{color: 'red'}}>Address is required</p>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="telephone">
                                    <Form.Control type="text" placeholder="Telephone"
                                                  {...register("telephone", {required: true})}/>
                                    {errors.telephone && <p style={{color: 'red'}}>Telephone is required</p>}
                                </Form.Group>
                                <Button variant="primary" type="submit" style={{float: "right"}}>Add</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Modal>

            {/* Modal for updating a passenger */}
            <Modal show={modalUpdate} onHide={() => {
                setModalUpdate(false)
            }}>
                <Modal.Header closeButton>UPDATE PASSENGER</Modal.Header>
                <div>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleUpdate(onUpdateSet)}>
                                <Form.Group className="mb-3" controlId="cid">
                                    <Form.Control type="text" value={person.id} disabled/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Control type="text" placeholder="Name" value={person.name}
                                                  onChange={(e) =>
                                                      setPerson({...person, name: e.target.value})}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="address">
                                    <Form.Control type="text" placeholder="Address" value={person.address}
                                                  onChange={(e) =>
                                                      setPerson({...person, address: e.target.value})}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="telephone">
                                    <Form.Control type="text" placeholder="Telephone" value={person.telephone}
                                                  onChange={(e) =>
                                                      setPerson({...person, telephone: e.target.value})}/>
                                </Form.Group>
                                <Button variant="primary" type="submit" style={{float: "right"}}>Update</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Modal>

            {/* Showing all passengers in a table */}
            <Card className="h-30 d-flex flex-column">
                <Card.Header>Passengers</Card.Header>
                <Card.Body style={{minHeight: 0}} className="h-100">
                    <Container fluid className="h-100">

                        <ButtonGroup className="float-end mb-2" aria-label="Add">
                            <Button variant="primary" onClick={() => {
                                setModalAdd(true);
                            }}>Add</Button>
                        </ButtonGroup>

                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>ADDRESS</th>
                                <th>TELEPHONE</th>
                                <th>OPERATIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                            {passengers.map((passenger) => (
                                <tr key={passenger.id}>
                                    <td>{passenger.id}</td>
                                    <td style={{textAlign: "left"}}>{passenger.name}</td>
                                    <td style={{textAlign: "left"}}>{passenger.address}</td>
                                    <td style={{textAlign: "left"}}>{passenger.telephone}</td>
                                    <td>
                                        <ButtonGroup className="me-2" aria-label="Update">
                                            <Button variant="outline-warning" onClick={() => {
                                                onUpdate(passenger.id)
                                            }}>Update</Button>
                                        </ButtonGroup>
                                        <ButtonGroup className="me-2" aria-label="Delete">
                                            <Button variant="outline-danger" onClick={() => {
                                                onDelete(passenger.id)
                                            }}>Delete</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    );
};
export default Passenger
