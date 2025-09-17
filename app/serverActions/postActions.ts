"use server";

import axios from "axios";
import { PostsSchema, TPost } from "../ZodSchemas/PostSchema";

export const getPosts = async (limit: number = 10) => {
    const { data: posts } = await axios.get<TPost[]>(
        "https://jsonplaceholder.typicode.com/posts?limit=" + limit.toString()
    );

    const result = PostsSchema.safeParse(posts);

    if (!result.success) {
        throw result.error;
    }

    return result.data as TPost[];
};
