import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { AiFillEdit } from 'react-icons/ai';
import { RiDeleteBack2Fill } from 'react-icons/ri'
import Swal from 'sweetalert2';
import { DELETE } from '../../services/api';
import { useToaster } from '../../hooks/useToaster';


const NoteCard = ({ id, content }: NoteCardProps) => {
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
                            if (res.ok) {
                                bathBomb({ message: 'The note was deleted successfully. ' });
                            }
                        })
                }
            })
    }


    return (
        <div className='d-flex flex-wrap w-100 my-2 rounded-3 col-sm-10 col-md-6 col-lg-4 p-3 shadow border-2' style={{ "backgroundColor": "#dadfdf" }}>
            <div className="card-body">
                <div className='d-flex justify-content-end'>
                    <Link to={{ pathname: '/create', state: { id, content } }}> <button style={{ color: "#4f6a6a" }} className="btn"><AiFillEdit /></button></Link>
                    <button onClick={handleDeletePrompt} style={{ color: "#d33" }} className="btn"><RiDeleteBack2Fill /></button>
                </div>
                <ReactMarkdown remarkPlugins={[gfm]}>
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    )
}

interface NoteCardProps {
    id?: string;
    content: string;
}


export default NoteCard;
