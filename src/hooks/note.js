import { useEffect, useState } from 'react'
import { noteService }         from "../services";

export const useNotes = () => {

  const [notes, setNotes] = useState([]);
  const [code, setCode] = useState([]);
  const [note, setNote] = useState({});
  const [inUse, setInUse] = useState({});

  const getNotes = (op) => {
    noteService()
      .getNotes(op)
      .then(res => {
        setNotes(res)
      })
      .catch(err => {
        setNotes([])
      })
  };

  useEffect(() => {
    getNotes()
  }, []);

  const timer = 500;

  const addNote = (pramNote) => {
    setInUse(previous => ({...previous, addNote: true}));
    noteService()
      .addNote(pramNote || note)
      .then(() => {
        setNote({});
        getNotes();
        setTimeout(() => {
          setInUse(previous => ({...previous, addNote: false, setNote: false}));
        }, timer)
      })
  };

  const save = (pramNote) => {
    setInUse(previous => ({...previous, save: true, setNote: false}));
    const tmp = pramNote || note;
    if (tmp.id) {
      updateNote(tmp)
    } else {
      addNote(tmp)
    }
    setTimeout(() => {
      setInUse(previous => ({...previous, save: false}));
    }, timer)
  };

  const next = () => {
    noteService()
    .getNotes(1).then(res => {
      setNotes(res)
    })
};

  const prev = () => {
    noteService()
    .getNotes(2).then(res => {
      setNotes(res)
    })
};

const filter = (code) => {
  noteService()
  .filter(code).then(res => {
    setNotes(res)
  })
};

const orderbyid = () => {
  noteService()
  .order(1).then(res => {
    setNotes(res)
  })
};

const orderbynote = () => {
  noteService()
  .order(3).then(res => {
    setNotes(res)
  })
};

  const updateNote = (pramNote) => {
    setInUse(previous => ({...previous, updateNote: true}));
    noteService()
      .updateNote(pramNote || note)
      .then(() => {
        setNote({});
        getNotes();
        setTimeout(() => {
          setInUse(previous => ({...previous, updateNote: false, setNote: false}));
        }, timer)
      })
  };

  const deleteNote = (id) => {
    setInUse(previous => ({...previous, deleteNote: true}));
    noteService()
      .deleteNote(id || note?.id)
      .then(() => {
        getNotes();
        setTimeout(() => {
          setInUse(previous => ({...previous, deleteNote: false}));
        }, timer)
      })
  };

  const clearNotes = () => {
    setInUse(previous => ({...previous, clearNotes: true}));
    noteService()
      .clearNotes()
      .then(() => {
        getNotes();
        setTimeout(() => {
          setInUse({});
        }, timer)
      })
  };

  return {
    code,
    notes,
    note,
    next,
    prev,
    orderbyid,
    orderbynote,
    filter,
    setNote,
    getNotes,
    save,
    deleteNote,
    clearNotes,
    inUse,
    setInUse
  }
};