import { useState } from 'react';
import axios from 'axios';
import { apiUrl, endpointToRoleConverter } from '../../utils';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const ProfileModal = (props) => {    
    
    const { endpoint } = props;
    const role = endpoint.slice(0, -1);

    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');        
    const [email, setEmail] = useState('');        
    const [address, setAddress] = useState('');        
    const [phoneNumber, setPhoneNumber] = useState('');        
    const [birthday, setBirthday] = useState('');

    const resetDataStates = () => {
        setFirstName('');
        setlastName('');
        setEmail('');
        setAddress('');
        setPhoneNumber('');
        setBirthday('');
    }

    const validateUser = () => {

        const newUser = {};

        if(firstName) {
            newUser["first_name"] = firstName;
        }

        if(lastName) {
            newUser["last_name"] = lastName;
        }

        if(email) {
            newUser["email"] = email;
        }   
        
        if(Object.keys(newUser).length !== 0) {
            return newUser;
        }

        return false;
        
    }

    const validateProfile = () => {

        const newProfile = {}

        if(address) {
            newProfile["address"] = address;
        }

        if(phoneNumber) {
            newProfile["phone_number"] = phoneNumber
        }

        if(birthday) {
            let date = birthday.split("-");
            date = `${date[2]}-${date[1]}-${date[0]}`;            
            newProfile["birthday"] = date;
        }        

        if(Object.keys(newProfile).length !== 0) {
            return newProfile;
        }
        
        return false;

    } 
    
    return(
        <Modal
            show={props.show}                        
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered     
            onHide={() => {
                props.onHide()
                resetDataStates();
            }}
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editar {`${endpointToRoleConverter(endpoint).singular}`}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    props.profile
                    ? <>
                        <Form>
                            <Form.Group className="mb-3" controlId="formGroupFirstName">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupLastName">
                                <Form.Label>Sobrenome</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setlastName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupAdress">
                                <Form.Label>Endereço</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPhoneNumber">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupBirthday">
                                <Form.Label>Nascimento</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={birthday}
                                    onChange={(e) => setBirthday(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                        <Alert variant="warning">
                            Apenas os campos que você preencher serão atualizados.
                        </Alert>
                      </>
                    : "Nenum perfil selecionado."
                }                                                
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="danger"
                    onClick={() => {                        
                        props.onHide()
                        resetDataStates();
                    }}
                >
                    Cancelar
                </Button>                
                <Button                    
                    onClick={() => {
                        const userData = validateUser(props.profile[role].user);
                        const profileData = validateProfile(props.profile[role].id);

                        if(userData && profileData) {                            
                            axios.patch(`${apiUrl}/users/${props.profile[role].user.id}/`, userData).then(response => {
                                console.log(response.data);
                                props.updateView(props.profile.id, response.data, null);
                                axios.patch(`${apiUrl}/profiles/${props.profile[role].id}/`, profileData).then(response => {
                                    console.log(response.data);
                                    props.updateView(props.profile.id, null, response.data);
                                }).catch(error => console.log(error));
                            }).catch(error => console.log(error));
                        } else if(userData) {
                            axios.patch(`${apiUrl}/users/${props.profile[role].user.id}/`, userData).then(response => {
                                console.log(response.data);
                                props.updateView(props.profile.id, response.data, null);
                            }).catch(error => console.log(error));
                        } else if(profileData) {
                            axios.patch(`${apiUrl}/profiles/${props.profile[role].id}/`, profileData).then(response => {
                                console.log(response.data);
                                props.updateView(props.profile.id, null, response.data);
                            }).catch(error => console.log(error));
                        }

                        props.onHide();
                        resetDataStates();

                    }}
                >
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ProfileModal;