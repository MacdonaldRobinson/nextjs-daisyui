import { TPost } from "@/app/ZodSchemas/PostSchema";
import RenderPost from "./RenderPost";

export type TListPosts = {
    posts: TPost[];
};

export type TLiked = {
    posts: TPost[];
};

const ListPosts = ({ posts }: TListPosts) => {
    return (
        <div className="flex flex-row w-full flex-wrap gap-5 items-center justify-center">
            {posts.map((post: TPost) => {
                return (
                    <div key={post.id}>
                        <RenderPost post={post} />
                    </div>
                );
            })}
        </div>
    );
};

export default ListPosts;
