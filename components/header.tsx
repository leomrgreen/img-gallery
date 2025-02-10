"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tv } from "lucide-react";
import { ModeToggle } from "./theme/mode-toggle";

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
            <Link href="/" className="flex items-center gap-1">
              <Tv className="size-6" />
              <span className="text-xl ">Movie Gallery</span>
            </Link>
          </div>
          <div className="flex space-x-4 items-center">
            <Link
              href="/discover"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/post" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Discover
            </Link>
            <Link
              href="/top"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/top" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Top 100
            </Link>
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <SignedIn>
              <Link
                href="/watchlist"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/watchlist"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Watchlist
              </Link>
            </SignedIn>
            <ModeToggle />
          </div>
          <div className="flex items-center space-x-4">
            <SignedIn>
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
