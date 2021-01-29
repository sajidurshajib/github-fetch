import React, { Component } from 'react';
import axios from 'axios';
import {Container,Row,Col, Form} from 'react-bootstrap'
import Follow from './Follow/Follow'


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'

import { Icon } from '@iconify/react';
import mapMarker from '@iconify-icons/fa/map-marker';
import portfolioIcon from '@iconify-icons/zondicons/portfolio';
import twitterOutlined from '@iconify-icons/ant-design/twitter-outlined';
import organization24 from '@iconify-icons/octicon/organization-24';
import emailOutline from '@iconify-icons/eva/email-outline';
import userAvatarFilled from '@iconify-icons/carbon/user-avatar-filled';
import userAvatarFilledAlt from '@iconify-icons/carbon/user-avatar-filled-alt';




import './Main.css'
class Main extends Component{

    state = {
        username:'',
        profileUrl:'',
        profile:{}
    }

    onChange = e =>{
        this.setState({[e.target.name]:e.target.value})
    }


    usrSubmit = e =>{
        e.preventDefault()

        this.axiosWorker(this.state.username)
            .then(data=>{
                this.setState({profile:data})
            })    
    }

    axiosWorker(usr){
        return axios.get(`https://api.github.com/users/`+usr)
                    .then(res=>{
                        this.res = res.data
                        return this.res
                    })     
    }

    render(){
        return(
            <div className="Main">
                <div className="searchBar gitDarkColor">
                    <Container>
                        <Row>
                            <Col md="2">
                                <FontAwesomeIcon className="githubIcon" icon={faGithub}/>
                            </Col>
                            <Col md="8">                    
                                <Form onSubmit={this.usrSubmit}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control onChange={this.onChange} name="username" type="text" placeholder="Enter username"/>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="showProfile">
                    <Container>
                        <Row>
                            <Col md="4">
                                {Object.keys(this.state.profile).length!==0 ? (
                                <img src={this.state.profile.avatar_url} alt="proPic"/>
                                ):null}
                            </Col>
                            <Col md="8">
                                <h2>{this.state.profile.name}</h2>
                                <p className="username">{this.state.profile.login}</p>
                                
                                <p className="bio">{this.state.profile.bio}</p>
                                
                                {this.state.profile.company? (
                                    <p className="company"><Icon icon={organization24} /> {this.state.profile.company}</p>
                                ):null}

                                {this.state.profile.location? (
                                    <p className="location"><Icon icon={mapMarker} /> {this.state.profile.location}</p>
                                ):null}

                                {this.state.profile.email? (
                                    <p className="email"><Icon icon={emailOutline} /> {this.state.profile.email}</p>
                                ):null}

                                {this.state.profile.blog?(
                                    <p className="portfolio"><Icon icon={portfolioIcon} /> <a href={this.state.profile.blog}>{this.state.profile.blog}</a></p>
                                ):null}

                                {this.state.profile.twitter_username?(
                                    <p className="twitter"><Icon icon={twitterOutlined} /> <a href={`https://twitter.com/`+this.state.profile.twitter_username}>{this.state.profile.twitter_username}</a></p>
                                ):null}

                                {Object.keys(this.state.profile).length!==0? (
                                    <ul className="follow">
                                        <li title="followers"><Icon icon={userAvatarFilled} /> {this.state.profile.followers}</li>
                                        <li title="following"><Icon icon={userAvatarFilledAlt} /> {this.state.profile.following}</li>
                                    </ul>
                                ):null}     
                                

                                
                            </Col>
                            <Col md="12">
                                {Object.keys(this.state.profile).length===0? (
                                    <div style={{textAlign:"center"}}>
                                        <h2>Wanna search?</h2>
                                        <FontAwesomeIcon
                                            style={{fontSize:"200px"}}
                                            icon={faGithub}/>
                                    </div>
                                ):null}
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Follow followers={this.state.profile.followers_url} following={this.state.profile.following_url}/>
            </div>
        )
    }
}

export default Main;