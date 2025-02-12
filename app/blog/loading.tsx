import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";

export default function Loading() {
  return (
    <section className="min-h-screen max-w-[85rem] w-full mx-auto flex flex-col justify-center items-center">
      <h1 className="text-5xl sm:text-7xl mt-10">Blog page</h1>
      <div className="flex flex-col gap-8 w-full">
        <div className="grid md:grid-cols-2 border-none shadow-none gap-5 my-10">
          <Skeleton className="aspect-[2/1] w-full rounded-lg" />
          <div className="flex flex-col justify-around">
            <div className="grid gap-4">
              <div className="flex items-center text-sm gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-1 w-1 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="max-h-full overflow-hidden">
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
            <div className="flex justify-between items-baseline sm:mt-0 mt-5">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-12 w-48" />
          <Button variant="ghost" disabled>
            <Skeleton className="h-4 w-16 mr-2" />
            <ArrowRight />
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex flex-col gap-5 mb-5">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <div className="flex items-center text-sm gap-2">
                <div className="flex items-center gap-1">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-1 w-1 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-6 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
