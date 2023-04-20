import { Route, Routes, BrowserRouter } from "react-router-dom";
import Table from "./pages/table";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { TableContextProvider } from "./context/TableContext";
function App() {
  return (
    <>
      <TableContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Table />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </TableContextProvider>
    </>
  );
}

export default App;
