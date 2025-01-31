import Image from "next/image";
import UploadForm from "./components/UploadForm";
import PostList from "./components/Test";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="shadow-md p-5 rounded-md border">
        <UploadForm />
      </div>
      <PostList />
    </div>
  );
}
