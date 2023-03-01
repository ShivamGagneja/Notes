import React, {useEffect, useRef, useState} from 'react'
import { Link } from 'react-router-dom'
import ListItem from '../components/ListItem'

const NotesListPage = () => {

  const dataFetchedRef = useRef(false);
  let [notes, setNotes] = useState([])

  useEffect(() => {
    if (dataFetchedRef.current===false) {
    getNotes();
    }
    dataFetchedRef.current = true;
    getNotes();
  }, [])

  let getNotes = async () => {
    let response = await fetch("/api/notes/");
    let data = await response.json();
    setNotes(data);
  }

  return (
    <div className='notes'>
        <div className='notes-header'>
            <h2 className='notes-title'>&#9782; Notes</h2>
            <p className='notes-count'>{notes.length}</p>
        </div>
      <div className='notes-list'>
        {notes.map((note, index) => (
            <ListItem key = {index} note = {note}/>
        ))}
      </div>
      <Link to = '/note/new'>
        <div className='floating-button' ><img src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/32/null/external-Write-email-tanah-basah-glyph-tanah-basah.png"/></div>
      </Link>
    </div>
  )
}

export default NotesListPage
