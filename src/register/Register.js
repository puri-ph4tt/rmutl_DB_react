import React, {Component} from "react";
import axios from "axios";
import {ip,port} from "../setIP/setting";

export default class Register extends Component{
    constructor() {
        super();
        this.state = {
            list:[],
            idkey:"",
            firstname:"",
            lastname:"",
            addby:"",
            province:""
        }
        this.handleChang = this.handleChang.bind(this);
        this.handleClicked = this.handleClicked.bind(this);
    }

    componentDidMount() {
        this.getDataprovince();
    }

    handleChang = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleClicked(){
        let url = `https://localhost:3000/data`;
        let data = {
            idkey:this.state.idkey,
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            addby:sessionStorage.getItem('addby'),
            province:this.state.province
        }
        axios.post(url,data)
        this.setState({
            idkey:"",
            firstname:"",
            lastname:"",
            addby:"",
            province:""
        });
        window.location='https://localhost:3000/Showdata';
    }

    getDataprovince = () => {
        console.log("before fetch dataprovince");
        fetch('/dataprovince')
            .then(res => res.json())
            .then(list => this.setState({ list }))
        console.log("after fetch data");
    }

    render() {
        let {list} = this.state;
        return(
            <div>
                <div className="App">
                <h2 className="my-4">Register<br/></h2>
                    <hr/>
                </div>
                <form className="container">
                    <div className="form-group">
                        <label className="text-white"  htmlFor="id">Id</label>
                        <input type="text" className="form-control" size="10" id="idkey" onChange={this.handleChang} value={this.state.idkey}/>
                    </div>
                    <div className="form-group">
                        <label className="text-white" >First Name</label>
                        <input type="text" className="form-control" id="firstname" onChange={this.handleChang} value={this.state.firstname}/>
                    </div>
                    <div className="form-group">
                        <label className="text-white"  >Last Name</label>
                        <input type="text" className="form-control" id="lastname" onChange={this.handleChang} value={this.state.lastname}/>
                    </div>
                    <div className="form-group">
                        <label className="text-white"  >Province</label>
                        <select className="form-control" id="province" onChange={this.handleChang} value={this.state.province}>
                            <option value="" selected> เลือกจังหวัด </option>
                            {list.map((province) =>{
                                return(
                                    <option value={province.province_ID} >{province.name_th}</option>
                                )})}    
                        </select>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.handleClicked}>Submit</button>
                </form>
            </div>
        );
    }
}
