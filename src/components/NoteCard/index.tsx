import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { AiFillEdit, AiOutlineStar, AiFillStar } from "react-icons/ai";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { FcBinoculars } from "react-icons/fc";
import { GrNotes } from "react-icons/gr";
import Swal from "sweetalert2";
import { DELETE, PUT } from "../../services/api";
import { useToaster } from "../../hooks/useToaster";

const NoteCard = ({ id, content, reloadTrigger, allowIcons = true, isPreview = false, isPinned = undefined }: NoteCardProps) => {
    const bathBomb = useToaster();

    const handleDeletePrompt = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        Swal.fire({
            title: "Permanently delete this note?",
            text: "This action cannot be undone.",
            icon: "warning",
            iconColor: "#4f6a6a",
            background: "#b5c1c0",
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonColor: "#4f6a6a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I understand!"
        }).then(res => {
            if (res.isConfirmed) {
                DELETE(`/v1/notes/${id}`).then(res => {
                    reloadTrigger();
                    bathBomb({ message: "The note was deleted successfully. " });
                });
            }
        });
    };

    const [pinned, setPinned] = useState(isPinned);

    const handlePinUnpin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setPinned(!isPinned);

        const updatedPin = isPinned ? 0 : 1;
        PUT(`/v1/notes/pin/${id}/${updatedPin}`, {}).then(res => {
            reloadTrigger();
            bathBomb({ message: res.message });
        });
    };

    const TinyText = (text: string) => (
        <p className="text-muted" style={{ fontSize: "0.6rem" }}>
            {text}
        </p>
    );

    return (
        <div className="my-2 rounded-3 p-3 shadow border-2" style={{ backgroundColor: "#dadfdf" }}>
            <div className="card-body">
                {isPreview && (
                    <div className="d-flex justify-content-around">
                        {!(pinned === undefined) && pinned ? (
                            <button onClick={handlePinUnpin} style={{ color: "#4f6a6a", fontSize: "1.6rem" }} className="btn mr-1">
                                <AiFillStar />
                                {TinyText("Unpin me?")}
                            </button>
                        ) : (
                            <button onClick={handlePinUnpin} style={{ color: "#4f6a6a", fontSize: "1.6rem" }} className="btn mr-1">
                                <AiOutlineStar />
                                {TinyText("Pin me!")}
                            </button>
                        )}
                        <Link to={{ pathname: "/details", state: { id, content } }}>
                            {" "}
                            <button style={{ color: "#4f6a6a", fontSize: "1.6rem" }} className="btn mr-1">
                                <FcBinoculars />
                                {TinyText("Note Details")}
                            </button>
                        </Link>
                    </div>
                )}
                {allowIcons && !isPreview && (
                    <div className="d-flex justify-content-end">
                        <Link to="/profile">
                            {" "}
                            <button style={{ color: "#4f6a6a", fontSize: "1.6rem" }} className="btn mr-1">
                                <GrNotes />
                                {TinyText("All Notes")}
                            </button>
                        </Link>
                        <Link to={{ pathname: "/edit", state: { id, content } }}>
                            {" "}
                            <button style={{ color: "#4f6a6a", fontSize: "1.6rem" }} className="btn mr-1">
                                <AiFillEdit />
                                {TinyText("Edit")}
                            </button>
                        </Link>
                        <button onClick={handleDeletePrompt} style={{ color: "#d33", fontSize: "1.6rem" }} className="ml-1 btn">
                            <RiDeleteBack2Fill />
                            {TinyText("Delete")}
                        </button>
                    </div>
                )}
                <ReactMarkdown remarkPlugins={[gfm]}>
                    {isPreview ? (content.length > 300 ? `${content.substring(0, 300)}...` : content) : content}
                </ReactMarkdown>
            </div>
        </div>
    );
};

interface NoteCardProps {
    id?: string;
    allowIcons?: boolean;
    content: string;
    reloadTrigger?: any;
    isPreview?: boolean;
    isPinned?: boolean | undefined;
}

export default NoteCard;
