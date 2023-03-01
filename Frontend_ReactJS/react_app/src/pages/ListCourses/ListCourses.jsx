import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiUrl, computeCycle, computeLevel } from '../../utils';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

const ListCourses = () => {   
          
    const [data, setData] = useState([]);
    const [isContentLoaded, setContentLoaded] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const [name, setName] = useState('');
    const [cycle, setCycle] = useState('');
    const [level, setLevel] = useState('');
    const [teacher, setTeacher] = useState('');
    const [year, setYear] = useState('');   

    const resetDataStates = () => {
        setName('');
        setCycle('');
        setLevel('');
        setTeacher('');
        setYear('');
    }

    const validateCourse = () => {
        const newCourse = {};

        if(name) {
            newCourse["name"] = name;
        }

        if(cycle) {
            newCourse["cycle"] = cycle;            
        }

        if(level) {
            newCourse["level"] = level
        }

        if(teacher) {
            newCourse["teacher"] = teacher;
        }
        
        if(year) {
            newCourse["year"] = year;
        }

        return newCourse;
    }

    const deleteCourse = (id) => {
        axios.delete(`${apiUrl}/courses/${id}/`).then(() => {
            setData(list => list.filter(item => item.id !== id));     
        }).catch(error => console.log(error));
    }

    const updateCourse = (id, courseJson) => {
        axios.patch(`${apiUrl}/courses/${id}/`, courseJson).then(result => {
            setData(list => list.map(item => {
                if(item.id === id) {
                    const courseKeys = ["name", "cycle", "level", "teacher", "year"];                    

                    for(const key of courseKeys) {
                        item[key] = result.data[key];
                    }

                }

                return item;                
            }));            
        }).catch(error => console.log(error));
    }



    useEffect(() => {        
        axios.get(`${apiUrl}/courses/`).then((response) => {
            setData(response.data);
            setContentLoaded(true);            
            console.log(data);            
        }).catch((error) => {
            console.log(error);
        });       
    }, []);

    return (    
        isContentLoaded
        ? data.length === 0
        ? <Alert key="danger" variant="danger" className="custom-container">
                Não há cursos cadastrados.
          </Alert>
        : <div className="custom-container">                       
                <h2 className="custom-header">Listagem de Cursos</h2>
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Ciclo</th>
                        <th>Nível</th>
                        <th>Professor</th>
                        <th>Ano Letivo</th>                
                        <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            data.map((item) => {                
                                return(
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>                        
                                        <td>{computeCycle(item.cycle)}</td>
                                        <td>{computeLevel(item.level)}</td>
                                        <td>{item.teacher.teacher_profile.user.full_name}</td>
                                        <td>{item.year}</td>                        
                                        <td>
                                            <div className="button-container">
                                                <Button
                                                    variant="outline-danger"
                                                    onClick={() => deleteCourse(item.id)}
                                                >
                                                    Deletar
                                                </Button>
                                                <Button
                                                    variant="outline-primary"
                                                    onClick={() => {
                                                        setCurrentCourse(item);
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
                <div className="button-container-right-alignment">
                    <Link to="/create/courses">                    
                        <Button>Cadastrar Curso</Button>                    
                    </Link>            
                </div>
                <Modal            
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={modalShow}
                    onHide={() => {
                        resetDataStates();
                        setModalShow(false)
                    }}
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Editar Curso
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formGroupName">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupCycle">
                                <Form.Label>Ano Letivo</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                />
                            </Form.Group>                            
                        </Form>                        
                        <Alert variant="warning">
                            Apenas os campos que você preencher serão atualizados.
                        </Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="danger"
                            onClick={() => {                        
                                setModalShow(false);
                                resetDataStates();
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => {
                                const newCourse = validateCourse();                                                                
                                updateCourse(currentCourse.id, newCourse);
                                setModalShow(false);
                                resetDataStates();
                            }}
                        >
                            Salvar
                        </Button>
                    </Modal.Footer>
                </Modal>
          </div>
        : <div className="spinner-container">
            <Spinner animation="border" variant="primary" />
        </div>
        
    );
}

export default ListCourses;