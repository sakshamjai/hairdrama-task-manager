"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {

    if (session) {
      router.push("/dashboard");
    }

  }, [session]);

  return (
    <main className="min-h-screen flex items-center justify-center">

      <button
        onClick={() => signIn("google")}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Sign in with Google
      </button>

    </main>
  );
}
