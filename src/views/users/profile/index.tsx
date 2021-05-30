import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';
import NoteCard from '../../../components/NoteCard';
import { useToaster } from '../../../hooks/useToaster';
import { GET } from '../../../services/api';
import { Note, Users } from '../../../utils/types';

const Profile = () => {
    const bathBomb = useToaster();
    const { user_id } = useParams<{ user_id: string }>();
    const [demographics, setDemos] = useState<Users>();
    const [notes, setNotes] = useState<Note[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const userInfo = await GET(`/api/users/profile/${user_id}`);
                setDemos(userInfo);

                const userNotes = await GET(`/api/notes/profile`);
                setNotes(userNotes);

                if (userNotes) {
                    setLoaded(true);
                }
            } catch (error) {
                bathBomb({ message: error, type: 'error', time_ms: 3000 });
            }
        })();
    }, [user_id, bathBomb])

    return (
        <div className='d-flex flex-wrap w-100 justify-content-center'>
            {notes.length ? notes?.map(note => (
                <NoteCard content={note.content} key={note?.id} />
            )) : loaded ? <NoteCard content={`# No notes found for user`} /> : <Loader />}
        </div>
    );
}

export default Profile
