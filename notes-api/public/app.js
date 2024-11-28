const API_URL = "http://localhost:3001/notes";

// fethching all notes and display them.
async function fetchNotes(){
    const response= await fetch(API_URL);
    const notes = await response.json();
    renderedNotes(notes);
}

// render the notes on the pages.

function renderedNotes(notes){
    const notesContainer = document.getElementById("notes-container");
    notesContainer.innerHTML="";

    notes.forEach(note =>{
        const noteDiv= document.createElement("div");
        noteDiv.classList.add("note");
        noteDiv.innerHTML = `<h2>${note.title}</h2>
        <p>${note.content}</p>
        <button onclick="deleteNote('${note.id}')">Delete</button>`;
        notesContainer.appendChild(noteDiv);
    });

    // Adding new note.

    document.getElementById("note-form").addEventListener("submit", async(e)=>{
        e.preventDefault();
        const title = document.getElementById("note-title").value;
        const content = documment.getElementById("note-content").value;

         const response = await fetch(API_URL, {
            method: "POST",
            headers: {"content-type": "Application/json"},
            body: JSON.stringify({title, content}),
        });

        if(response.ok) {
            fetchNotes(); // Referece the notes
            e.target.reset(); // clear form
        }
    });

    //  Delete a note

        async function deleteNotes(id) {
            await fetch(`${API_URL}/£{id}`, {method: "DELETE"});
            fetchNotes(); // referece the notes

        }

    // search notes 
    document.getElementById("search-bar").addEventListener("input", async (e) =>{
        const query = e.target.value;
        const response = await fetch (`${API_URL}/search?query=${query}`);
        const notes=await response.json();
        renderedNotes(notes);
    })    

    // intial featch of the notes
    fetchNotes();
}