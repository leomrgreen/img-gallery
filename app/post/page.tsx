import UploadForm from "@/components/UploadForm";
import React from "react";

const PostPage = () => {
  return (
    <section className="p-5 rounded-md w-full max-w-[70rem] mx-auto min-h-screen items-center flex flex-col gap-7">
      <h1 className="pt-10 font-bold text-5xl">Create a blog post</h1>
      <UploadForm />
    </section>
  );
};

export default PostPage;
