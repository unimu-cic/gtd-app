"use client";
import {Auth} from "@supabase/auth-ui-react";
import {getURL} from "@/utils/helpers";
import {useSupabase} from "@/app/supabase-provider";

const AuthUI = () => {
  const {supabase} = useSupabase();

  return (
    <div className="bg-secondary-500 p-4 sm:p-6 rounded-lg">
      <div className="text-black mb-4">
        <h2 className="text-2xl font-semibold">Sign in</h2>
        <p className="opacity-70">to continue to XERO TODO</p>
      </div>
      <Auth
        supabaseClient={supabase}
        providers={["github", "google"]}
        redirectTo={`${getURL()}/auth/callback`}
        appearance={{
          extend: false,
          className: {
            anchor: "text-xs underline mx-auto text-black-300",
            button:
              "bg-black text-[15px] justify-center items-center flex text-secondary rounded-lg p-2 sm:px-3 gap-2 hover:bg-black-300 transition-all [&>svg]:h-6 [&>svg]:w-6",
            container: "w-[16rem] sm:w-[20rem] flex flex-col gap-4 mb-2 sm:mb-4 last:mb-0",
            divider:
              "bg-secondary-300 h-[1px] my-6 sm:my-10 relative before:bg-secondary-500 before:content-['or'] before:absolute before:px-2 before:text-black-300 before:top-1/2 before:left-1/2 before:-translate-y-1/2 before:-translate-x-1/2",
            input:
              "text-black text-[15px] flex h-9 w-full rounded-md border border-black transition-all bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-black/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            label: "text-[13px] mb-1 flex flex-col text-sm text-black",
            message: "text-red-500 text-center text-sm block",
          },
        }}
        magicLink={true}
      />
    </div>
  );
};

export default AuthUI;
