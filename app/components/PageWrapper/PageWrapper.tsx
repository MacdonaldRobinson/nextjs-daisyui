"use client";

import { useEffect, useImperativeHandle, useRef } from "react";
import Modal, { TModalHandle } from "../Modal/Modal";

type TPageWrapper = {
    children: React.ReactNode;
    ref?: React.Ref<TPageWrapperHandle>;
};

export type TPageWrapperHandle = {
    popupModal: TModalHandle | null;
    openDrawer: () => void;
    closeDrawer: () => void;
};

const PageWrapper = ({ children, ref }: TPageWrapper) => {
    const popupModal = useRef<TModalHandle>(null);
    const drawerToggle = useRef<HTMLInputElement>(null);

    useImperativeHandle(
        ref,
        () => {
            return {
                popupModal: popupModal.current,
                openDrawer: () => {
                    if (!drawerToggle.current) return;

                    drawerToggle.current.checked = true;
                },
                closeDrawer: () => {
                    if (!drawerToggle.current) return;

                    drawerToggle.current.checked = false;
                },
            };
        },
        []
    );

    return (
        <div className="drawer">
            <input
                id="my-drawer"
                type="checkbox"
                className="drawer-toggle"
                ref={drawerToggle}
            />
            <div className="drawer-content">
                {/* Page content here */}
                {children}
                <Modal title="Title" ref={popupModal}>
                    This isa test
                </Modal>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li>
                        <a>Sidebar Item 1</a>
                    </li>
                    <li>
                        <a>Sidebar Item 2</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default PageWrapper;
