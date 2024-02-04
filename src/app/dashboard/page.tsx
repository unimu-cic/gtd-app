import Stat from "@/components/Stat";
import Create from "@/components/Create";
import { cookies } from "next/headers";
import {
  createServerComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import ToDoList from "@/components/ToDoList";
import { Database } from "../../../types_db";
import SignOutBtn from "@/components/SignOutBtn";

const Dashboard = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <section className="h-screen bg-black text-secondary p-6">
      <header className="flex justify-between items-center">
        <h1 className="text-lg font-semibold text-primary">
          <span className="text-secondary">XERO</span> TODO
        </h1>
        <SignOutBtn />
      </header>
      <main className="max-w-xl mx-auto">
        <Stat />
        <Create session={session} />
        <ToDoList />
      </main>
    </section>
  );
};

export default Dashboard;
