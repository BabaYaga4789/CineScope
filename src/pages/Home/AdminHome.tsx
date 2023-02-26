import { AdminNavBar } from '../../components/AdminNavBar'
import React from 'react'
import ListOfNewMovies from "../../components/ListOfNewMovies";
import ListOfTopMovies from "../../components/ListOfTopMovies";
export default function AdminHome() {
  return (
    
    <div>
    <AdminNavBar></AdminNavBar>  
    <ListOfNewMovies></ListOfNewMovies>
<ListOfTopMovies></ListOfTopMovies>
    </div>
  )
}
