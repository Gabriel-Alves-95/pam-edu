const apiUrl = "http://localhost:8000/api";

const cycleDict = [
    {id: 1, name: "Pré-Escola"},
    {id: 2, name: "Fundamental I"},
    {id: 3, name: "Fundamental II"},
    {id: 4, name: "Ensino Médio"}
]

const levelDict = [
    {id: 1, name: "Jardim I"},
    {id: 2, name: "Jardim II"},
    {id: 3, name: "Jardim III"},
    {id: 4, name: "1º Ano"},
    {id: 5, name: "2º Ano"},
    {id: 6, name: "3º Ano"},
    {id: 7, name: "4º Ano"},
    {id: 8, name: "5º Ano"}
]

const computeCycle = (cycle) => {
    const result = cycleDict.find((item) => item.id === cycle);
    return result.name;
}    

const computeLevel = (level) => {
    const result = levelDict.find((item) => item.id === level);
    return result.name;
}

const dateMask = (date_string) => {
    const date = date_string.split("-");    
    return `${date[2]}-${date[1]}-${date[0]}`;
}

const datetimeMask = (string_datetime) => {
    const date = new Date(string_datetime);
    const day = `0${date.getDate()}`.slice(-2);        
    const month = `0${parseInt(date.getMonth()) + 1}`.slice(-2);        
    return `${day}-${month}-${date.getFullYear()}`;
}

const endpointToRoleConverter = (endpoint) => {
    const dict = [
        {
            "endpoint": "teachers", 
            "role": {
                "singular": "Professor",
                "plural": "Professores"
            }
        },
        {
            "endpoint": "adults",
            "role": {
                "singular": "Responsável",
                "plural": "Responsáveis"
            }
        },
        {
            "endpoint": "students",
            "role": {
                "singular": "Estudante",
                "plural": "Estudantes"
            }
        }        
    ];

    const result = dict.find(item => item.endpoint === endpoint);
    return result.role;
}

module.exports = {
    apiUrl,
    computeCycle,
    computeLevel,
    dateMask,
    datetimeMask,
    endpointToRoleConverter
}
