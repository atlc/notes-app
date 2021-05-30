import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
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
        Promise.all([GET(`/api/users/profile/${user_id}`), GET(`/api/notes/profile`)])
            .then(values => {
                setDemos(values[0]);
                setNotes(values[1])
            })
            .then(() => setLoaded(true))
            .catch(error => bathBomb({ message: error, type: 'error', time_ms: 3000 }));
    }, [user_id, bathBomb])


    if (!loaded) return (
        <h1 className="text-warning">Lmao loader component</h1>
    )


    return (
        <div className='rounded-3 col-sm-10 col-md-6 col-lg-4 p-5 shadow border-2' style={{ "backgroundColor": "#dadfdf" }}>
            <div className="card">
                <h1>@{demographics?.username}</h1>
                <span><img className="border rounded-circle" src={demographics?.avatar} alt="" /></span>
            </div>


            <h3>Notes:</h3>
            {/* {notes && notes?.map(note => (
                <div key={note?.id}>
                    {note?.content}
                </div>
            ))} */}
        </div>
    );
}

export default Profile
