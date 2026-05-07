import {useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import {ButtonGroup, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";
import Card from "react-bootstrap/Card";

const baseURL = `${import.meta.env.VITE_APP_API_URL ?? '/api'}/bus`;
var add = '/add';
var get = '/get/';
var edit = '/update/';
var del = '/delete/';

const Bus = () => {
    const [buses, setBuses] = useState([]);
    const [bus, setBus] = useState({id: 0, agency: '', origin: '', destination: ''});
    const {
        register, resetField,
        handleSubmit, formState: {errors}
    } = useForm();
    const {handleSubmit: handleUpdate} = useForm();
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);

    const getAllBuses = async () => {
        await axios.get(baseURL + '/all')
            .then((res) => setBuses(res.data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getAllBuses();
    }, []);

    const onAdd = async (data) => {
        await axios.post(baseURL + add, data)
            .then(() => {
                resetField("agency");
                resetField("origin");
                resetField("destination");
                setModalAdd(false);
                getAllBuses();
            })
            .catch((err) => console.log(err));
    };

    const onUpdate = async (cid) => {
        await axios.get(baseURL + get + cid)
            .then((res) => setBus(res.data))
            .catch((err) => console.log(err));
        setModalUpdate(true);
    };

    const onUpdateSet = async () => {
        await axios.put(baseURL + edit + bus.id, bus)
            .then(() => getAllBuses())
            .catch((err) => console.log(err));
        setModalUpdate(false);
    };

    const onDelete = (cid) => {
        let conf = confirm('Car ' + cid + ' will be deleted!');
        if (conf === true) {
            axios.delete(baseURL + del + cid)
                .then(() => getAllBuses())
                .catch((err) => console.log(err));
        }
        ;
    };

    return (
        <div>
            {/* Modal for adding new bus */}
            <Modal show={modalAdd} onHide={() => setModalAdd(false)}>
                <Modal.Header closeButton>ADD BUS</Modal.Header>
                <div>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(onAdd)}>
                                <Form.Group className="mb-3" controlId="agency">
                                    <Form.Control type="text" placeholder="Agency"
                                                  {...register("agency", {required: true})}/>
                                    {errors.agency && <p style={{color: 'red'}}>Agency is required</p>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="origin">
                                    <Form.Control type="text" placeholder="Origin"
                                                  {...register("origin", {required: true})}/>
                                    {errors.origin && <p style={{color: 'red'}}>Origin is required</p>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="destination">
                                    <Form.Control type="text" placeholder="Destination"
                                                  {...register("destination", {required: true})}/>
                                    {errors.destination && <p style={{color: 'red'}}>Destination is required</p>}
                                </Form.Group>
                                <Button variant="primary" type="submit" style={{float: "right"}}>Add</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Modal>

            {/* Modal for updating a bus */}
            <Modal show={modalUpdate} onHide={() => {
                setModalUpdate(false)
            }}>
                <Modal.Header closeButton>UPDATE BUS</Modal.Header>
                <div>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleUpdate(onUpdateSet)}>
                                <Form.Group className="mb-3" controlId="cid">
                                    <Form.Control type="text" value={bus.id} disabled/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="agency">
                                    <Form.Control type="text" placeholder="Agency" value={bus.agency}
                                                  onChange={(e) =>
                                                      setBus({...bus, agency: e.target.value})}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="origin">
                                    <Form.Control type="text" placeholder="Origin" value={bus.origin}
                                                  onChange={(e) =>
                                                      setBus({...bus, origin: e.target.value})}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="destination">
                                    <Form.Control type="text" placeholder="Destination" value={bus.destination}
                                                  onChange={(e) =>
                                                      setBus({...bus, destination: e.target.value})}/>
                                </Form.Group>
                                <Button variant="primary" type="submit" style={{float: "right"}}>Update</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Modal>

            {/* Showing all buses in a table */}
            <Card className="h-30 d-flex flex-column">
                <Card.Header>Buses</Card.Header>
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
                                <th>AGENCY</th>
                                <th>ORIGIN</th>
                                <th>DESTINATION</th>
                                <th>OPERATIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                            {buses.map((bus) => (
                                <tr key={bus.id}>
                                    <td>{bus.id}</td>
                                    <td style={{textAlign: "left"}}>{bus.agency}</td>
                                    <td style={{textAlign: "left"}}>{bus.origin}</td>
                                    <td style={{textAlign: "left"}}>{bus.destination}</td>
                                    <td>
                                        <ButtonGroup className="me-2" aria-label="Update">
                                            <Button variant="outline-warning" onClick={() => {
                                                onUpdate(bus.id)
                                            }}>Update</Button>
                                        </ButtonGroup>
                                        <ButtonGroup className="me-2" aria-label="Delete">
                                            <Button variant="outline-danger" onClick={() => {
                                                onDelete(bus.id)
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
export default Bus
