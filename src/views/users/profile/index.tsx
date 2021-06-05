import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';
import NoteCard from '../../../components/NoteCard';
import { useToaster } from '../../../hooks/useToaster';
import { GET } from '../../../services/api';
import { Note } from '../../../utils/types';

const Profile = () => {
    const bathBomb = useToaster();
    const { user_id } = useParams<{ user_id: string }>();
    // const [demographics, setDemos] = useState<Users>();
    const [notes, setNotes] = useState<Note[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [shouldReloadProfile, setReload] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                // const userInfo = await GET(`/api/users/profile/`);
                // setDemos(userInfo);

                const userNotes = await GET(`/api/notes/profile`);
                setNotes(userNotes);
                setLoaded(userNotes || true);
            } catch (error) {
                bathBomb({ message: error, type: 'error', time_ms: 3000 });
            }
        })();
    }, [user_id, shouldReloadProfile])


    const toggleReload = (e: React.MouseEvent<HTMLButtonElement>) => setReload(!shouldReloadProfile);

    if (!loaded) return <Loader />

    return (
        <div className='d-flex flex-wrap w-100 col-xs-11 col-sm-10 col-md-8 justify-content-around'>
            {notes?.length ? notes?.map(note => (
                <NoteCard key={note.id} reloadTrigger={toggleReload} isPinned={note.pinned === 1 ? true : false} allowIcons content={note.content} isPreview id={note.id} />
            )) : loaded && <NoteCard allowIcons={false} reloadTrigger={toggleReload} content={`No notes? Create some!`} />}
        </div>
    );
}

export default Profile;
