import "./App.css";
import JobForm from "./component/JobForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TableForm from "./forms/TableForm";
import { Provider } from "react-redux";
import { store } from "./redux";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/add" element={<JobForm />}></Route>
            <Route path="/add/:id" element={<JobForm />}></Route>
            <Route path="/tabledata" element={<TableForm />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider> 
    </div>
  );
}

export default App;
