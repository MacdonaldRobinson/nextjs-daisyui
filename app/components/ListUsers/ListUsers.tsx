"use client";
import { getUsers } from "@/app/serverActions/userActions";
import { TUser } from "@/app/ZodSchemas/UserSchema";
import { useState, useEffect, use } from "react";
import { TModalHandle } from "../Modal/Modal";
import ListPosts from "../ListPosts/ListPosts";
import { getPosts } from "@/app/serverActions/postActions";
import { TPost } from "@/app/ZodSchemas/PostSchema";

export type TListUsers = {
    popupModal: TModalHandle | null | undefined;
};

const ListUsers = ({ popupModal }: TListUsers) => {
    const [users, setUsers] = useState<TUser[]>([]);
    const [posts, setPosts] = useState<TPost[]>([]);

    const fetchtUsers = async () => {
        const allUsers: TUser[] = await getUsers();
        setUsers(allUsers);
    };

    const fetchPosts = async () => {
        const allPosts: TPost[] = await getPosts();
        setPosts(allPosts);
    };

    useEffect(() => {
        Promise.all([fetchtUsers(), fetchPosts()]);
    }, []);

    const getUserPosts = (user: TUser) => {
        const filteredPosts = posts.filter(
            (post: TPost) => post.userId == user.id
        );

        return filteredPosts;
    };

    const handleOnPostsClick = async (user: TUser) => {
        console.log(popupModal);
        if (!popupModal) return;

        const filteredPosts = getUserPosts(user);
        console.log(filteredPosts);

        popupModal.openModal(
            <div className="flex flex-row items-center gap-5">
                <div className="avatar">
                    <div className="w-15 rounded-full">
                        <img
                            src={`https://via.assets.so/album.png?id=${user.id}&q=95&w=360&h=360&fit=fill`}
                        />
                    </div>
                </div>
                <div>Posts from {user.name}</div>
            </div>,
            <ListPosts posts={filteredPosts} />
        );
    };

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Company</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.length == 0 && (
                        <tr>
                            <th>
                                <div className="text-2xl text-center w-full">
                                    Loading ...
                                </div>
                            </th>
                        </tr>
                    )}
                    {users.map((user: TUser) => {
                        return (
                            <tr key={user.id}>
                                <th>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                        />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={`https://via.assets.so/album.png?id=${user.id}&q=95&w=360&h=360&fit=fill`}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">
                                                {user.name}
                                            </div>
                                            <div className="text-sm opacity-50">
                                                {user.address.city}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.email}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">
                                        {user.company.bs}
                                    </span>
                                </td>
                                <td>{user.company.name}</td>
                                <th>
                                    <button
                                        className="btn btn-ghost btn-xs"
                                        onClick={() => handleOnPostsClick(user)}
                                    >
                                        posts ({getUserPosts(user).length})
                                    </button>
                                </th>
                            </tr>
                        );
                    })}
                    {/* row 1 */}
                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Company</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default ListUsers;
