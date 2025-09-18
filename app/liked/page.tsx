"use client";
import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import { getLikes } from "../libs/likes";
import { TPost } from "../ZodSchemas/PostSchema";
import RenderPost from "../components/ListPosts/RenderPost";

const Liked = () => {
    const [likedPosts, setLikedPosts] = useState<TPost[]>([]);

    useEffect(() => {
        const likes = getLikes();
        console.log(likes);
        setLikedPosts(likes.posts);
    }, []);

    return (
        <PageWrapper>
            <div className="flex flex-row flex-wrap gap-5 items-center justify-center">
                {likedPosts.length == 0 && <div>No Likes</div>}
                {likedPosts.map((post: TPost) => {
                    return (
                        <div key={post.id}>
                            <RenderPost post={post} />
                        </div>
                    );
                })}
            </div>
        </PageWrapper>
    );
};

export default Liked;
