import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiUrl, dateMask, datetimeMask, endpointToRoleConverter } from '../../utils';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import ProfileModal from '../../components/ProfileModals/ProfileModal';

const ListAdults = () => {         
    const [data, setData] = useState([]);
    const [isContentLoaded, setContentLoaded] = useState(false);
    const [currentProfile, setCurrentProfile] = useState(false);    
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {        
        axios.get(`${apiUrl}/adults/`).then((response) => {
            setData(response.data);
            setContentLoaded(true);            
            console.log(data);            
        }).catch((error) => {
            console.log(error);
        });       
    }, []);

    const deleteAdult = (user_id, adult_id) => {
        console.log(adult_id);
        axios.delete(`${apiUrl}/users/${user_id}/`).then(() => {
            setData(list => list.filter(item => item.id !== adult_id));            
        }).catch((error) => {
            console.log(error);
        });               
    }

    return (    
        isContentLoaded
        ? data.length === 0
        ? <Alert key="danger" variant="danger" className="custom-container">
                Não há responsáveis cadastrados.
            </Alert>
        : <div className="custom-container">
                <h2 className="custom-header">Listagem de {`${endpointToRoleConverter("adults").plural}`}</h2>
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Email</th>
                        <th>Endereço</th>
                        <th>Telefone</th>
                        <th>Data de Nascimento</th>
                        <th>Criado em</th>
                        <th>Atualizado em</th>
                        <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            data.map((item) => {                
                                return(
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.adult.user.first_name}</td>                        
                                        <td>{item.adult.user.last_name}</td>
                                        <td>{item.adult.user.email}</td>
                                        <td>{item.adult.address}</td>
                                        <td>{item.adult.phone_number}</td>
                                        <td>{item.adult.birthday ? dateMask(item.adult.birthday) : null}</td>
                                        <td>{datetimeMask(item.adult.created_at)}</td>
                                        <td>{datetimeMask(item.adult.updated_at)}</td>                        
                                        <td>
                                            <div className="button-container">
                                                <Button
                                                    variant="outline-danger"
                                                    onClick={() => deleteAdult(item.adult.user.id, item.id)}
                                                >
                                                    Deletar
                                                </Button>
                                                <Button 
                                                    variant="outline-primary"
                                                    onClick={() => {
                                                        setCurrentProfile(item);
                                                        setModalShow(true);
                                                    }}
                                                >
                                                    Editar
                                                </Button>
                                            </div>            
                                        </td>
                                    </tr>
                                );
                            })
                        }        
                    </tbody>
                </Table>
                <ProfileModal
                    endpoint="adults"
                    profile={currentProfile}
                    show={modalShow}                
                    onHide={() => setModalShow(false)}
                    updateView={(id, userJson, profileJson) => {                   
                        setData(list => list.map(item => {
                            if(item.id === id) {                            
                                const userKeys = ["first_name", "last_name", "email"];
                                const profileKeys = ["address", "phone_number", "birthday", "updated_at"];

                                if(userJson) {
                                    for(const key of userKeys) {
                                        item.adult.user[key] = userJson[key];
                                    }
                                }

                                if(profileJson) {
                                    for(const key of profileKeys) {
                                        item.adult[key] = profileJson[key];
                                    }
                                }
                            }
                            
                            return item;                        
                        }));                    
                    }}                
                />
                <div className="button-container-right-alignment">
                    <Link to="/create/adults">                    
                        <Button>Cadastrar Responsável</Button>                    
                    </Link>            
                </div>
            </div>    
        : <div className="spinner-container">
            <Spinner animation="border" variant="primary" />
        </div>    
    );
}

export default ListAdults;