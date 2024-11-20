import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PortfolioForm.css';

function PortfolioForm() {
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState({
    username: '',
    fullName: '',
    email: '',
    role: '',
    aboutMe: '',
    mobile: '',
    linkedin: '',
    github: '',
    gender: '',
    skills: [],
    projects: [],
    experiences: []
  });

  const handlePortfolioChange = (e) => {
    const { name, value } = e.target;
    setPortfolio({
      ...portfolio,
      [name]: value
    });
  };

  const addSkill = () => {
    setPortfolio({
      ...portfolio,
      skills: [...portfolio.skills, { skillName: '', proficiency: '' }]
    });
  };

  const handleSkillChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSkills = portfolio.skills.map((skill, i) => (
      i === index ? { ...skill, [name]: value } : skill
    ));
    setPortfolio({ ...portfolio, skills: updatedSkills });
  };

  const addProject = () => {
    setPortfolio({
      ...portfolio,
      projects: [...portfolio.projects, { projectName: '', description: '', url: '' }]
    });
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = portfolio.projects.map((project, i) => (
      i === index ? { ...project, [name]: value } : project
    ));
    setPortfolio({ ...portfolio, projects: updatedProjects });
  };

  const addExperience = () => {
    setPortfolio({
      ...portfolio,
      experiences: [...portfolio.experiences, { companyName: '', role: '', startDate: '', endDate: '', description: '' }]
    });
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperiences = portfolio.experiences.map((experience, i) => (
      i === index ? { ...experience, [name]: value } : experience
    ));
    setPortfolio({ ...portfolio, experiences: updatedExperiences });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the payload based on the portfolio state
    const payload = {
      username: portfolio.username,
      fullName: portfolio.fullName,
      email: portfolio.email,
      role: portfolio.role,
      about_me: portfolio.aboutMe,
      mobile: portfolio.mobile,
      linkedin: portfolio.linkedin,
      github: portfolio.github,
      gender: portfolio.gender,
      skill_list: portfolio.skills,
      project_list: portfolio.projects,
      experience_Portfolio: portfolio.experiences
    };

    // Send POST request
    fetch('http://localhost:8088/api/portfolio/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('Portfolio submitted successfully!');
        navigate(`/`); 
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to submit portfolio.');
      });
  };

  return (
    <div className="form-container">
      <h1>Portfolio Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Username: <input type="text" name="username" value={portfolio.username} onChange={handlePortfolioChange} required /></label>
        <label>Full Name: <input type="text" name="fullName" value={portfolio.fullName} onChange={handlePortfolioChange} required /></label>
        <label>Email: <input type="email" name="email" value={portfolio.email} onChange={handlePortfolioChange} required /></label>
        <label>Role: <input type="text" name="role" value={portfolio.role} onChange={handlePortfolioChange} required /></label>
        <label>About Me: <textarea name="aboutMe" value={portfolio.aboutMe} onChange={handlePortfolioChange} required /></label>
        <label>Mobile: <input type="text" name="mobile" value={portfolio.mobile} onChange={handlePortfolioChange} required /></label>
        <label>LinkedIn: <input type="text" name="linkedin" value={portfolio.linkedin} onChange={handlePortfolioChange} /></label>
        <label>GitHub: <input type="text" name="github" value={portfolio.github} onChange={handlePortfolioChange} /></label>
        <label>Gender: 
          <select name="gender" value={portfolio.gender} onChange={handlePortfolioChange} required>
            <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </label>
        <h2>Skills</h2>
        {portfolio.skills.map((skill, index) => (
          <div key={index}>
            <label>Skill Name: <input type="text" name="skillName" value={skill.skillName} onChange={(e) => handleSkillChange(index, e)} /></label>
            <label>Proficiency: <input type="text" name="proficiency" value={skill.proficiency} onChange={(e) => handleSkillChange(index, e)} /></label>
          </div>
        ))}
        <button type="button" onClick={addSkill}>Add Skill</button>

        <h2>Projects</h2>
        {portfolio.projects.map((project, index) => (
          <div key={index}>
            <label>Project Name: <input type="text" name="projectName" value={project.projectName} onChange={(e) => handleProjectChange(index, e)} /></label>
            <label>Description: <input type="text" name="description" value={project.description} onChange={(e) => handleProjectChange(index, e)} /></label>
            <label>URL: <input type="text" name="url" value={project.url} onChange={(e) => handleProjectChange(index, e)} /></label>
          </div>
        ))}
        <button type="button" onClick={addProject}>Add Project</button>

        <h2>Experience</h2>
        {portfolio.experiences.map((experience, index) => (
          <div key={index}>
            <label>Company Name: <input type="text" name="companyName" value={experience.companyName} onChange={(e) => handleExperienceChange(index, e)} /></label>
            <label>Role: <input type="text" name="role" value={experience.role} onChange={(e) => handleExperienceChange(index, e)} /></label>
            <label>Start Date: <input type="date" name="startDate" value={experience.startDate} onChange={(e) => handleExperienceChange(index, e)} /></label>
            <label>End Date: <input type="date" name="endDate" value={experience.endDate} onChange={(e) => handleExperienceChange(index, e)} /></label>
            <label>Description: <textarea name="description" value={experience.description} onChange={(e) => handleExperienceChange(index, e)} /></label>
          </div>
        ))}
        <button type="button" onClick={addExperience}>Add Experience</button>
        <div className="field-spacing"></div>
        <button type="submit">Submit Portfolio</button>
      </form>
    </div>
  );
}

export default PortfolioForm;