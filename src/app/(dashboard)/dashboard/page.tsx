import { Navbar } from "../_components/navbar-dashboard";

export default function Example() {
  return (
    <>
      <Navbar />
      <div className="min-h-full">
        <header className="bg-secondary-background shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Your content */}
          </div>
        </main>
      </div>
    </>
  );
}
