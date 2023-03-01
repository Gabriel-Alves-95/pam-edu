import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../utils";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from "react-bootstrap/esm/Spinner";
import Alert from 'react-bootstrap/Alert';

const CreateCourse = () => {
    
    const [isContentLoaded, setContentLoaded] = useState(false);
    const [choosenTeacher, setChoosenTeacher] = useState('');

    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [cycle, setCycle] = useState(1);    
    const [level, setLevel] = useState('1');
    const [teachers, setTeachers] = useState([]);

    const resetDataStates = () => {
        setName('');
        setYear('');        
        setCycle('');
        setLevel('');        
    };   

    useEffect(() => {
        axios.get(`${apiUrl}/teachers/`).then(response => {
            setTeachers(response.data);
            setContentLoaded(true);
        }).catch(error => {
            console.log(`Erro ao carregar professores. Descrição: ${JSON.stringify(error)}`);
        })
    });

    return(
        isContentLoaded
        ? teachers.length === 0
          ? <Alert key="danger" variant="danger" className="custom-container">
                Não há professores cadastrados. Cadastre professores primeiro e volte depois para cadastrar cursos.
            </Alert> 
          : <div className="custom-container">
                <h2 className="custom-header">Cadastrar Curso</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupName">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupYear">
                        <Form.Label>Ano Letivo</Form.Label>
                        <Form.Control
                            type="text"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupCycle">
                        <Form.Label>Ciclo</Form.Label>
                        <Form.Select
                            size="lg"
                            onChange={(e) => {
                                setCycle(e.target.value)
                            }}
                        >
                            <option value="1">Pré-Escola</option>
                            <option value="2">Fundamental I</option>
                            <option value="3">Fundamental II</option>
                            <option value="4">Ensino Médio</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupLevel">
                        <Form.Label>Nível</Form.Label>
                        <Form.Select
                            size="lg"
                            onChange={(e) => {
                                setLevel(e.target.value)
                            }}
                        >
                            <option value="1">Jardim 1</option>
                            <option value="2">Jardim 2</option>
                            <option value="3">Jardim 3</option>
                            <option value="4">1º Ano</option>
                            <option value="5">2º Ano</option>
                            <option value="6">3º Ano</option>
                            <option value="7">4º Ano</option>
                            <option value="8">5º Ano</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupTeacher">
                        <Form.Label>Professor</Form.Label>
                        <Form.Select
                            size="lg"
                            onChange={(e) => setChoosenTeacher(e.target.value)}
                        >
                            {
                                teachers.map(teacher => {
                                    return(
                                        <option key={teacher.id} value={teacher.id}>
                                            {teacher.teacher.user.first_name} {teacher.teacher.user.last_name}
                                        </option>                                    
                                    );
                                })
                            }
                        </Form.Select>
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
                                const courseJson = {
                                    name,
                                    "year": year ? year : null,
                                    cycle, 
                                    level,
                                    "teacher": choosenTeacher

                                }
                                axios.post(`${apiUrl}/courses/`, courseJson).then(response => { 
                                    console.log(response.data);
                                }).catch(error => {
                                    console.log(`Erro ao criar curso. Descrição: ${JSON.stringify(error)}`);
                                    console.log(`Erro ao criar curso. Descrição: ${JSON.stringify(error.response)}`);
                                    console.log(`Erro ao criar curso. Descrição: ${JSON.stringify(error.response.data)}`);
                                });                                
                                resetDataStates();
                            }}
                        >
                            Salvar
                        </Button>
                    </div>
                </Form>

            </div>
        : <div className="spinner-container">
            <Spinner animation="border" variant="primary" />
          </div>
    );

}

export default CreateCourse;