import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";

export function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isSearch = location.pathname.startsWith("/search");

  // SearchResults page needs a fixed height layout for the map/list split view
  const appLayout = isSearch;

  return (
    <div
      className={`flex flex-col ${
        appLayout ? "h-screen overflow-hidden" : "min-h-screen"
      }`}
    >
      <Header
        variant={isHome ? "transparent" : "default"}
        showSearch={!isHome}
      />
      <div
        className={`flex-1 relative ${appLayout ? "flex overflow-hidden" : ""}`}
      >
        <Outlet />
      </div>
    </div>
  );
}
