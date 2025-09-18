"use client";
import { TPost } from "../ZodSchemas/PostSchema";

export type TLikes = {
    posts: TPost[];
};

const likesKey = "Likes";

export const postExists = (post: TPost) => {
    const found = getLikes().posts.find((p: TPost) => p.id == post.id);
    return found;
};

export const getLikes = (): TLikes => {
    const found = localStorage.getItem(likesKey);

    if (!found) {
        const newLikes: TLikes = {
            posts: [],
        };

        localStorage.setItem(likesKey, JSON.stringify(newLikes));
    }

    const likesJsonString = localStorage.getItem(likesKey);

    if (!likesJsonString) {
        throw new Error("Error getting from local storage");
    }

    const likes: TLikes = JSON.parse(likesJsonString);

    return likes;
};

export const setLikes = (likes: TLikes) => {
    localStorage.setItem(likesKey, JSON.stringify(likes));

    return getLikes();
};
