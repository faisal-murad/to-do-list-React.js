import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';



const styles = {
    ss: {
        margin: '0%',
        color: 'white',
        textAlign: 'center',
        paddingTop: '2%'
    },
    noteContainer: {
        backgroundColor: 'grey',
        width: '40%',
        borderRadius: '12px',
        margin: 'auto',
        padding: '20px'
    },
    btn: {
        height: '40px',
        width: '100%    ',
        backgroundColor: 'green',
        borderRadius: '12px',
        cursor: 'pointer',
    },
    addNote: {
        marginTop: '20px',
        backgroundColor: '#a12',
        padding: '10px',
        borderRadius: '5px',
        margin: 'auto',
        display: 'none',

    },
    inputNote: {
        display: 'block',
        width: '80%',
        margin: 'auto',
        marginTop: '5px',
        padding: '10px',
        borderRadius: '8px',
        backgroundColor: '#feb5a3'

    },
    btn2: {
        height: '40px',
        width: '100px',
        backgroundColor: 'green',
        borderRadius: '12px',
        margin: '5px',
        color: 'white',
        cursor: 'pointer',

    },
    singleNote: {
        backgroundColor: '#dd8',
        borderRadius: '12px',
        padding: '4px 8px',
        margin: '10px 0',
        flex: '0 0 80%'
    }
}

const ToDoList = () => {
    const [notes, addNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleNewNote = () => {
        document.getElementById('addNoteDiv').style.display = 'block';
    }

    const handleSave = () => {
        // if
        const note = { id: uuidv4(), title: title, description: description };
        addNotes([...notes, note]);
        setTitle('');
        setDescription('');
        document.getElementById('addNoteDiv').style.display = 'none';
        clear();
    }

    const clear = () => {
        document.getElementById('input1').value = '';
        document.getElementById('input2').value = '';
        document.getElementById('inputU1').value = '';
        document.getElementById('inputU2').value = '';
    }

    const handleCancel = () => {
        clear();
        document.getElementById('addNoteDiv').style.display = 'none'
        document.getElementById('addUpdateNoteDiv').style.display = 'none'
    }
 
    const handleDelete = (noteid) =>{
        addNotes(notes.filter((note)=>note.id!=noteid));
    }

    const [id, setId]=useState('');

    const handleUpdateSave = () =>
    { 
        const updatedNotes = notes.map(note=>{
            if(note.id===id)
            {
                return{...note, title: document.getElementById('inputU1').value, description: document.getElementById('inputU2').value}
            }
            return note;
        })

        addNotes(updatedNotes);
        document.getElementById('addUpdateNoteDiv').style.display='none';       

    }

    const handleUpdate=(id)=>{
        clear();
        document.getElementById('addUpdateNoteDiv').style.display = 'block';
        const mynote = notes.find((note)=>note.id===id);
        document.getElementById('inputU1').value = mynote.title;
        document.getElementById('inputU2').value = mynote.description;
        setId(id);
        
    } 

    return (
        <div style={{ backgroundColor: 'black', width: '100%', height: '100vh' }}>
            <h1 style={styles.ss} onClick={() => console.log(notes)}>To-Do-List</h1>
            <br />
            <div style={styles.noteContainer}>
                <button style={styles.btn} onClick={() => handleNewNote()}>Add new Note</button>
                <div style={styles.addNote} id='addNoteDiv'>
                    <h4 style={{ textAlign: 'center' }}>New Note</h4>
                    <input id='input1' style={styles.inputNote} type='text' placeholder='Enter note title' onChange={(e) => setTitle(e.target.value)} />
                    <input id='input2' style={{ ...styles.inputNote, height: '50px' }} type='text' placeholder='Enter note description' onChange={(e) => setDescription(e.target.value)} />
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '15px' }}>
                        <button style={{ ...styles.btn2, backgroundColor: 'red' }} onClick={() => handleCancel()}>Cancel</button>
                        <button style={styles.btn2} onClick={() => handleSave()}>Save</button>
                    </div>
                </div>
                <div style={styles.addNote} id='addUpdateNoteDiv'>
                    <h4 style={{ textAlign: 'center' }}>Update Note</h4>
                    <input id='inputU1' style={styles.inputNote} type='text' placeholder='Enter note title' onChange={(e) => setTitle(e.target.value)} />
                    <input id='inputU2' style={{ ...styles.inputNote, height: '50px' }} type='text' placeholder='Enter note description' onChange={(e) => setDescription(e.target.value)} />
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '15px' }}>
                        <button style={{ ...styles.btn2, backgroundColor: 'red' }} onClick={() => handleCancel()}>Cancel</button>
                        <button style={styles.btn2} onClick={() => handleUpdateSave()}>Save</button>
                    </div>
                </div>
                <div>
                    {notes.map(mynote => {
                        return(
                        <div style={{ display: 'flex' }}>

                            <div style={styles.singleNote} key={mynote.id}>
                                <h3 style={{ padding: '0 0', margin: '0 0' }}>{mynote.title}</h3>
                                <p style={{ padding: '0 0', margin: '0 0' }}>{mynote.description}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-around', backgroundColor: '#aa9', height: '50px', alignSelf: 'center', marginLeft: '15px', borderRadius: '10px' }}>
                                <h6 style={{ padding: '0 0', margin: '0 0', color: 'black', cursor: 'pointer' }} onClick={()=>handleUpdate(mynote.id)}>Update</h6>
                                <h6 style={{ padding: '0 0', margin: '0 0', color: 'red', cursor: 'pointer' }} onClick={()=>handleDelete(mynote.id)}>Delete</h6>
                            </div>
                        </div>)
                    })} 
                </div>
            </div>
        </div>
    )
}
export default ToDoList;
