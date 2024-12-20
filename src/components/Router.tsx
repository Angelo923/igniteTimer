import { Routes, Route} from 'react-router-dom'
import Home from "../pages/Home";
import History from "../pages/History/index.tsx";
import DefaultLayout from "../layouts/DefaultLayout";

function Router() {
    return (
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
          </Route>
        </Routes>
    )
}

export default Router;