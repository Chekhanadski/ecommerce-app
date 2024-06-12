import React from 'react';
import styles from './styles.module.css';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  contributions: string[];
  github: string;
  photo: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Andrei Chekhanadski',
    role: 'Team Lead',
    bio: 'Andrei is an aspiring front-end developer passionate about creating beautiful and intuitive web applications. He has experience working with HTML, CSS, JavaScript, and React, and in building responsive and mobile-first websites.',
    contributions: [
      'Repository setup',
      'Task board setup',
      'Registration page',
      'Catalog page',
      'Interactive product cards',
      'Displaying product information',
      'About page',
      'Responsive site layout',
    ],
    github: 'https://github.com/chekhanadski',
    photo: 'https://media.licdn.com/dms/image/D4D03AQF9X9wMTDc4kg/profile-displayphoto-shrink_400_400/0/1686626382909?e=1723680000&v=beta&t=6Sbb0kzto0kwLAd-C4wF6LsQzqiOvJaEtBI7ATEZ_Sg',
  },
  {
    name: 'Pavel Mikhailau',
    role: 'Front-End Developer',
    bio: 'Pavel is an aspiring front-end developer with strong skills in HTML, CSS, JavaScript, TypeScript, and React.',
    contributions: [
      'CommerceTools project setup and API client',
      'Comprehensive README',
      'Main page enhancements',
      'Routing implementation',
      'Enlarged image modal with slider',
    ],
    github: 'https://github.com/mikhailau-pavel',
    photo: '/img/pasha150x150.png',
  },
  {
    name: 'Vitalii Moroz',
    role: 'Front-End Developer',
    bio: 'Vitalii is an aspiring front-end developer with strong skills in HTML, CSS, JavaScript, TypeScript, and React.',
    contributions: [
      'Development scripts',
      'Development environment configuration',
      'Login page',
      'User profile page implementation',
    ],
    github: 'https://github.com/v-m-dev',
    photo: 'https://via.placeholder.com/150',
  }
];

function TeamMemberComponent({ member }: { member: TeamMember }) {
  return (
    <div className={styles.teamMember}>
      <img src={member.photo} alt={member.name} className={styles.teamMemberPhoto} />
      <div className={styles.teamMemberDetails}>
        <h3>{member.name}</h3>
        <p><strong>Role:</strong> {member.role}</p>
        <p>{member.bio}</p>
        <p><strong>Contributions to the project:</strong></p>
        <ul>
          {member.contributions.map((contribution) => (
            <li key={contribution}>{contribution}</li>
          ))}
        </ul>
        <p><a href={member.github} target="_blank" rel="noopener noreferrer">GitHub</a></p>
      </div>
    </div>
  );
}

function About() {
  return (
    <main className={styles.mainSection}>
      <h1 className={styles.h1}>Our Team</h1>
      <p className={styles.intro}>
      Our team is a group of talented and dedicated aspiring front-end developers, each of whom contributed uniquely to the creation of the website &quot;Exclusive&quot; as part of the JS course at RSSchool. Under the guidance of our mentor, Semion Krapivin, we worked cohesively and effectively, achieving our set goals. Get to know each team member and learn more about their roles, contributions, and professional journeys.
      </p>
      {teamMembers.map((member) => (
        <TeamMemberComponent key={member.name} member={member} />
      ))}
      <div className={styles.collaborationSuccess}>
        <h3>Collaboration and Success</h3>
        <p>
          The success of our team is the result of effective collaboration and a shared commitment to excellence. Under the leadership of our mentor, Semion Krapivin, we employed agile methodologies to ensure continuous improvement and timely delivery of features. Regular team meetings, code reviews, and collaborative problem-solving sessions played a crucial role in overcoming challenges and fostering innovation.
        </p>
        <p>
          Together, we created a product that is not only functional and reliable but also user-friendly and aesthetically appealing. Our journey has been marked by continuous learning and growth, and we are proud of the product we have built. We look forward to continuing to innovate and create solutions that make a difference.
        </p>
      </div>
    </main>
  );
}

export default About;
