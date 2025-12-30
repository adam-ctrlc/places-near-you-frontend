import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, SearchResults, PlaceDetail } from "./pages";

import { MainLayout } from "./layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/place/:id" element={<PlaceDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
