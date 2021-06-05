import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import NoteCard from '../../components/NoteCard';

const Details = () => {
    const location = useLocation();
    const [content, setContent] = useState('');
    const [editId, setEditId] = useState('');

    useEffect(() => {
        if (location.state) {
            //@ts-ignore
            setContent(location.state.content);
            //@ts-ignore
            setEditId(location.state.id);
        }
    }, [location.state])


    return (
        <NoteCard content={content} id={editId} />
    )
}

export default Details;