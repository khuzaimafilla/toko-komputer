import React from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends React.Component{

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
            <img src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/shop-icon.png" alt="" width="30" height="30" class="d-inline-block align-text-top"></img>
                <Link className="navbar-brand" href="#">&nbsp; Komputer</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="container">
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link class="nav-link" to="/">Home</Link>
                    <Link class="nav-link" to="/customer">Customer</Link>
                    <Link class="nav-link" to="/">Product</Link>
                    <Link class="nav-link" to="/">Transaksi</Link>
                </div>
                </div>
                </div>
            </div>
        </nav> 
        )
    }
}