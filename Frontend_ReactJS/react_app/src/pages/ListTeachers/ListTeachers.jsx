import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiUrl, dateMask, datetimeMask, endpointToRoleConverter } from '../../utils';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import ProfileModal from '../../components/ProfileModals/ProfileModal';

const ListTeachers = () => {         
    const [data, setData] = useState([]);
    const [isContentLoaded, setContentLoaded] = useState(false);
    const [currentProfile, setCurrentProfile] = useState(false);    
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {        
        axios.get(`${apiUrl}/teachers/`).then((response) => {
            setData(response.data);
            setContentLoaded(true);            
            console.log(data);            
        }).catch((error) => {
            console.log(error);
        });       
    }, []);

    const deleteTeacher = (user_id, teacher_id) => {
        console.log(teacher_id);
        axios.delete(`${apiUrl}/users/${user_id}/`).then(() => {
            setData(list => list.filter(item => item.id !== teacher_id));            
        }).catch((error) => {
            console.log(error);
        });               
    }    

    return (    
        isContentLoaded
        ? data.length === 0
            ? <Alert key="danger" variant="danger" className="custom-container">
                    Não há professores cadastrados.
              </Alert>
            : <div className="custom-container">
                    <h2 className="custom-header">Listagem de {`${endpointToRoleConverter("teachers").plural}`}</h2>
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
                                            <td>{item.teacher.user.first_name}</td>                        
                                            <td>{item.teacher.user.last_name}</td>
                                            <td>{item.teacher.user.email}</td>
                                            <td>{item.teacher.address}</td>
                                            <td>{item.teacher.phone_number}</td>
                                            <td>{item.teacher.birthday ? dateMask(item.teacher.birthday) : null}</td>
                                            <td>{datetimeMask(item.teacher.created_at)}</td>
                                            <td>{datetimeMask(item.teacher.updated_at)}</td>                        
                                            <td>
                                                <div className="button-container">
                                                    <Button
                                                        variant="outline-danger"
                                                        onClick={() => deleteTeacher(item.teacher.user.id, item.id)}
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
                        endpoint="teachers"
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
                                            item.teacher.user[key] = userJson[key];
                                        }
                                    }

                                    if(profileJson) {
                                        for(const key of profileKeys) {
                                            item.teacher[key] = profileJson[key];
                                        }
                                    }
                                }
                                
                                return item;                        
                            }));                    
                        }}
                    />
                    <div className="button-container-right-alignment">
                        <Link to="/create/teachers">                    
                            <Button>Cadastrar Professor</Button>                    
                        </Link>            
                    </div>
              </div>
        : <div className="spinner-container">
            <Spinner animation="border" variant="primary" />
        </div>    
    );
}

export default ListTeachers;