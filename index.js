const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.static('build'))
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}));

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: true
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: false
    }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  res.send(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = parseInt(request.params.id)
    console.log(id)
    const note = notes.find(note => note.id === id)
    if(note){
    response.json(note)
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }

    notes = notes.concat(note)

    response.json(note)
})

// app.put('/api/notes/:id',(req,res)=>{
//     const id = parseInt(req.params.id)
//     let note = notes.find(note => note.id === id) 
//    // notes = notes.filter(note => note.id !== id)
//     console.log(req.body)
//     const newNote = {
//         id: id,
//         content: req.body.content,
//         important: req.body.important,
//         date: req.body.date,
//     }
//     notes = [...notes,note = newNote]
//     console.log(notes)

// })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})