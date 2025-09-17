"use server";

import axios from "axios";
import { TUser, UserSchema, UsersSchema } from "../ZodSchemas/UserSchema";

export const getUsers = async () => {
    const { data: users } = await axios.get<TUser[]>(
        "https://jsonplaceholder.typicode.com/users"
    );

    const result = UsersSchema.safeParse(users);

    if (!result.success) {
        throw result.error;
    }

    return result.data as TUser[];
};

export const getUser = async (userId: number) => {
    console.log("getUser", userId);
    try {
        const { data: users } = await axios.get<TUser>(
            `https://jsonplaceholder.typicode.com/users/${userId}`
        );

        const result = UserSchema.safeParse(users);

        if (!result.success) {
            throw result.error;
        }

        return result.data as TUser;
    } catch (ex) {
        console.log(`Cannot query for user id: ${userId}`);
        return null;
    }
};
