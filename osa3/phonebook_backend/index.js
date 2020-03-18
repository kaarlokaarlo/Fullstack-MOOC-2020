const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json()) 
app.use(cors())


const logger = 'tiny' 
app.use(morgan(logger))


let persons = [
    {
       name: "Arto Hellas",
       number: "040-1234" ,
       id: 1 
    },
    {
        name: "Ada Lovelace",
        number: "009-2323",
        id: 2 
     }, 
     {
        name: "Dan Abramov",
        number: "0234-155534" ,
        id: 3 
     },
     {
        name: "Mary Poppendieck",
        number: "39-23-3284844" ,
        id: 4
     }
]

app.get('/api/persons', (req, res) => {
  res.end(JSON.stringify(persons))
})

app.get('/info', (req, res) =>{
    
    const date = Date() //new Date().toDateString()
    res.send(
`<p>Phonebook has info of ${persons.length} people</p>` + '<br />' +  date)
})


app.get('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
   
    if(person) res.json(person)
    else res.status(404).end()
    
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) =>{
    const person = req.body
    
    if(person.name.length<1){ 
        res.status(400).json({
            error: 'name missing'
        })
    }
    if(person.number.length<1){
        res.status(400).json({
            error: 'number missing'
        })
    }
    if(persons.find(p => p.name === person.name)){
        res.status(400).json({
            error: 'name must be unique'
        })
    }

    const iide = (Math.floor(Math.random()*50*Math.ceil(persons.length)))
    person.id = iide

    res.json(person)   
    console.log(JSON.stringify(person))
    
})

const port = process.env || 3001
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})



