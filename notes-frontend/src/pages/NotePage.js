import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {

    let params = useParams();
    let nav = useNavigate();
    let [note, setNote] = useState([])

    useEffect(() => {
        getNote();
    }, [params.id])

let getNote = async () => {
    if(params.id === 'new') {return}

    let response = await fetch(`/api/notes/${params.id}/`)
    let data = await response.json()
    setNote(data)
}

let createNote = async () => {
    fetch(`/api/notes/create/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    })
}

let updateNote = async () => {
    fetch(`/api/notes/${params.id}/update/`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    })
}

let deleteNote = async () => {
    fetch(`/api/notes/${params.id}/delete/`, {
        method: 'DELETE',
        'headers': {
            'Content-Type': 'application/json'
        }
    })
    nav('/')
}

let handleSubmit = () => {
    console.log('NOTE:', note)
    if (params.id === 'new'){
        if(note.body === undefined){
            nav('/');
        }else{
            createNote();
        }
    }else if(note.body===''){
        deleteNote();
    }else{
        updateNote();
    }
    nav('/');
}

let handleChange = (value) => {
    setNote(note => ({ ...note, 'body': value }))
    console.log('Handle Change:', note)
}

return (
    <div className="note" >
        <div className="note-header">
            <h3>
                <ArrowLeft onClick={handleSubmit} />
            </h3>
            {params.id !== 'new' ? (
                <button onClick={deleteNote}>Delete</button>
            ) : (
                <button onClick={handleSubmit}>Done</button>
            )}

        </div>
        <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>
    </div>
)
}

export default NotePage
