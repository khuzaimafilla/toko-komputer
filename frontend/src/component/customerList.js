import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

export default class CustomerList extends React.Component{
    render (){
        return(
            <div className="card col sm-12 my-1">
                <div className="card-body row">
                    <div className="col-sm-3">
                        <img alt={this.props.name} src={this.props.image} 
                        className= "img-thumbnail" width="100" height="100"/>
                    </div>
                    <div className="col-sm-7">
                        <h5 className="text-bold">Name: {this.props.name}</h5>
                        <h6>Telp : {this.props.phone}</h6>
                        <h6>Alamat : {this.props.address}</h6>
                    </div>
                    <div className="col-sm-2">
                        <button className="btn btn-dark" onClick={this.props.onEdit}>Edit</button>
                        <button className="btn btn-dark" onClick={this.props.onDrop}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}