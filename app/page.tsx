"use client";
import { useEffect, useRef, useState } from "react";
import PageWrapper, {
    TPageWrapperHandle,
} from "./components/PageWrapper/PageWrapper";
import NavBar from "./components/NavBar/NavBar";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";
import ListPosts from "./components/ListPosts/ListPosts";
import { getPosts } from "./serverActions/postActions";
import { TPost } from "./ZodSchemas/PostSchema";
import { TUser } from "./ZodSchemas/UserSchema";
import { getUser } from "./serverActions/userActions";

export default function Home() {
    const pageRef = useRef<TPageWrapperHandle>(null);

    const handleDrawerOpen = () => {
        if (!pageRef.current) return;
        pageRef.current.openDrawer();
    };

    return (
        <PageWrapper ref={pageRef}>
            <NavBar onMouseMenuClick={handleDrawerOpen} />
            <Hero />
            <div>
                <ListPosts />
            </div>
            <Footer />
        </PageWrapper>
    );
}
