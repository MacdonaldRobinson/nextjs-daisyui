import React, { useImperativeHandle, useRef } from "react";

type TModal = {
    title: string;
    children: React.ReactNode;
    ref?: React.Ref<TModalHandle>;
};

export type TModalHandle = {
    openModal: () => void;
    closeModal: () => void;
};

const Modal = ({ ref, title, children }: TModal) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
        openModal: () => dialogRef.current?.showModal(),
        closeModal: () => dialogRef.current?.close(),
    }));

    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog ref={dialogRef} id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{children}</p>
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
