import React, { useState } from 'react';
import "./css/Information.css"
import NavBar from './NavBar';

function Information() {

    return (
        
        <div class="infoPage">
            <NavBar></NavBar>
            <h1>About Page</h1>

            <p>
                This project is a streaming web application capable of recommending movies to users 
                through a chat window that directly interfaces with the OpenAI LLM API.
            </p>

            <p>
                This was accomplished using a cloud service provider, AWS, under the free tier. 
                The application utilizes various AWS services: EC2 hosts the frontend and backend, 
                S3 stores the video files, CloudFront distributes video content to network edges, Route 53 
                manages routing, and RDS supports our PostgreSQL database instance.
            </p>

            <p>
                The frontend was developed using React, while the backend API was implemented in Django.
            </p>


            <h2>Technologies Used</h2>
            <ul>
                <h3>AWS Related</h3>
                <ul>
                    <li>S3</li>
                    <li>RDS</li>
                    <li>Route 53</li>
                    <li>EC2</li>
                    <li>CloudFront</li>
                </ul>

                <h3>Frontend/Backend Frameworks</h3>
                <ul>
                    <li>JavaScript</li>
                    <li>React</li>
                    <li>Python</li>
                    <li>Django</li>
                    <li>Postgres</li>
                </ul>
            </ul>
        </div>
    );
}

export default Information;