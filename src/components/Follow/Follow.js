import React, { Component } from 'react';
import axios from 'axios';
import {Container} from 'react-bootstrap'
import './Follow.css'

class Follow extends Component{
    state ={
        followers:null,
        following:null
    }

    componentDidMount(){
        this.followersFetch(this.props.followers)
    }

    followersFetch(flr){
        console.log(flr)
    }


    render(){
        console.log(this.state.followers)
        return(
            <div className="Follow">
                <Container>
                    
                </Container>
            </div>
        )
    }
}

export default Follow;