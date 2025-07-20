import { AlertTriangle } from "lucide-react";

interface ErrorPageProps {
  status?: 503 | 500 | 404 | 403;
}

export default function NotFound({ status = 404 }: ErrorPageProps) {
  const title = {
    503: "503: Service Unavailable",
    500: "500: Server Error",
    404: "404: Page Not Found",
    403: "403: Forbidden",
  }[status];

  const description = {
    503: "Sorry, we are doing some maintenance. Please check back soon.",
    500: "Whoops, something went wrong on our servers.",
    404: "Sorry, the page you are looking for could not be found.",
    403: "Sorry, you are forbidden from accessing this page.",
  }[status];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-main p-6 text-black font-sans">
      <div className="bg-white border-4 border-black p-8 rounded-md max-w-md w-full text-center space-y-6 shadow-none">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-warning border-4 border-black rounded-full">
          <AlertTriangle className="h-10 w-10 text-black" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-lg text-gray-800">{description}</p>
        </div>
      </div>
    </div>
  );
}
