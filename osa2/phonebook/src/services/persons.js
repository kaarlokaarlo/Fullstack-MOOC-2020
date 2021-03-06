import axios from 'axios'

const baseUrl = '/api/persons/'//'http://localhost:3001/api/persons/'

const getAll = () =>{
    return axios.get(baseUrl)//.then(response=>response.data)
}

const create = newPerson => {
    return axios.post(baseUrl,newPerson)//.then(response=>response.data)
}

const deletePerson = (id) =>{
return axios.delete(`${baseUrl}${id}`)//then(response=>response.data)

}

const update = (id,newNumber) =>{
    const urli = baseUrl + id
    const ta = axios.put(urli, newNumber)//.then(response =>response.data)
    return ta
}

export default { getAll , create , deletePerson , update }
