import UploadForm from "../components/UploadForm";
import PostList from "@/components/Test";

export default function Home() {
  return (
    <section className="grid items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 ">
      <PostList />
    </section>
  );
}
