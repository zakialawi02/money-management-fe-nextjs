export default function DashboardPage() {
  return (
    <>
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
            <ul className="space-y-2 mt-4">
              <li className="p-2 bg-white rounded shadow">
                Buy Coffee - Rp. 30.000
              </li>
              <li className="p-2 bg-white rounded shadow">
                Internet Bill - Rp. 150.000
              </li>
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}
