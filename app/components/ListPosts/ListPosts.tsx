"use client";
import { getPosts } from "@/app/serverActions/postActions";
import { getUser, getUsers } from "@/app/serverActions/userActions";
import { TPost } from "@/app/ZodSchemas/PostSchema";
import { TUser } from "@/app/ZodSchemas/UserSchema";
import { useState, useEffect } from "react";

const ListPosts = () => {
    const [filteredPosts, setFilteredPosts] = useState<TPost[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<TUser[]>([]);

    const getPostandUsers = async () => {
        const posts: TPost[] = await getPosts();
        const users: TUser[] = await getUsers();

        setFilteredPosts(posts);
        setFilteredUsers(users);
    };

    useEffect(() => {
        getPostandUsers();
    }, []);
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
                    {filteredUsers.length == 0 && (
                        <tr>
                            <th>
                                <div className="text-2xl text-center w-full">
                                    Loading ...
                                </div>
                            </th>
                        </tr>
                    )}
                    {filteredUsers.map((user: TUser) => {
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
                                                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                    alt="Avatar Tailwind CSS Component"
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
                                    <button className="btn btn-ghost btn-xs">
                                        details
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
                        <th>Job</th>
                        <th>Favorite Color</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default ListPosts;
