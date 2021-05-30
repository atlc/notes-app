import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NoteCard from '../../../components/NoteCard';
import { useToaster } from '../../../hooks/useToaster';
import { GET } from '../../../services/api';
import { Note, Users } from '../../../utils/types';

const Profile = () => {
    const bathBomb = useToaster();
    const { user_id } = useParams<{ user_id: string }>();
    const [demographics, setDemos] = useState<Users>();
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        GET(`/api/users/profile/${user_id}`)
            .then(res => setDemos(res))
            .catch(error => bathBomb({ message: error, type: 'error', time_ms: 3000 }));

        GET(`/api/notes/profile`)
            .then(res => setNotes(res))
            .catch(error => bathBomb({ message: error, type: 'error', time_ms: 3000 }));

    }, [user_id, bathBomb])

    return (
        <div className='rounded-3 col-sm-10 col-md-6 col-lg-4 p-5 shadow border-2' style={{ "backgroundColor": "#dadfdf" }}>
            <div className="card">
                <h1>@{demographics?.username}</h1>
                <span><img style={{ height: "75px", width: "75px" }} className="border rounded-circle" src={demographics?.avatar} alt="" /></span>
            </div>


            <h3>Notes:</h3>
            {notes?.map(note => (
                <NoteCard content={note.content} key={note?.id} />
            ))}
        </div>
    );
}

export default Profile
