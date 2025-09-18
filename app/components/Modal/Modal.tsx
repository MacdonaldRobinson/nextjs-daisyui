import React, { useImperativeHandle, useRef, useState } from "react";

type TModal = {
    ref?: React.Ref<TModalHandle>;
};

export type TModalHandle = {
    openModal: (
        titleContent: React.ReactNode,
        modalContent: React.ReactNode
    ) => void;
    closeModal: () => void;
};

const Modal = ({ ref }: TModal) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [modalTitle, setModalTitle] = useState<React.ReactNode>();
    const [modalContent, setModalContent] = useState<React.ReactNode>();

    useImperativeHandle(ref, () => ({
        openModal: (
            titleContent: React.ReactNode,
            modalContent: React.ReactNode
        ) => {
            setModalContent(modalContent);
            setModalTitle(titleContent);

            dialogRef.current?.showModal();
        },
        closeModal: () => dialogRef.current?.close(),
    }));

    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_4" className="modal" ref={dialogRef}>
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">{modalTitle}</h3>
                    <div className="py-4">{modalContent}</div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Modal;
