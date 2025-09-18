"use client";
import { getLikes, setLikes } from "@/app/libs/likes";
import { TPost } from "@/app/ZodSchemas/PostSchema";
import { ArchiveBoxIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";

export type TRenderPost = {
    post: TPost;
};

const RenderPost = ({ post }: TRenderPost) => {
    const [likedPosts, setLikedPosts] = useState<TPost[]>([]);

    const handleLikeClick = (post: TPost) => {
        const likes = getLikes();
        const found = likes.posts.find((p: TPost) => p.id == post.id);

        if (!found) {
            likes.posts.push(post);
            const updatedLikes = setLikes(likes);
            setLikedPosts(updatedLikes.posts);
        }
    };

    const handleUnLikeClick = (post: TPost) => {
        const likes = getLikes();
        const found = likes.posts.find((p: TPost) => p.id == post.id);

        if (found) {
            const removedArray = likes.posts.filter(
                (p: TPost) => p.id != post.id
            );
            likes.posts = removedArray;
            const updatedLikes = setLikes(likes);
            setLikedPosts(updatedLikes.posts);
        }
    };

    const isPostLiked = (post: TPost) => {
        if (likedPosts.length == 0) return false;

        const found = likedPosts.find((p: TPost) => p.id == post.id);

        return found ? true : false;
    };

    useEffect(() => {
        const likes = getLikes();
        setLikedPosts(likes.posts);
    }, []);
    return (
        <div key={post.id} className="card bg-base-100 w-96 h-96 shadow-sm">
            <figure>
                <img
                    src={`https://via.assets.so/game.png?id=${post.id}&q=95&w=360&h=360&fit=fill`}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{post.title}</h2>
                <p>{post.body}</p>
                <div className="card-actions justify-end">
                    {isPostLiked(post) && (
                        <button
                            className="btn btn-primary"
                            onClick={() => handleUnLikeClick(post)}
                        >
                            Unlike
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                                />
                            </svg>
                        </button>
                    )}
                    {!isPostLiked(post) && (
                        <button
                            className="btn"
                            onClick={() => handleLikeClick(post)}
                        >
                            Like
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2.5"
                                stroke="currentColor"
                                className="size-[1.2em]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RenderPost;
