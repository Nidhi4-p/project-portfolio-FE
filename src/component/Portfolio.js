// Portfolio.js
import React, { useEffect, useState } from 'react';
import './Portfolio.css';  
import { useParams } from 'react-router-dom';

function Portfolio() {
  const { username } = useParams();  // Get the username from the URL parameter
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    

    fetch(`http://localhost:8088/api/portfolio/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching portfolio for username: ${username}`);
        }
        return response.json();
      })
      .then((data) => {
        setPortfolio(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!portfolio) {
    return <p>No portfolio found for username: {username}</p>;
  }

  return (
    <div className="portfolio-container">
      <h1>{portfolio.fullName}</h1>
      <div className="basic-details">
  
        <p><span>Username:</span> {portfolio.username}</p>
        <p><span>Email:</span> {portfolio.email}</p>
        <p><span>Role:</span> {portfolio.role}</p>
        <p><span>About Me:</span> {portfolio.about_me}</p>
        <p><span>Mobile:</span> {portfolio.mobile}</p>
        <p>
          <span>LinkedIn:</span> <a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer">{portfolio.linkedin}</a>
        </p>
        <p>
          <span>Github:</span> <a href={portfolio.github} className="github-link" target="_blank" rel="noopener noreferrer">{portfolio.github}</a>
        </p>
      </div>
        <div className="details-image">
      {portfolio.gender === 'female' ? (
        <img src="path_to_female_animation.gif" alt="Female Animated" />
      ) : portfolio.gender === 'male' ? (
        <img src="path_to_male_animation.gif" alt="Male Animated" />
      ) : null}
    </div>
      <h3>Skills</h3>
      <ul>
        {portfolio.skill_list && portfolio.skill_list.length > 0 ? (
          portfolio.skill_list.map((skill_list) => (
            <li key={skill_list.id}>
              <strong>{skill_list.skillName}</strong> - {skill_list.proficiency}
            </li>
          ))
        ) : (
          <p>No skills listed.</p>
        )}
      </ul>
      <h3>Projects</h3>
      <ul>
        {portfolio.project_list && portfolio.project_list.length > 0 ? (
          portfolio.project_list.map((project_list) => (
            <li key={project_list.id}>
              <strong>{project_list.projectName}</strong><div className="spacer"></div>{project_list.description}<div className="spacer"></div>
              <p>
              Url: <a href={project_list.url} target="_blank" className="project-link">{project_list.url}</a>
            </p>
            </li>
          ))
        ) : (
          <p>No skills listed.</p>
        )}
      </ul>
      <h3>Professional Experience</h3>
      <ul>
        {portfolio.experience_Portfolio && portfolio.experience_Portfolio.length > 0 ? (
          portfolio.experience_Portfolio.map((experience_Portfolio) => (
            <li key={experience_Portfolio.id}>
              Company Name - <strong>{experience_Portfolio.companyName}</strong>
              <div className="spacer"></div>
              Role - {experience_Portfolio.role}
              <div className="spacer"></div>
              Start Date - {experience_Portfolio.startDate}
              <div className="spacer"></div>
              End Date - {experience_Portfolio.endDate}
              <div className="spacer"></div>
              Description - {experience_Portfolio.description}
            </li>
          ))
        ) : (
          <p>No Experience</p>
        )}
      </ul>
    </div>
  );
}

export default Portfolio;