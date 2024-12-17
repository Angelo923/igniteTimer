import { Routes, Route} from 'react-router-dom'
import Home from "../pages/Home.tsx";
import History from "../pages/History.tsx";
import Index from "../layouts/DefaultLayout";

function Router() {
    return (
        <Routes>
          <Route path="/" element={<Index />}>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
          </Route>
        </Routes>
    )
}

export default Router;