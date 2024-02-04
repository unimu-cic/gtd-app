import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen bg-black items-center justify-center flex-col text-secondary">
      <h1 className="text-4xl text-primary font-semibold">
        <span>XERO</span> &nbsp;TODO
      </h1>
      <h2 className="text-2xl mt-10">Get your things done more simply.</h2>

      <Link
        href="/sign-in"
        className="flex items-center bg-primary mt-20 h-12 px-8 rounded-2xl text-black"
      >
        Start to GTD -&gt;
      </Link>
    </main>
  );
}
