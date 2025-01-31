import UploadForm from "@/components/UploadForm";
import React from "react";

const PostPage = () => {
  return (
    <section className="p-5 rounded-md max-w-[30rem] w-full mx-auto min-h-screen items-center flex">
      <UploadForm />
    </section>
  );
};

export default PostPage;
