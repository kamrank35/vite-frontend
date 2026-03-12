// import React,{ useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AddItem from './pages/Additem';
import EditItem from './pages/Edititem';
import ItemList from './pages/Itemlist';
import { Routes,Route } from 'react-router-dom';

function App() {

  return (<>
    <Navbar />
    <Sidebar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add-item" element={<AddItem />} />
      <Route path="/items" element={<ItemList />} />
      <Route path="/edit/:id" element={<EditItem />} />
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
    </>
  )
}

export default App
