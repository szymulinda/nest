import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFoundPage = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Strona nie została znaleziona</p>
        <Link to="/" className="text-primary font-medium hover:underline">
          Wróć na stronę główną
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
