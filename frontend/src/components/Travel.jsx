import {useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Moment from 'moment';

// import {Modal} from "react-bootstrap";
//import Form from "react-bootstrap/Form";
//import {useForm} from "react-hook-form";
import Card from "react-bootstrap/Card";
import {ButtonGroup} from "react-bootstrap";

const baseURL = `${import.meta.env.VITE_APP_API_URL ?? '/api'}/travel`;

//var add = '/add';
//var get = '/get/';
//var edit = '/update/';
//var del = '/delete/';



const Rental = () => {

    const [rentals, setRentals] = useState([]);
    /*
    const [customers, setCustomers] = useState([]);
    const [cars, setCars] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedCar, setSelectedCar] = useState('');
     */
    //   const [reserv, setReserv] =
    //      useState({id: 0, customerId: 0, carId: 0, rentalDate:'', returnDate: '', returned: false});
    //   const {
    //       register, resetField,
    //       handleSubmit, formState: {errors}
    //   } = useForm();
    //const {handleSubmit: handleReserv} = useForm();
    // const [modalAdd, setModalAdd] = useState(false);
    // const [modalUpdate, setModalUpdate] = useState(false);

    const getAllRentals = async () => {
        await axios.get(baseURL + '/all')
            .then((res) => setRentals(res.data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getAllRentals();
    }, []);
    /*
        const onAdd = async (data) => {
            await axios.post(baseURL + add, data)
                .then(() => {

                    resetField("customerId");
                    resetField("carId");
                    resetField("rentalDate");
                    resetField("returnDate");
                    resetField("returned");


                   // setModalAdd(false);
                    getAllRentals();
                })
                .catch((err) => console.log(err));
        };

        const onUpdate = async (cid) => {
            await axios.get(baseURL + get + cid)
                .then((res) => setReserv(res.data))
                .catch((err) => console.log(err));
            setModalUpdate(true);
        };

        const onUpdateSet = async () => {
            await axios.put(baseURL + edit + reserv.id, reserv)
                .then(() => getAllRentals())
                .catch((err) => console.log(err));
            setModalUpdate(false);
        };

        const onDelete = (cid) => {
            let conf = confirm('Reservation ' + cid + ' will be deleted!');
            if (conf === true) {
                axios.delete(baseURL + del + cid)
                    .then(() => getAllRentals())
                    .catch((err) => console.log(err));
            };
        };
    */


    return (
        <div>
            {/* Modal for adding new reservation
            <Modal show={modalAdd} onHide={() => setModalAdd(false)}>
                <Modal.Header closeButton>ADD RESERVATION</Modal.Header>
                <div>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(onAdd)}>
                                <Form.Group className="mb-3" controlId="customer">


                                    <Form.Select>

                                    </Form.Select>




                                </Form.Group>


                                <Form.Group className="mb-3" controlId="model">
                                    <Form.Control type="text" placeholder="Model"
                                                  {...register("model", {required: true})}/>
                                    {errors.model && <p style={{color: 'red'}}>Model is required</p>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="plate">
                                    <Form.Control type="text" placeholder="Plate"
                                                  {...register("plate", {required: true})}/>
                                    {errors.plate && <p style={{color: 'red'}}>Plate is required</p>}
                                </Form.Group>
                                <Button variant="primary" type="submit" style={{float: "right"}}>Add</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Modal>
            */}

            {/* Modal for updating a customer
            <Modal show={modalUpdate} onHide={() => {
                setModalUpdate(false)
            }}>
                <Modal.Header closeButton>UPDATE CAR</Modal.Header>
                <div>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleUpdate(onUpdateSet)}>
                                <Form.Group className="mb-3" controlId="cid">
                                    <Form.Control type="text" value={vehicle.id} disabled/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="brand">
                                    <Form.Control type="text" placeholder="Vehicle" value={vehicle.brand}
                                                  onChange={(e) =>
                                                      setVehicle({...vehicle, brand: e.target.value})}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="model">
                                    <Form.Control type="text" placeholder="Model" value={vehicle.model}
                                                  onChange={(e) =>
                                                      setVehicle({...vehicle, model: e.target.value})}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="plate">
                                    <Form.Control type="text" placeholder="Plate" value={vehicle.plate}
                                                  onChange={(e) =>
                                                      setVehicle({...vehicle, plate: e.target.value})}/>
                                </Form.Group>
                                <Button variant="primary" type="submit" style={{float: "right"}}>Update</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Modal>
*/}
            {/* Showing all rentals in a table */}
            <Card className="h-30 d-flex flex-column">
                <Card.Header>Rentals</Card.Header>
                <Card.Body style={{minHeight: 0}} className="h-100">
                    <Container fluid className="h-100">

                        <ButtonGroup className="float-end mb-2" aria-label="Add">
                            <Button variant="primary" >Add</Button>
                            {/*
                            onClick={() => {
                                setModalAdd(true);
                            }}
                            */}
                        </ButtonGroup>


                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>PASSENGER</th>
                                <th>BUS</th>
                                <th>DATE</th>
                                <th>TIME</th>
                                <th>PRICE</th>
                                <th>SEAT</th>
                                <th>OPERATIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rentals.map((travel) => (
                                <tr key={travel.id}>
                                    <td>{travel.id}</td>
                                    <td style={{textAlign: "left"}}>{travel.passengerDTO?.name ?? '-'}</td>
                                    <td style={{textAlign: "left"}}>{travel.busDTO?.agency ?? '-'}</td>
                                    <td style={{textAlign: "left"}}>{travel.date ? Moment(travel.date).format('DD-MM-YYYY') : '-'}</td>
                                    <td style={{textAlign: "left"}}>{travel.time ?? '-'}</td>
                                    <td style={{textAlign: "left"}}>{travel.price}</td>
                                    <td style={{textAlign: "left"}}>{travel.seat}</td>
                                    <td>
                                        <ButtonGroup className="me-2" aria-label="Update">
                                            <Button variant="outline-warning" >Update</Button>
                                            {/*
                                                    onClick={() => {
                                                onUpdate(rent.id)
                                            }}
                                            */}
                                        </ButtonGroup>
                                        <ButtonGroup className="me-2" aria-label="Delete">
                                            <Button variant="outline-danger" >Delete</Button>
                                            {/*
                                                    onClick={() => {
                                                o
                                                */}
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
export default Rental
