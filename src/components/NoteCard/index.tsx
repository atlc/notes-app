import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { AiFillEdit } from 'react-icons/ai';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import { FcBinoculars } from 'react-icons/fc';
import { GrNotes } from 'react-icons/gr';
import Swal from 'sweetalert2';
import { DELETE } from '../../services/api';
import { useToaster } from '../../hooks/useToaster';

const NoteCard = ({ id, content, deleteTrigger, allowIcons = true, isPreview = false }: NoteCardProps) => {
    const bathBomb = useToaster();

    const handleDeletePrompt = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        Swal.fire({
            title: 'Permanently delete this note?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            iconColor: '#4f6a6a',
            background: '#b5c1c0',
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonColor: '#4f6a6a',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I understand!'
        })
            .then(res => {
                if (res.isConfirmed) {
                    DELETE(`/api/notes/${id}`)
                        .then(res => {
                            deleteTrigger();
                            bathBomb({ message: 'The note was deleted successfully. ' });
                        })
                }
            })
    }

    const TinyText = (text: string) => <p className="text-muted" style={{ fontSize: "0.6rem"}}>{text}</p>


    return (
        <div className='my-2 rounded-3 p-3 shadow border-2' style={{ "backgroundColor": "#dadfdf" }}>
            <div className="card-body">
                {isPreview && <div className='d-flex justify-content-end'>
                    <Link to={{ pathname: '/details', state: { id, content } }}> <button style={{ color: "#4f6a6a", fontSize: "1.6rem" }} className="btn mr-1"><FcBinoculars />{TinyText('Note Details')}</button></Link>
                </div>}
                {allowIcons && !isPreview &&
                     <div className='d-flex justify-content-end'>
                        <Link to='/profile'> <button style={{ color: "#4f6a6a", fontSize: "1.6rem" }} className="btn mr-1"><GrNotes />{TinyText('All Notes')}</button></Link>
                        <Link to={{ pathname: '/edit', state: { id, content } }}> <button style={{ color: "#4f6a6a", fontSize: "1.6rem" }} className="btn mr-1"><AiFillEdit />{TinyText('Edit')}</button></Link>
                        <button onClick={handleDeletePrompt} style={{ color: "#d33", fontSize: "1.6rem" }} className="ml-1 btn"><RiDeleteBack2Fill />{TinyText('Delete')}</button>
                    </div>
                }
                <ReactMarkdown remarkPlugins={[gfm]}>
                    {isPreview ? content.length > 300 ? `${content.substring(0, 300)}...` : content : content}
                </ReactMarkdown>
            </div>
        </div>
    )
}

interface NoteCardProps {
    id?: string;
    allowIcons?: boolean;
    content: string;
    deleteTrigger?: any;
    isPreview?: boolean
}


export default NoteCard;
