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
    status: (() => {
      const statuses = ['hire', 'rejected', 'onhold', 'in progress'];
      return statuses[Math.floor(Math.random() * statuses.length)];
    })(),
    rating: Number((3 + Math.random() * 2).toFixed(1)),
    rounds: generateInterviewRounds(Math.floor(Math.random() * 3) + 1),
    currentRound: Math.floor(Math.random() * 5) + 1,
    overallScore: Math.floor(Math.random() * 100) + 1
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
  ],

  team: [
    {
      id: 1,
      name: 'Shah Rukh Khan',
      role: 'Technical Director',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Shah_Rukh_Khan_graces_the_launch_of_the_new_Santro.jpg/220px-Shah_Rukh_Khan_graces_the_launch_of_the_new_Santro.jpg',
      seniority: 'Senior Leadership',
      isInterviewer: true,
      department: 'Engineering',
      interviewPanels: ['System Design', 'Leadership']
    },
    {
      id: 2,
      name: 'Aamir Khan',
      role: 'Product Manager',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Aamir_Khan_at_the_DVD_launch_of_PK.jpg/220px-Aamir_Khan_at_the_DVD_launch_of_PK.jpg',
      seniority: 'Senior',
      isInterviewer: true,
      department: 'Product',
      interviewPanels: ['Product Design', 'User Experience']
    },
    {
      id: 3,
      name: 'Deepika Padukone',
      role: 'UI/UX Lead',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Deepika_Padukone_Cannes_2018_2.jpg/220px-Deepika_Padukone_Cannes_2018_2.jpg',
      seniority: 'Senior',
      isInterviewer: true,
      department: 'Design',
      interviewPanels: ['Design', 'Culture Fit']
    },
    {
      id: 4,
      name: 'Ranveer Singh',
      role: 'Frontend Developer',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Ranveer_Singh_promoting_Bajirao_Mastani.jpg/220px-Ranveer_Singh_promoting_Bajirao_Mastani.jpg',
      seniority: 'Mid-Level',
      isInterviewer: true,
      department: 'Engineering',
      interviewPanels: ['Frontend', 'JavaScript']
    },
    {
      id: 5,
      name: 'Priyanka Chopra',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Priyanka-chopra-gestures-during-promotional-event.jpg/220px-Priyanka-chopra-gestures-during-promotional-event.jpg',
      role: 'Engineering Manager',
      seniority: 'Senior Leadership',
      isInterviewer: true,
      department: 'Engineering',
      interviewPanels: ['Technical Leadership', 'System Design']
    },
    {
      id: 6,
      name: 'Ranbir Kapoor',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Ranbir_Kapoor_promoting_Brahmastra.jpg/220px-Ranbir_Kapoor_promoting_Brahmastra.jpg',
      role: 'Backend Developer',
      seniority: 'Mid-Level',
      isInterviewer: false,
      department: 'Engineering'
    },
    {
      id: 7,
      name: 'Alia Bhatt',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Alia_Bhatt_at_Berlinale_2022_Gangubai_Press_Conference.jpg/220px-Alia_Bhatt_at_Berlinale_2022_Gangubai_Press_Conference.jpg',
      role: 'Product Designer',
      seniority: 'Mid-Level',
      isInterviewer: true,
      department: 'Design',
      interviewPanels: ['UI Design', 'Portfolio Review']
    },
    {
      id: 8,
      name: 'Hrithik Roshan',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Hrithik_at_Rado_launch.jpg/220px-Hrithik_at_Rado_launch.jpg',
      role: 'DevOps Engineer',
      seniority: 'Senior',
      isInterviewer: true,
      department: 'Infrastructure',
      interviewPanels: ['DevOps', 'System Architecture']
    },
    {
      id: 9,
      name: 'Katrina Kaif',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Katrina_Kaif_promoting_Bharat_in_2019.jpg/220px-Katrina_Kaif_promoting_Bharat_in_2019.jpg',
      role: 'Data Scientist',
      seniority: 'Senior',
      isInterviewer: false,
      department: 'Analytics'
    },
    {
      id: 10,
      name: 'Akshay Kumar',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Akshay_Kumar.jpg/220px-Akshay_Kumar.jpg',
      role: 'CTO',
      seniority: 'Executive',
      isInterviewer: true,
      department: 'Engineering',
      interviewPanels: ['Architecture Review', 'Final Round']
    },
    {
      id: 11,
      name: 'Amitabh Bachchan',
      role: 'Senior Architecture Lead',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Amitabh_Bachchan_28.jpg/220px-Amitabh_Bachchan_28.jpg',
      seniority: 'Executive',
      isInterviewer: true,
      department: 'Engineering',
      interviewPanels: ['System Architecture', 'Leadership']
    },
    {
      id: 12,
      name: 'Rajinikanth',
      role: 'Principal Engineer',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Rajinikanth_2.0_First_Look_Launch.jpg/220px-Rajinikanth_2.0_First_Look_Launch.jpg',
      seniority: 'Senior',
      isInterviewer: true,
      department: 'Engineering',
      interviewPanels: ['System Design', 'Technical Leadership']
    },
    {
      id: 13,
      name: 'Madhuri Dixit',
      role: 'Product Lead',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Madhuri_Dixit_celebrating_her_birthday_4.jpg/220px-Madhuri_Dixit_celebrating_her_birthday_4.jpg',
      seniority: 'Senior',
      isInterviewer: true,
      department: 'Product',
      interviewPanels: ['Product Strategy', 'User Experience']
    },
    {
      id: 14,
      name: 'Prabhas',
      role: 'Infrastructure Lead',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Prabhas_at_Adipurush_Pre_Release_Event.jpg/220px-Prabhas_at_Adipurush_Pre_Release_Event.jpg',
      seniority: 'Senior',
      isInterviewer: true,
      department: 'Infrastructure',
      interviewPanels: ['Cloud Architecture', 'System Design']
    },
    {
      id: 15,
      name: 'Kajol',
      role: 'UX Research Lead',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Kajol_at_Helicopter_Eela_promotions_%28cropped%29.jpg/220px-Kajol_at_Helicopter_Eela_promotions_%28cropped%29.jpg',
      seniority: 'Senior',
      isInterviewer: true,
      department: 'Design',
      interviewPanels: ['User Research', 'Design Reviews']
    },
    {
      id: 16,
      name: 'Vijay',
      role: 'Backend Lead',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Vijay_at_Beast_Press_Meet.jpg/220px-Vijay_at_Beast_Press_Meet.jpg',
      seniority: 'Senior',
      isInterviewer: true,
      department: 'Engineering',
      interviewPanels: ['Backend Systems', 'Performance']
    }
  ],

  interviewVideos: {
    video1: '/videos/video1.mp4',
    video2: '/videos/video2.mp4',
    audio1: '/videos/screening.mp3',
    audio2: '/videos/screening.mp3'
  },

  screeningCandidates: [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      role: 'Senior Frontend Developer',
      score: Math.floor(Math.random() * 100) + 1,
      nextSteps: 'scheduled',
      type: 'profiling',
      recommendation: 'hire',
      audioUrl: '/videos/screening.mp3'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      role: 'Product Manager',
      score: Math.floor(Math.random() * 100) + 1,
      nextSteps: 'upcoming',
      type: 'reminder',
      recommendation: 'strong hire',
      audioUrl: '/videos/screening.mp3'
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      role: 'DevOps Engineer',
      score: Math.floor(Math.random() * 100) + 1,
      nextSteps: 'rejected',
      type: 'feedback',
      recommendation: 'rejected',
      audioUrl: '/videos/feedback_call.mp3'
    },
    {
      id: 4,
      name: 'Sunita Verma',
      email: 'sunita.verma@email.com',
      role: 'UI/UX Designer',
      score: Math.floor(Math.random() * 100) + 1,
      nextSteps: 'scheduled',
      type: 'profiling',
      recommendation: 'try',
      audioUrl: '/videos/screening.mp3'
    },
    {
      id: 5,
      name: 'Arjun Mehta',
      email: 'arjun.mehta@email.com',
      role: 'Backend Developer',
      score: Math.floor(Math.random() * 100) + 1,
      nextSteps: 'scheduled',
      type: 'profiling',
      recommendation: 'strong hire',
      audioUrl: '/videos/screening.mp3'
    },
    {
      id: 6,
      name: 'Kavita Reddy',
      email: 'kavita.reddy@email.com',
      role: 'Data Scientist',
      score: Math.floor(Math.random() * 100) + 1,
      nextSteps: 'upcoming',
      type: 'reminder',
      recommendation: 'hire',
      audioUrl: '/videos/screening.mp3'
    },
    {
      id: 7,
      name: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      role: 'Full Stack Developer',
      score: Math.floor(Math.random() * 100) + 1,
      nextSteps: 'rejected',
      type: 'feedback',
      recommendation: 'rejected',
      audioUrl: '/videos/feedback_call.mp3'
    },
    {
      id: 8,
      name: 'Neha Gupta',
      email: 'neha.gupta@email.com',
      role: 'System Architect',
      score: Math.floor(Math.random() * 100) + 1,
      nextSteps: 'scheduled',
      type: 'profiling',
      recommendation: 'try',
      audioUrl: '/videos/screening.mp3'
    },
    {
      id: 9,
      name: 'Rahul Verma',
      email: 'rahul.verma@email.com',
      role: 'QA Engineer',
      score: Math.floor(Math.random() * 100) + 1,
      nextSteps: 'upcoming',
      type: 'reminder',
      recommendation: 'hire',
      audioUrl: '/videos/screening.mp3'
    },
    {
      id: 10,
      name: 'Ananya Sharma',
      email: 'ananya.sharma@email.com',
      role: 'Mobile Developer',
      score: Math.floor(Math.random() * 100) + 1,
      nextSteps: 'scheduled',
      type: 'profiling',
      recommendation: 'strong hire',
      audioUrl: '/videos/screening.mp3'
    },
    {
      id: 11,
      name: 'Karthik Iyer',
      email: 'karthik.iyer@email.com',
      role: 'Senior Frontend Developer',
      score: Math.floor(Math.random() * 100) + 1,
      nextSteps: 'rejected',
      type: 'feedback',
      recommendation: 'rejected',
      audioUrl: '/videos/feedback_call.mp3'
    },
    {
      id: 12,
      name: 'Pooja Desai',
      email: 'pooja.desai@email.com',
      role: 'Product Manager',
      score: Math.floor(Math.random() * 100) + 1,
      nextSteps: 'scheduled',
      type: 'profiling',
      recommendation: 'try',
      audioUrl: '/videos/screening.mp3'
    },
    {
      id: 13,
      name: 'Aditya Kumar',
      email: 'aditya.kumar@email.com',
      role: 'DevOps Engineer',
      score: Math.floor(Math.random() * 100) + 1,
      nextSteps: 'upcoming',
      type: 'reminder',
      recommendation: 'hire',
      audioUrl: '/videos/screening.mp3'
    },
    {
      id: 14,
      name: 'Meera Nair',
      email: 'meera.nair@email.com',
      role: 'UI/UX Designer',
      score: Math.floor(Math.random() * 100) + 1,
      nextSteps: 'scheduled',
      type: 'profiling',
      recommendation: 'strong hire',
      audioUrl: '/videos/screening.mp3'
    },
    {
      id: 15,
      name: 'Rohan Malhotra',
      email: 'rohan.malhotra@email.com',
      role: 'Backend Developer',
      score: Math.floor(Math.random() * 100) + 1,
      nextSteps: 'rejected',
      type: 'feedback',
      recommendation: 'rejected',
      audioUrl: '/videos/feedback_call.mp3'
    },
    {
      id: 50,
      name: 'Zara Khan',
      email: 'zara.khan@email.com',
      role: 'Data Scientist',
      score: Math.floor(Math.random() * 100) + 1,
      nextSteps: 'scheduled',
      type: 'profiling',
      recommendation: 'hire',
      audioUrl: '/videos/screening.mp3'
    }
  ]
};

// Generate candidates for each job with a more realistic distribution
MOCK_DATA.candidates = MOCK_DATA.jobs.flatMap(job => {
  // Generate between 8 to 15 candidates per opening
  const candidatesPerOpening = Math.floor(Math.random() * 8) + 8;
  return generateCandidates(job.id, job.openings * candidatesPerOpening);
});

export default MOCK_DATA; 