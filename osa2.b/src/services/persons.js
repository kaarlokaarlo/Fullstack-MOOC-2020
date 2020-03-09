import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons/'

const getAll = () =>{
    return axios.get(baseUrl)//.then(response=>response.data)
}

const create = newPerson => {
    return axios.post(baseUrl,newPerson)//.then(response=>response.data)
}

const deletePerson = id =>{
    const urli = baseUrl + id
    const ta = axios.delete(urli).then(response=>response.data)
    return ta
}

const update = (id,newNumber) =>{
    const urli = baseUrl + id
    const ta = axios.put(urli, newNumber)//.then(response =>response.data)
    return ta
}

export default { getAll , create , deletePerson , update }