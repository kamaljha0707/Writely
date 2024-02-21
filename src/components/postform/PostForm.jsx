import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/db.js";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "../index.js";
import { GoArrowLeft } from "react-icons/go";
import userService from "../../appwrite/user.js";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "Public",
        username: post?.username || ""
        

      },
    });
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

   const [user, setUser] = useState("");
   const [userId, setUserId] = useState(null)
   

   useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await userService.getUserNameById(userId)
        setUser(user);
      } catch (error) {
        console.error("Error while fetching user:", error);
      }
    }
    fetchUserData();
  }, [setUser]);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
          username:user
        });
        // setUserId(post.userId)

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="bg-[#f3f6f9] w-full md:px-24 md:py-16 xl:px-28 min-h-screen">
      <div className=" flex w-full  justify-center items-start">
        <div>
          <Link to={"/"}>
            <GoArrowLeft title="Home page" className="text-3xl mt-3  " />
          </Link>{" "}
        </div>
        <form
          onSubmit={handleSubmit(submit)}
          className="bg-white rounded-lg w-4/6 flex justify-between items-start   px-12 py-10 mx-24 min-h-60"
        >
          <div className="w-2/3 px-2">
            <Input
              label="Title :"
              placeholder="Title"
              {...register("title", { required: true })}
            />
            <Input
              label="Slug :"
              placeholder="Slug"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
            <RTE
              label="Content :"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
          <div className="w-1/3 px-2">
            <Input
              label="Featured Image :"
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
            />
            {post && (
              <div className="w-64  my-6 ">
                <img
                  src={appwriteService.previewFile(post.featuredImage)}
                  alt={post.title}
                  className="rounded-lg w-full h-64"
                />
              </div>
            )}
            <div>{user}</div>
            <Select
            className= 'my-4'
              options={["Public", "Private"]}
              label="Status"
              {...register("status", { required: true })}
            />
            <Button type="submit">{post ? "Update" : "Submit"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
