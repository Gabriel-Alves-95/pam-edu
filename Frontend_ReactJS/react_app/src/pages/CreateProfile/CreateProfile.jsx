import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiUrl, endpointToRoleConverter } from '../../utils';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const CreatePage = () => {
    
    const params = useParams();
    const endpoint = params.endpoint;  
    const role = endpoint.slice(0, -1);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('')
    const [birthday, setBirthday] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');


    const resetDataStates = () => {
        setUsername('');
        setPassword('');
        setEmail('');
        setFirstName('');
        setLastName('');
        setBirthday('');
        setPhoneNumber('');
        setAddress('');
    }

    const validateUser = () => {

        const newUser = {};

        if(username) {
            newUser["username"] = username;
        }

        if(password) {
            newUser["password"] = password;
        }

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

    const createUserByRole = (userJson, profileJson) => {

        console.log(`USER JSON: ${JSON.stringify(userJson)}`);
        console.log(`PROFILE JSON: ${JSON.stringify(profileJson)}`);

        if(userJson) {
            axios.post(`${apiUrl}/users/`, userJson).then(response => {
                console.log(`CRIANDO USER: ${JSON.stringify(response.data)}`);
                const id = response.data.id;
                if(profileJson) {
                    axios.patch(`${apiUrl}/profiles/${id}/`, profileJson).then(response => {
                        console.log(`ATUALIZANDO PROFILE: ${JSON.stringify(response.data)}`);                
                    }).catch(error => {
                        console.log(`Erro ao atualizar Profile. Descrição: ${JSON.stringify(error)}`);                
                    }); 
                }

                const roleJson = {}                
                roleJson[`${role}`] = id;

                console.log(`ROLE JSON: ${JSON.stringify(roleJson)}`);
                
                axios.post(`${apiUrl}/${endpoint}/`, roleJson).then(response => {
                    console.log(response.data);
                }).catch(error => {
                    console.log(`Erro ao adicionar User à Role referene ao endpoint desta url. Descrição: ${JSON.stringify(error)}`);
                })                           
    
            }).catch(error => { 
                console.log(`Erro ao criar User. Descrição: ${JSON.stringify(error)}`);
            });
        }

        console.log('São necessárias mais informações para cadastrar um User.');     
                
    }
    
    return(
        <div className="custom-container">
            <h2 className="custom-header">Cadastrar {`${endpointToRoleConverter(endpoint).singular}`}</h2>                 
            <Form>
                <Form.Group className="mb-3" controlId="formGroupUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
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
                        onChange={(e) => setLastName(e.target.value)}
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
                <Form.Group className="mb-3" controlId="formGroupPhoneNumber">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </Form.Group>                
                <Form.Group className="mb-3" controlId="formGroupAddress">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupBirthday">
                    <Form.Label>Data de Nascimento</Form.Label>
                    <Form.Control
                        type="text"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </Form.Group>
                <div className="button-container-right-alignment">
                    <Button
                        variant="danger"
                        onClick={resetDataStates}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={ () => {
                            const userJson = validateUser();
                            const profileJson = validateProfile();

                            createUserByRole(userJson, profileJson);
                            resetDataStates();
                        }}
                    >
                        Salvar
                    </Button>
                </div>                
            </Form>            
        </div>
    )

};

export default CreatePage;