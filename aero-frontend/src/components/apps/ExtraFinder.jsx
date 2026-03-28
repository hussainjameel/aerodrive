import React, { Component } from "react";
import "../../../public/styles/Finder.css";
const Navigators = () =>{
    return (
        <div className="w-full h-full bg-gray 100">
           <button className="btn btn-primary p-0">
               B1
           <span className="i-bi:battery text-2xl" />
           </button>
        </div>
    );
}

const Path = () =>{
    return (
        <div className="w-full h-full bg-white">
            <h2>Path</h2>
        </div>
    );
}
const Searchbar = () =>{
    return (
        <div className="w-full h-full bg-white">
            <h2>Search</h2>
        </div>
    );
}
const Sidebar = () =>{
    return (
        <div className="w-full h-full bg-white">
            <h2>Sidebar</h2>
        </div>
    );
}
const Files = () =>{
    return (
        <div className="w-full h-full bg-black files">
            <h2>Files</h2>
        </div>
    );
}

class Finder extends Component {
    render(){
        return(
            <div className="finder-container w-full h-full">
            <Navigators></Navigators>
            <Path></Path>
            <Searchbar></Searchbar>
            <Sidebar></Sidebar>
            <Files></Files>
            </div>   
        );
    }
}

export default Finder;