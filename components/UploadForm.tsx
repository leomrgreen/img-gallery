"use client";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/lib/supabase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "../app/api/schema-";
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

export default function UploadForm() {
  const { user } = useUser(); // Get user's information
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
    },
  });

  const author = {
    id: user?.id,
    name: user?.fullName,
    profilePicture: user?.imageUrl,
  };

  const onSubmit = async (data: { title: string; imageUrl: string }) => {
    const { title } = data;
    const { data: postData, error } = await supabase.from("posts").insert([
      {
        title,
        created_at: new Date().toISOString(),
        author,
        image_url: imageUrl,
        category: "banana",
      },
    ]);

    if (error) {
      console.error("Fel vid uppladdning:", error);
    } else {
      console.log("Post uppladdad:", postData);
      form.reset();
      setImageUrl(null); // Reset local state
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

        {imageUrl ? (
          <div className="relative w-full h-full aspect-square p-5">
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
          <UploadButton
            endpoint="imageUploader"
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
        )}

        <Button type="submit" className="w-full">
          Upload
        </Button>
      </form>
    </Form>
  );
}
