"use client";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/lib/supabase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "../api/schema-";
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

export default function UploadForm() {
  const { user } = useUser(); // Get users information
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      imageUrl: "", // Optional image URL
    },
  });

  const author = {
    id: user?.id,
    name: user?.fullName,
    profilePicture: user?.imageUrl,
  };

  const onSubmit = async (data: { title: string; imageUrl: string }) => {
    const { title, imageUrl } = data;
    const { data: postData, error } = await supabase.from("posts").insert([
      {
        title,
        created_at: new Date().toISOString(),
        author,
        image_url: imageUrl, // provide image url from UploadThingButton
      },
    ]);

    if (error) {
      console.error("Fel vid uppladdning:", error);
    } else {
      console.log("Post uppladdad:", postData);

      form.reset(); // Reset form after successful upload
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-[30rem] space-y-10"
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

        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Extract the URL of the first file from the response
            const uploadedImageUrl = res[0]?.url || "";
            form.setValue("imageUrl", uploadedImageUrl); // Set the image URL in the form
            console.log("Files uploaded: ", res);
          }}
          onUploadError={(error: Error) => {
            console.log(error);
          }}
        />
        <Button type="submit" className="w-full">
          Upload
        </Button>
      </form>
    </Form>
  );
}
