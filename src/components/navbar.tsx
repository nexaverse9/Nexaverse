"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Wallet, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/mode-toggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<
    "freelancer" | "business" | "job-poster" | null
  >(null);
  useEffect(() => {
    // Check for auth token in cookies
    const hasAuthToken = document.cookie.includes("auth_token");

    // Also check localStorage as a fallback
    const hasLocalAuth = localStorage.getItem("auth_token") === "true";

    // Set authenticated if either check passes
    setIsAuthenticated(hasAuthToken || hasLocalAuth);

    // Get user type from localStorage or set a default
    if (hasAuthToken || hasLocalAuth) {
      const savedUserType = localStorage.getItem("user_type") as
        | "freelancer"
        | "business"
        | "job-poster"
        | null;
      setUserType(savedUserType || "freelancer");
    }
  }, [pathname]); // Re-check when pathname changes

  // Function to handle logout
  const handleLogout = () => {
    // Clear auth token from both cookie and localStorage
    document.cookie = "auth_token=; path=/; max-age=0";
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_type");
    setIsAuthenticated(false);
    setUserType(null);
    router.push("/");
  };

  // Function to set user type (for demo purposes)
  const setDemoUserType = (type: "freelancer" | "business" | "job-poster") => {
    localStorage.setItem("user_type", type);
    setUserType(type);
    // Refresh the page to update UI
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between max-w-full px-4 md:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-nexapurple-700">
              NexaWork
            </span>
          </Link>
          <nav className="hidden md:flex gap-8 ml-10">
            {/* Always show these links */}
            {!isAuthenticated && (
              <>
                <Link
                  href="/"
                  className={`text-base font-medium transition-colors hover:text-nexapurple-700 ${
                    pathname === "/"
                      ? "text-nexapurple-700"
                      : "text-foreground/60"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/for-business"
                  className={`text-base font-medium transition-colors hover:text-nexapurple-700 ${
                    pathname === "/for-business"
                      ? "text-nexapurple-700"
                      : "text-foreground/60"
                  }`}
                >
                  For Business
                </Link>
                <Link
                  href="/about"
                  className={`text-base font-medium transition-colors hover:text-nexapurple-700 ${
                    pathname === "/about"
                      ? "text-nexapurple-700"
                      : "text-foreground/60"
                  }`}
                >
                  About Us
                </Link>
              </>
            )}

            {/* Only show these links when authenticated */}
            {isAuthenticated && (
              <>
                <Link
                  href="/dashboard"
                  className={`text-base font-medium transition-colors hover:text-nexapurple-700 ${
                    pathname === "/dashboard"
                      ? "text-nexapurple-700"
                      : "text-foreground/60"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/marketplace"
                  className={`text-base font-medium transition-colors hover:text-nexapurple-700 ${
                    pathname === "/marketplace"
                      ? "text-nexapurple-700"
                      : "text-foreground/60"
                  }`}
                >
                  Marketplace
                </Link>
                <Link
                  href="/talent"
                  className={`text-base font-medium transition-colors hover:text-nexapurple-700 ${
                    pathname === "/talent"
                      ? "text-nexapurple-700"
                      : "text-foreground/60"
                  }`}
                >
                  Search Talent
                </Link>

                {/* Conditional links based on user type */}
                {userType === "job-poster" && (
                  <Link
                    href="/dashboard/post-job"
                    className={`text-base font-medium transition-colors hover:text-nexapurple-700 ${
                      pathname === "/dashboard/post-job"
                        ? "text-nexapurple-700"
                        : "text-foreground/60"
                    }`}
                  >
                    Post Job
                  </Link>
                )}

                {userType === "business" && (
                  <Link
                    href="/hire-talent"
                    className={`text-base font-medium transition-colors hover:text-nexapurple-700 ${
                      pathname === "/hire-talent"
                        ? "text-nexapurple-700"
                        : "text-foreground/60"
                    }`}
                  >
                    Hire Talent
                  </Link>
                )}
              </>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link href="/connect-wallet">
                  <Button
                    variant="outline"
                    size="default"
                    className="gap-2 border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200 text-base px-5 py-2.5"
                  >
                    <Wallet className="h-5 w-5" />
                    Connect Wallet
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="default"
                    className="border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200 text-base px-5 py-2.5"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="default"
                    className="bg-nexapurple-700 hover:bg-nexapurple-800 text-white text-base px-5 py-2.5"
                  >
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard/profile">
                  <Button
                    variant="outline"
                    size="default"
                    className="gap-2 border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200 text-base px-5 py-2.5"
                  >
                    <User className="h-5 w-5" />
                    My Profile
                  </Button>
                </Link>
                <Button
                  size="default"
                  className="bg-nexapurple-700 hover:bg-nexapurple-800 text-white text-base px-5 py-2.5"
                  onClick={handleLogout}
                >
                  Logout
                </Button>

                {/* Demo user type selector - remove in production */}
                <div className="ml-4 border-l pl-4 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Demo:</span>
                  <select
                    value={userType || "freelancer"}
                    onChange={(e) =>
                      setDemoUserType(
                        e.target.value as
                          | "freelancer"
                          | "business"
                          | "job-poster"
                      )
                    }
                    className="text-sm bg-transparent border rounded px-1"
                  >
                    <option value="freelancer">Freelancer</option>
                    <option value="business">Business</option>
                    <option value="job-poster">Job Poster</option>
                  </select>
                </div>
              </>
            )}
          </div>
          <ModeToggle />
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-7 w-7" />
            ) : (
              <Menu className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden py-6 border-t">
          <nav className="flex flex-col gap-5">
            {/* Mobile menu links */}
            {!isAuthenticated ? (
              <>
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2.5 text-lg"
                >
                  Home
                </Link>
                <Link
                  href="/for-business"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2.5 text-lg"
                >
                  For Business
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2.5 text-lg"
                >
                  About Us
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2.5 text-lg"
                >
                  Dashboard
                </Link>
                <Link
                  href="/marketplace"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2.5 text-lg"
                >
                  Marketplace
                </Link>
                <Link
                  href="/talent"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2.5 text-lg"
                >
                  Search Talent
                </Link>

                {/* Conditional links based on user type */}
                {userType === "job-poster" && (
                  <Link
                    href="/dashboard/post-job"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2.5 text-lg"
                  >
                    Post Job
                  </Link>
                )}

                {userType === "business" && (
                  <Link
                    href="/hire-talent"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2.5 text-lg"
                  >
                    Hire Talent
                  </Link>
                )}
              </>
            )}

            <div className="flex flex-col gap-3 pt-3 border-t">
              {!isAuthenticated ? (
                <>
                  <Link
                    href="/connect-wallet"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full gap-2 border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200"
                    >
                      <Wallet className="h-5 w-5" />
                      Connect Wallet
                    </Button>
                  </Link>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      size="lg"
                      className="w-full bg-nexapurple-700 hover:bg-nexapurple-800 text-white"
                    >
                      Register
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full gap-2 border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200"
                    >
                      <User className="h-5 w-5" />
                      My Profile
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    className="w-full bg-nexapurple-700 hover:bg-nexapurple-800 text-white"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
