const notesContainer = document.getElementById("app");
const addNoteButton = document.querySelector(".add-note");

getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());
function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty note";

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Are you sure you want to delete this note??");
        if (doDelete) {
            deleteNote(id, element);
        }
    });

    return element;
}

function addNote() {
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 1000000),
        content: "",
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);
}

function updateNote(id, newContent) {
    let notes = getNotes();
    console.log("Before update:", notes);

    const targetNoteIndex = notes.findIndex(note => note.id === id);

    if (targetNoteIndex !== -1) {
        notes[targetNoteIndex].content = newContent;
        saveNotes(notes);
        console.log("After update:", getNotes());
    } else {
        console.error("Note not found for update");
    }
}

function deleteNote(id, element) {
   const notes = getNotes().filter(note=> note.id!=id);
   saveNotes(notes);
   notesContainer.removeChild(element);
}