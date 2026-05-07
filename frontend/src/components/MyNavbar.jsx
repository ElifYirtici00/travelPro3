import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Dropdown} from "react-bootstrap";

const MyNavbar = (args) => {

    return (
        <>
            <Navbar bg="primary" expand="md" data-bs-theme="dark" className="justify-content-center navbar-top" fixed="top">
                <Container>
                    <Navbar.Brand href="#home">CR</Navbar.Brand>
                    <Nav className="me-auto">
                        <Dropdown>
                            <Dropdown.Toggle id="customer">Customers</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#" onClick={() => args.onHandle('customers')}>Get</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle id="car">Cars</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#" onClick={() => args.onHandle('cars')}>Get</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle id="rental">Reservation</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#" onClick={() => args.onHandle('rentals')}>Get</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};
export default MyNavbar;