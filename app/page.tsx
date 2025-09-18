"use client";
import { useEffect, useRef, useState } from "react";
import PageWrapper, {
    TPageWrapperHandle,
} from "./components/PageWrapper/PageWrapper";
import NavBar from "./components/NavBar/NavBar";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";
import ListUsers from "./components/ListUsers/ListUsers";
import { TModalHandle } from "./components/Modal/Modal";

export default function Home() {
    const pageRef = useRef<TPageWrapperHandle>(null);
    const [popupModal, setPopupModal] = useState<TModalHandle | null>(null);

    useEffect(() => {
        if (!pageRef.current?.popupModal) return;

        setPopupModal(pageRef.current.popupModal);
    }, [pageRef.current?.popupModal]);

    return (
        <PageWrapper ref={pageRef}>
            <Hero />
            <div>{popupModal && <ListUsers popupModal={popupModal} />}</div>
        </PageWrapper>
    );
}
