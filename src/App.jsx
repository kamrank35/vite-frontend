import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import AddItem from './pages/Additem'
import EditItem from './pages/Edititem'
import ItemList from './pages/Itemlist'
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <div className="row">

          <Sidebar />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-item" element={<AddItem />} />
              <Route path="/items" element={<ItemList />} />
              <Route path="/edit/:id" element={<EditItem />} />
              <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
          </main>

        </div>
      </div>
    </>
  )
}

export default App