import React from 'react'
import axios from 'axios'
import { Modal, Button, Form } from "react-bootstrap";
import CustomerList from '../component/customerList'
import Navbar from '../component/navbar'

export default class Customer extends React.Component {
    constructor() {
        super()
        this.state = {
            customers: [],
            isModalOpen: false,
            name: "",
            phone: "",
            address: "",
            username: "",
            image: null,
            password: "",
            action: "insert"

        }
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
        }
        // jika belum login 
        else {
            window.location = '/login'
        }
    }
    handleAdd = () => {
        this.setState({
            isModalOpen : true,
            name: "",
            phone: "",
            address: "",
            username: "",
            image: null,
            password: "",
            action: "insert"
        })
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleFile = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    handleDrop = (customer_id) => {
        let url = "http://localhost:8080/customer/" + customer_id

        if (window.confirm('Apakah anda yakin akan menghapus data ini?')){
            axios.delete(url)
            .then(res => {
                console.log(res.data.message)
                this.getCustomer()
          })
          .catch(err => {
              console.log(err.message)
          })
        }
    }

    handleEdit = (selectedItem) =>{
        this.setState({
            isModalOpen: true,
            customer_id: selectedItem.customer_id,
            name: selectedItem.name,
            phone: selectedItem.phone,
            address: selectedItem.address,
            image: null,
            username: selectedItem.username,
            password: "",
            action: "update"
        })
        // console.log(selectedItem)
    }

    handleSave = (e) => {
        e.preventDefault()
        let form = new FormData()
        form.append("name",this.state.name)
        form.append("phone",this.state.phone)
        form.append("address",this.state.address)
        form.append("username",this.state.username)
        form.append("password",this.state.password)
        form.append("image",this.state.image)
        
        let url = ""
   
        if (this.state.action === "insert") {
            url = "http://localhost:8080/customer"

            axios.post(url, form)
            .then(res => {
                this.getCustomer()
               this.handleClose()
            })
            .catch(err => {
               console.log(err.message)
            })
        }
        else if (this.state.action === "update"){
            url = "http://localhost:8080/customer/" + this.state.customer_id

            axios.put(url, form)
            .then(res => {
                this.getCustomer()
               this.handleClose()
            })
            .catch(err => {
               console.log(err.message)
            })
        }

    }

    getCustomer = () => {
        let url = "http://localhost:8080/customer/"

        axios.get(url)
            .then(res => {
                this.setState({
                    customers: res.data.customer
                })
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    componentDidMount = () => {
        this.getCustomer()
    }
    render() {
        return (
            <div className="bg">
                <Navbar/>
                <div className="container">
                    <div className='mb-4 mt-4'>
                        <h6>Data Customer</h6>
                    </div>
                    <button className="btn btn-dark" onClick={() => this.handleAdd()}>
                        Tambah Customer
                    </button>
                    <div>
                        {this.state.customers.map((item, index) => {
                            return(
                            <CustomerList key={index}
                                nameImage={item.image}
                                image={"http://localhost:8080/image/customer/" + item.image}
                                name={item.name}
                                phone={item.phone}
                                address={item.address}
                                onEdit={() => this.handleEdit(item)}
                                onDrop={() => this.handleDrop(item.customer_id)}
                            />
                            )
                        })}
                    </div>
                </div>
                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Form Customer</Modal.Title>
          </Modal.Header>
          <Form onSubmit={(e) => this.handleSave(e)}>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" name="name" placeholder="Masukkan Nama" value={this.state.name} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>No. HP</Form.Label>
                <Form.Control type="text" name="phone" placeholder="Masukkan No HP" value={this.state.phone} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Alamat</Form.Label>
                <Form.Control type="text" name="address" placeholder="Masukkan Alamat" value={this.state.address} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="image">
                <Form.Label>Foto</Form.Label>
                <Form.Control type="file" name="image" placeholder="Masukkan Foto" value={this.state.Image} onChange={this.handleFile} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" placeholder="Masukkan Username" value={this.state.username} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Masukkan Password" value={this.state.password} onChange={this.handleChange} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
            </div>
        )
    }
}