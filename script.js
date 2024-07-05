function addNote() {
    const noteText = document.getElementById('noteInput').value.trim();
    if (noteText === '') return;
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

    const note = {
        id: new Date().getTime(),
        text: noteText,
        timestamp: new Date().toLocaleString("en-GB", options)  // Adding timestamp
    };

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));

    displayNotes();
    document.getElementById('noteForm').reset();
}

function deleteNote(id) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

function displayNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const notesContainer = document.getElementById('notesContainer');
    const noNotesMessage = document.getElementById('noNotesMessage');

    notesContainer.innerHTML = '';

    if (notes.length === 0) {
        noNotesMessage.style.display = 'block';
    } else {
        noNotesMessage.style.display = 'none';

        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'rounded border-left border-bottom text-wrap alert alert-dismissible fade show mt-2';
            noteElement.setAttribute('role', 'alert');
            noteElement.innerHTML = `
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="deleteNote(${note.id})">
                    <span aria-hidden="true">&times;</span>
                </button>
                ${note.text}
                <br><small class="text-muted">${note.timestamp}</small>
            `;
            notesContainer.appendChild(noteElement);
        });
    }
}

document.getElementById('noteForm').addEventListener('submit', function (event) {
    event.preventDefault();
    addNote();
});

displayNotes();