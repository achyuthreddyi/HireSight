import { faker } from '@faker-js/faker';

// Helper function to generate rounds
const generateInterviewRounds = (count = 2) => {
  const roundTypes = [
    'Initial Screening',
    'Technical Round 1',
    'Technical Round 2',
    'System Design',
    'Culture Fit',
    'HR Round',
    'Team Fit',
    'Final Discussion'
  ];

  const interviewers = [
    'Alice Smith',
    'Bob Johnson',
    'Carol Williams',
    'David Chen',
    'Emma Davis',
    'Frank Miller',
    'Grace Lee',
    'Henry Wilson'
  ];

  return Array(count).fill(null).map((_, index) => ({
    id: index + 1,
    type: roundTypes[index % roundTypes.length],
    interviewer: interviewers[Math.floor(Math.random() * interviewers.length)],
    date: faker.date.future().toISOString().split('T')[0],
    comments: faker.lorem.sentence(10),
    status: Math.random() > 0.3 ? 'Passed' : 'Scheduled'
  }));
};

// Generate candidates for a specific job
const generateCandidates = (jobId, count) => {
  return Array(count).fill(null).map((_, index) => ({
    id: `${jobId}-${index + 1}`,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number('+1 ### ### ####'),
    role: MOCK_DATA.jobs.find(job => job.id === jobId).title,
    jobId,
    status: Math.random() > 0.5 ? 'In Progress' : 'Scheduled',
    rating: Number((3 + Math.random() * 2).toFixed(1)),
    rounds: generateInterviewRounds(Math.floor(Math.random() * 3) + 1)
  }));
};

export const MOCK_DATA = {
  jobs: [
    { 
      id: 1, 
      title: 'Senior Frontend Developer', 
      department: 'Engineering', 
      openings: 4,
      requiredSkills: ['React', 'TypeScript', 'CSS', 'System Design'],
      experience: '5-8 years'
    },
    { 
      id: 2, 
      title: 'Product Manager', 
      department: 'Product', 
      openings: 2,
      requiredSkills: ['Product Strategy', 'Agile', 'User Research'],
      experience: '4-7 years'
    },
    { 
      id: 3, 
      title: 'DevOps Engineer', 
      department: 'Infrastructure', 
      openings: 3,
      requiredSkills: ['AWS', 'Kubernetes', 'CI/CD', 'Docker'],
      experience: '3-6 years'
    },
    { 
      id: 4, 
      title: 'UI/UX Designer', 
      department: 'Design', 
      openings: 2,
      requiredSkills: ['Figma', 'User Research', 'Prototyping'],
      experience: '3-5 years'
    },
    { 
      id: 5, 
      title: 'Backend Developer', 
      department: 'Engineering', 
      openings: 3,
      requiredSkills: ['Node.js', 'Python', 'MongoDB', 'SQL'],
      experience: '4-7 years'
    },
    { 
      id: 6, 
      title: 'Data Scientist', 
      department: 'Analytics', 
      openings: 2,
      requiredSkills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
      experience: '3-6 years'
    }
  ],
  
  interviewers: [
    { id: 1, name: 'Alice Smith', department: 'Engineering', role: 'Tech Lead' },
    { id: 2, name: 'Bob Johnson', department: 'Engineering', role: 'Senior Developer' },
    { id: 3, name: 'Carol Williams', department: 'Product', role: 'Product Director' },
    { id: 4, name: 'David Chen', department: 'Engineering', role: 'Architecture Lead' },
    { id: 5, name: 'Emma Davis', department: 'Design', role: 'Design Lead' },
    { id: 6, name: 'Frank Miller', department: 'Infrastructure', role: 'DevOps Lead' },
    { id: 7, name: 'Grace Lee', department: 'Analytics', role: 'Data Science Lead' },
    { id: 8, name: 'Henry Wilson', department: 'Engineering', role: 'Engineering Manager' }
  ],

  roundTypes: [
    'Initial Screening',
    'Technical Round 1',
    'Technical Round 2',
    'System Design',
    'Culture Fit',
    'HR Round',
    'Team Fit',
    'Final Discussion'
  ]
};

// Generate candidates for each job
MOCK_DATA.candidates = MOCK_DATA.jobs.flatMap(job => 
  generateCandidates(job.id, job.openings * 4) // 4 candidates per opening
);

export default MOCK_DATA; 