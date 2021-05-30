import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const NoteCard = ({ content }: NoteCardProps) => {
    return (
        <div className='card'>
            <div className="card-header">Note</div>
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
