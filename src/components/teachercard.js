import React from 'react';
import './top.css'; // Import the CSS file

const TeacherCard = ({ imageSrc, teacherName, subjectName }) => {
  return (
    <div className="teacher-card">
      <img src={imageSrc} alt="Teacher" className="teacher-image" />
      <p className="teacher-name">{teacherName}</p>
      <p className="subject-name">{subjectName}</p>
    </div>
  );
};

export default TeacherCard;
