import axios from 'axios';

const apiUrl = "http://localhost:8000/api";

export const loadContent = (endpoint) => {
    let data;
    axios.get(`${apiUrl}/${endpoint}/`).then((response) => {
        data = response.data
        console.log(data);            
    }).catch((error) => {
        data = {
            "messsage": "Erro ao carregar conteúdo."
        }
        console.log(error);
    });   

    return data;
}