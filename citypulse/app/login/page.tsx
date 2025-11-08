import { MapPin } from "lucide-react";
import { LoginForm } from "@/components/login-form";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex flex-col gap-8 p-6 md:p-10 w-full max-w-md">
        <div className="flex justify-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 font-medium text-lg group"
          >
            <div className="bg-black dark:bg-white text-white dark:text-black flex size-10 items-center justify-center rounded-lg transition-transform group-hover:scale-105">
              <MapPin className="size-6" />
            </div>
            <span className="text-3xl font-bold text-black dark:text-white">
              CityPulse
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-8 shadow-lg">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
