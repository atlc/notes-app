import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm';
import { useToaster } from '../../hooks/useToaster';
import { POST } from '../../services/api';

const Create = () => {
    const [content, setContent] = useState('');
    const bathBomb = useToaster();
    const updateContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const res = await POST('/api/notes', { content });
            bathBomb({ message: res });
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
                <textarea className="form-control" rows={8} placeholder='Start typing your note here!' onChange={updateContent} />
                <div className="justify-content-center mt-1">
                    <p className="form-text text-muted"><a className="badge" style={{ "backgroundColor": "#2f4f4f", "color": "#dadfdf" }} href="https://www.markdownguide.org/cheat-sheet/#basic-syntax">Markdown</a> is supported for some fancy styling!</p>
                    {content &&
                        <button style={{ "backgroundColor": "#2f4f4f", "color": "#dadfdf" }} className="mt-2 btn" onClick={handleSubmit}>
                            Submit Note
                        </button>}
                </div>
            </div>
        </div>
    )
}

export default Create
