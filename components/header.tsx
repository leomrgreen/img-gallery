"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Book,
  BookImage,
  Bookmark,
  Home,
  Menu,
  Plus,
  Rocket,
  Tv,
} from "lucide-react";
import { ModeToggle } from "./theme/mode-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 w-full z-50 px-4 py-3 sm:px-6 lg:px-8 border-b bg-background
    "
    >
      <nav className="max-w-full sm:hidden flex justify-between items-center">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col justify-between">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetClose asChild>
                <Link href="/" className="flex items-center gap-2 p-2 text-xl">
                  <Home />
                  <span>Home</span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/blog"
                  className="flex items-center gap-2 p-2 text-xl"
                >
                  <BookImage />
                  <span>Blog</span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/top"
                  className="flex items-center gap-2 p-2 text-xl"
                >
                  <Rocket />
                  <span>Top 100</span>
                </Link>
              </SheetClose>
              <SignedIn>
                <SheetClose asChild>
                  <Link
                    href="/watchlist"
                    className="flex items-center gap-2 p-2 text-xl"
                  >
                    <Bookmark />
                    <span>Watchlist</span>
                  </Link>
                </SheetClose>
              </SignedIn>
            </SheetHeader>
            <SheetFooter className="flex flex-row items-center justify-between">
              <ModeToggle />
              <SignedIn>
                <SheetClose asChild>
                  <Link
                    href="/post"
                    className={buttonVariants({ variant: "default" })}
                    style={{
                      borderRadius: 100,
                    }}
                  >
                    <span>New Article</span>
                    <Plus />
                  </Link>
                </SheetClose>
              </SignedIn>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <div className="flex">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>

      <nav className="mx-auto max-w-7xl sm:block hidden">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link href="/" className="flex items-center gap-1">
              <Tv className="size-6" />
            </Link>
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                pathname === "/"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                pathname === "/blog"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground"
              }`}
            >
              Blog
            </Link>
            <Link
              href="/top"
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                pathname === "/top"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground"
              }`}
            >
              Top 100
            </Link>
            <SignedIn>
              <Link
                href="/watchlist"
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  pathname === "/watchlist"
                    ? "text-foreground font-bold"
                    : "text-muted-foreground"
                }`}
              >
                Watchlist
              </Link>
            </SignedIn>
          </div>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <SignedIn>
              <Link
                href="/post"
                className={buttonVariants({ variant: "default" })}
                style={{
                  borderRadius: 100,
                }}
              >
                <span>New Article</span>
                <Plus />
              </Link>
              <UserButton afterSignOutUrl="/" appearance={{}} />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="rounded-full">Sign In</Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
