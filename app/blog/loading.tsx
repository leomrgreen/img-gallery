import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white shadow-md rounded-lg p-6">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <div className="flex items-center">
            <Skeleton className="h-10 w-10 rounded-full mr-4" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}
