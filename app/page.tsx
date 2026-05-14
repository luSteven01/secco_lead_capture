import Image from "next/image";
import Form from "@/components/Form";

export default function Home() {
  return (
    
    <main className="min-h-screen overflow-hidden bg-gray-200 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center">
        <div className="grid w-full gap-5 lg:grid-cols-2 lg:items-center">
          <section className="max-w-xl text-slate-900">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-orange-700">
              Secco Squared
            </p>
            <h2 className="text-5xl font-black tracking-tight sm:text-6xl">
              Something to put
            </h2>
          </section>

          <div className="lg:justify-self-end lg:w-full lg:max-w-xl">
            <Form />
          </div>
        </div>
      </div>
    </main>
  );
}
