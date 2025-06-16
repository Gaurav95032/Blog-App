import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '../Input';
import Select from '../Select';
import service from '@/appwrite/config';
import Button from '../Button';
import RTE from '../RTE';

function PostForm({ post }) {
    const { register, handleSubmit, setValue, control, watch, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            slug: post?.slug || "",
            status: post?.status || "active"
        }
    });

    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();

    const slugTransform = useCallback((value) => {
        return value?.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-').replace(/\s+/g, '-');
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const onSubmit = async (data) => {
        if (!userData || !userData.$id) {
            alert("Please log in before adding a post.");
            return;
        }

        try {
            let file = null;
            if (data.image && data.image[0]) {
                file = await service.createFile(data.image[0]);
            }

            const payload = {
                ...data,
                userId: userData.$id,
                featuredImage: file ? file.$id : undefined,
            };

            console.log("Final post payload:", payload);

            const dbPost = await service.createPost(payload);

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } catch (err) {
            console.error("Submission error:", err);
            alert("An error occurred while submitting your post. Please check the console.");
        }
    };
    

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-xl p-8 space-y-6">
            <Input
                label="Title"
                placeholder="Enter title"
                {...register("title", { required: true })}
                className="w-full"
            />

            <Input
                label="Slug"
                placeholder="Slug (auto-generated or manual)"
                {...register("slug", { required: true })}
                onInput={(e) =>
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                }
                className="w-full"
            />

            <RTE
                name="content"
                label="Content"
                control={control}
                defaultValue={getValues("content")}
            />

            <Input
                type="file"
                label="Featured Image"
                accept="image/png, image/jpg, image/jpeg"
                {...register("image", { required: !post })}
                className="w-full"
            />

            {post?.featuredImage && (
                <div className="mt-4">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="w-48 rounded-lg border shadow"
                    />
                </div>
            )}

            <Select
                label="Status"
                options={["active", "inactive"]}
                {...register("status", { required: true })}
                className="w-full"
            />

            <Button
                type="submit"
                backGroundColor={post ? "bg-blue-600" : "bg-green-600"}
                textColor="text-white"
                className="w-full py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
                {post ? "Update Post" : "Add Post"}
            </Button>
        </form>
    );
}

export default PostForm;
