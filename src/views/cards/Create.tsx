import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm';
import { useToaster } from '../../hooks/useToaster';
import { POST, PUT } from '../../services/api';
import { get_user_id } from '../../hooks/useCheckAuth';

const Create = () => {
    const location = useLocation();
    const history = useHistory();
    const [content, setContent] = useState('');
    const [editId, setEditId] = useState('');

    const user_id = get_user_id();

    useEffect(() => {
        if (location.state) {
            //@ts-ignore
            setContent(location.state.content);
            //@ts-ignore
            setEditId(location.state.id);
        }
    }, [location.state])


    const bathBomb = useToaster();
    const updateContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            if (editId) {
                const res = await PUT(`/api/notes/${editId}`, { content });
                bathBomb({ message: res.message }).then(() => history.push(`/profile/${user_id}`));
            } else {
                const res = await POST('/api/notes', { content });
                bathBomb({ message: res.message }).then(() => history.push(`/profile/${user_id}`));
            }
        } catch (error) {
            bathBomb({ message: error, type: 'error' });
        }
    }

    return (
        <div className='d-flex justify-content-center rounded-3 col-sm-10 col-md-6 col-lg-4 p-5 shadow border-2' style={{ "backgroundColor": "#dadfdf" }}>
            <div className="card-body">
                {content &&
                    <>
                        <h4>Output:</h4>
                        <div style={{ border: "1px solid #2f4f4f", borderRadius: "10%", backgroundColor: "#b5c1c0" }} className="rounded-3 p-2 shadow-sm mb-2">

                            <ReactMarkdown className='mb-3' remarkPlugins={[gfm]}>
                                {content}
                            </ReactMarkdown>
                        </div></>}
                <textarea className="form-control" value={content} rows={8} placeholder='Start typing your note here!' onChange={updateContent} />
                <div className="justify-content-center mt-1">
                    <p className="form-text text-muted"><a className="badge" style={{ "backgroundColor": "#2f4f4f", "color": "#dadfdf" }} href="https://www.markdownguide.org/cheat-sheet/#basic-syntax">Markdown</a> is supported for some fancy styling!</p>
                    {content &&
                        <button style={{ "backgroundColor": "#2f4f4f", "color": "#dadfdf" }} className="mt-2 btn" onClick={handleSubmit}>
                            {editId ? 'Save edits' : 'Submit Note'}
                        </button>}
                </div>
            </div>
        </div>
    )
}

export default Create
