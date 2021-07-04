const express = require('express')
const PORT = process.env.PORT || 3001;
const app = express()
const fs = require('fs')
const path = require('path')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
const {notes} = require('./db/db.json')



//post a new note
app.post('/api/notes', (req, res) => {
    req.body.id = Number((notes.length).toString())
    const newNote = req.body
    saveNote(newNote)
    res.json(newNote)
});
//landing page display
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});
//notes display, add new note page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});
//list all notes in json
app.get('/api/notes', (req, res) => {
    res.json(notes)
})
//sort by id
app.get('/notes/:id', (req,res) => {
    console.log(req.params.id)
    const result = findId(req.params.id, notes)
    console.log(result)
    if(result){
        res.json(result)
    } else {
        res.sendStatus(404)
    }
})




app.listen(PORT, () => {
    console.log('API server now on port 3000');
})