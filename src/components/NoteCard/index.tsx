import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { AiFillEdit } from 'react-icons/ai';
import { RiDeleteBack2Fill } from 'react-icons/ri'
import Swal from 'sweetalert2';
import { DELETE } from '../../services/api';
import { useToaster } from '../../hooks/useToaster';
import { get_user_id } from '../../hooks/useCheckAuth';


const NoteCard = ({ id, content, deleteTrigger, allowIcons = true }: NoteCardProps) => {
    const bathBomb = useToaster();
    const history = useHistory();
    const user_id = get_user_id();

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


    return (
        <div className='my-2 rounded-3 p-3 shadow border-2' style={{ "backgroundColor": "#dadfdf" }}>
            <div className="card-body">
                {allowIcons
                    && <div className='d-flex justify-content-end'>
                        <Link to={{ pathname: '/create', state: { id, content } }}> <button style={{ color: "#4f6a6a", fontSize: "1.6rem" }} className="btn mr-1"><AiFillEdit /></button></Link>
                        <button onClick={handleDeletePrompt} style={{ color: "#d33", fontSize: "1.6rem" }} className="ml-1 btn"><RiDeleteBack2Fill /></button>
                    </div>}
                <ReactMarkdown remarkPlugins={[gfm]}>
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    )
}

interface NoteCardProps {
    id?: string;
    allowIcons?: boolean;
    content: string;
    deleteTrigger: any;
}


export default NoteCard;
