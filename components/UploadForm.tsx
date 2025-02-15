"use client";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/lib/supabase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "../app/api/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@/lib/uploadthing";
import { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent } from "@tiptap/react";
import { Bold } from "@tiptap/extension-bold";
import { Italic } from "@tiptap/extension-italic";
import { Toggle } from "./ui/toggle";
import { BoldIcon, ItalicIcon, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function UploadForm() {
  const { user } = useUser();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      category: "",
    },
  });

  const author = {
    id: user?.id,
    name: user?.fullName,
    profilePicture: user?.imageUrl,
  };

  const editor = useEditor({
    extensions: [
      StarterKit, // Standardfunktioner
      Bold, // Lägg till fetstil
      Italic,
    ],
    content: "", // Standardinnehåll
  });

  // Funktioner för att trigga varje format
  const toggleBold = () => {
    editor?.chain().focus().toggleBold().run();
  };

  const toggleItalic = () => {
    editor?.chain().focus().toggleItalic().run();
  };

  const onSubmit = async (data: {
    title: string;
    imageUrl: string;
    category: string;
  }) => {
    const { title, category } = data;
    const content = editor?.getHTML(); // Get the HTML content from the editor

    const { data: postData, error } = await supabase.from("blog_posts").insert([
      {
        title,
        author,
        img_url: imageUrl,
        category,
        content, // Save the HTML content to Supabase
      },
    ]);

    if (error) {
      console.error("Fel vid uppladdning:", error);
    } else {
      console.log("Post uppladdad:", postData);
      form.reset();
      setImageUrl(null); // Reset local state
      editor?.commands.clearContent(); // Clear editor content after submit
      setIsSubmitting(true);
      setTimeout(() => {
        console.log("ID RECIEVED: ", postData);
        setIsSubmitting(false);
      }, 3000);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full space-y-6 border p-3 rounded-md shadow-md"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter post title" {...field} />
              </FormControl>
              <FormDescription>
                This will be the title of your post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid sm:grid-cols-2 gap-5 items-center justify-center">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[20rem]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Movie">Movie</SelectItem>
                        <SelectItem value="Show">Show</SelectItem>
                        <SelectItem value="Netflix">Netflix</SelectItem>
                        <SelectItem value="Random">Random</SelectItem>
                        <SelectItem value="Review">Review</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Select a category for your post.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image upload */}
          {imageUrl ? (
            <div className="relative w-full max-w-[30rem] mx-auto aspect-video e p-5">
              <Image
                src={imageUrl}
                alt="Uploaded image"
                width={500}
                height={500}
                onLoadingComplete={() => {
                  setIsLoading(false);
                }}
                className={`absolute inset-0 object-cover aspect-square size-full ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
              />
              {isLoading && (
                <Skeleton className="absolute inset-0 object-cover aspect-square size-full" />
              )}
              <Button
                variant="destructive"
                onClick={() => setImageUrl(null)}
                className="absolute top-2 right-2"
              >
                Remove
              </Button>
            </div>
          ) : (
            <div className="grid gap-3">
              <FormLabel>Image</FormLabel>
              <UploadButton
                endpoint="imageUploader"
                className="ut-button:bg-primary w-fit ut-button:text-primary-foreground ut-allowed-content:text-muted-foreground"
                onUploadBegin={() => {
                  setIsLoading(true);
                }}
                onClientUploadComplete={(res) => {
                  const uploadedImageUrl = res[0]?.url || "";
                  setImageUrl(uploadedImageUrl);
                  form.setValue("imageUrl", uploadedImageUrl);
                  console.log("Files uploaded: ", res);
                }}
                onUploadError={(error: Error) => {
                  console.log(error);
                }}
              />
            </div>
          )}
        </div>

        {/* Tiptap Editor for content */}

        <FormLabel>Blog content</FormLabel>
        <div className="flex space-x-2 mb-4">
          <Toggle
            aria-label="Toggle bold"
            onClick={toggleBold}
            variant="outline"
          >
            <BoldIcon className="h-4 w-4" />
          </Toggle>
          <Toggle
            aria-label="Toggle italic"
            onClick={toggleItalic}
            variant="outline"
          >
            <ItalicIcon className="h-4 w-4" />
          </Toggle>
        </div>
        <EditorContent editor={editor} />

        <Button type="submit" className="w-full">
          {isSubmitting ? <Loader2 className="animate-spin " /> : "Publish"}
        </Button>
      </form>
    </Form>
  );
}
