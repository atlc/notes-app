import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const NoteCard = ({ content }: NoteCardProps) => {
    return (
        <div className='d-flex flex-wrap rounded-3 col-sm-10 col-md-6 col-lg-4 p-5 shadow border-2' style={{ "backgroundColor": "#dadfdf" }}>
            <div className="card-body">
                <ReactMarkdown remarkPlugins={[gfm]}>
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    )
}

interface NoteCardProps {
    content: string;
}


export default NoteCard;
