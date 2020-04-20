const mongoose = require('mongoose');


if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://user:${password}@cluster0-sttvt.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
    content: 'HTML is Easy',
    date: new Date(),
    important: true,
})

const note1 = new Note({
    content: 'Good Morning',
    date: new Date(),
    important: false,
})

const note2 = new Note({
    content: 'I love my life',
    date: new Date(),
    important: true,
})

// Note.create(note, note1, note2).then(response => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })

Note.find({important:true}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})
