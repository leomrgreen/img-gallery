"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";

const Header = () => {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 w-full z-50 px-4 py-3 sm:px-6 lg:px-8 border-b bg-background
    "
    >
      <nav className="mx-auto max-w-7xl">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <PenSquare className="h-6 w-6" />
              <span className="font-bold text-xl">BlogApp</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <SignedIn>
              <Link
                href="/post"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/post"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Create Post
              </Link>
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Home
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline">Sign In</Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
