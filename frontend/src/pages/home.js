import React from 'react';
import axios from 'axios';
import './home.css'
import Navbar from '../component/navbar'

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token : "",
            adminName : "",
            adminCount : 0,
            customerCount : 0,
            productCount : 0
        }
        if (localStorage.getItem('token')){
            this.state.token = localStorage.getItem('token')
        }
        else {
            window.location = "/login"
        }
    }

    headerConfig = () => {
        let header = {
            headers: {Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }

    getAdmin = () => {
        let admin = localStorage.getItem('name')
        let url = "http://localhost:8080/admin/"

        axios.get(url)
        .then(res =>{
            this.setState({
                adminName : admin,
                adminCount : res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
        // console.log(res)
    }

    getCustomer =() =>{
        // let customer = (localStorage.getItem('name'))
        let url = "http://localhost:8080/customer/"

        axios.get(url)
        .then(res => {
            this.setState({
                customerCount : res.data.count
            })
        })
    }

    getProduct = () =>{
        let url = "http://localhost:8080/product/"

        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({
                productCount : res.data.count
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }

    getTransaksi = () =>{
        let url = "http://localhost:8080/transaksi/"

        axios.get(url)
        .then(res => {
            this.setState({
                transaksiCount : res.data.count
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }

    logout = () => {
        window.location = "/login"
        localStorage.clear()
    }

    componentDidMount = () => {
        this.getAdmin()
        this.getCustomer()
        this.getProduct()
        this.getTransaksi()
    }
    render(){
        return(
            <div>
                <Navbar/>
                <br/>
             <div className="text-center">
                 Selamat Datang {this.state.adminName}!
                 <div>
                     <img src="https://c.tenor.com/CFNMnZvQ8Z8AAAAC/yin-and-yang-spinning.gif" className="imi rounded-circle" width="150" height="150"> 
                     </img>
                 </div>
                 <p className="lead">
                        <a className="btn btn-sm btn-secondary border-black bg-black" 
                        onClick={() => this.logout()}>Log out</a>
                        </p>
            <div className="content-wrapper">
            <div className="container-fluid">
              <div className="row">
        
                <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-2 mt-4">
                    <div className="inforide">
                      <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-4 rideone">
                            <img src="https://library.kissclipart.com/20180901/vtq/kissclipart-icon-call-center-png-clipart-computer-icons-call-c-c6c5dd4c7aec2adc.png"/>
                        </div>
                        <div className="col-lg-9 col-md-8 col-sm-8 col-8 fontsty">
                            <h4>Admin</h4>
                            <h2>{this.state.adminCount}</h2>
                        </div>
                      </div>
                    </div>
                </div>
        
                <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-2 mt-4">
                    <div className="inforide">
                      <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-4 ridetwo">
                            <img src="https://logodix.com/logo/1707102.png"/>
                        </div>
                        <div className="col-lg-9 col-md-8 col-sm-8 col-8 fontsty">
                            <h4>Customer</h4>
                            <h2>{this.state.customerCount}</h2>
                        </div>
                      </div>
                    </div>
                </div>
        
                <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-2 mt-4">
                    <div className="inforide">
                      <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-4 ridethree">
                            <img src="http://cdn.onlinewebfonts.com/svg/img_263507.png"/>
                        </div>
                        <div className="col-lg-9 col-md-8 col-sm-8 col-8 fontsty">
                            <h4>Produk</h4>
                            <h2>{this.state.productCount}</h2>
                        </div>
                      </div>
                    </div>
                </div>
        
                <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-2 mt-4">
                    <div className="inforide">
                      <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-4 ridefour">
                            <img src="https://cdn4.iconfinder.com/data/icons/medical-icons-rounded-vector/1250/path_billing-512.png"/>
                        </div>
                        <div className="col-lg-9 col-md-8 col-sm-8 col-8 fontsty">
                            <h4>Jumlah Transaksi</h4>
                            <h2>{this.state.transaksiCount}</h2>
                        </div>
                      </div>
                    </div>
                </div>

            </div>
          </div>
        </div>
        </div>
        </div>
        );
    }
}

{/* <div className="container text-center">
                 Selamat Datang {this.state.adminName}
             </div>  */}