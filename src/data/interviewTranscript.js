export const interviewTranscript = [
  { 
    time: '00:00',
    startTime: 0,
    endTime: 45,
    speaker: 'Interviewer', 
    text: "Hello! Thanks for joining us today. Could you start by introducing yourself and your background?" 
  },
  { 
    time: '00:45',
    startTime: 45,
    endTime: 135,
    speaker: 'Candidate', 
    text: "Hi, thank you for having me. I'm a full-stack developer with 5 years of experience, primarily working with React and Node.js. I've been leading the frontend team at my current company for the past two years, where we've successfully delivered several large-scale applications." 
  },
  {
    time: '02:15',
    startTime: 135,
    endTime: 180,
    speaker: 'Interviewer',
    text: "That's great! Let's dive into system design. Could you explain how you'd design a real-time chat application with millions of users?"
  },
  {
    time: '03:00',
    startTime: 180,
    endTime: 330,
    speaker: 'Candidate',
    text: "I would approach this by first breaking down the requirements. For a real-time chat system at scale, we'd need a robust architecture. I'd start with WebSocket servers for real-time communication, use Redis for managing active connections and caching, and MongoDB for message storage. For scalability, we'd implement message queuing with RabbitMQ..."
  },
  {
    time: '05:30',
    startTime: 330,
    endTime: 375,
    speaker: 'Interviewer',
    text: "Excellent breakdown. How would you handle message delivery guarantees and offline users?"
  },
  {
    time: '06:15',
    startTime: 375,
    endTime: 450,
    speaker: 'Candidate',
    text: "For message delivery, I'd implement an acknowledgment system with message states like 'sent', 'delivered', and 'read'. For offline users, we'd store messages in a persistent queue and implement a notification service. When users come online, we'd sync their message queue and update delivery status..."
  },
  {
    time: '07:30',
    startTime: 450,
    endTime: 495,
    speaker: 'Interviewer',
    text: "Let's switch gears to frontend. How do you manage state in large React applications?"
  },
  {
    time: '08:15',
    startTime: 495,
    endTime: 600,
    speaker: 'Candidate',
    text: "In large applications, I prefer a combination of Redux for global state and React Query for server state. We use Redux for user authentication, theme preferences, and application-wide settings. React Query handles API caching, real-time updates, and optimistic updates. For component-level state, I stick to useState and useReducer..."
  },
  {
    time: '10:00',
    startTime: 600,
    endTime: 645,
    speaker: 'Interviewer',
    text: "Could you share an example of a challenging performance issue you've solved?"
  },
  {
    time: '10:45',
    startTime: 645,
    endTime: 750,
    speaker: 'Candidate',
    text: "Recently, we had a dashboard rendering thousands of data points causing significant lag. I implemented virtualization using react-window, added memo and useCallback for expensive computations, and implemented debouncing for real-time filters. This reduced the render time from 3 seconds to under 200ms..."
  },
  {
    time: '12:30',
    startTime: 750,
    endTime: 795,
    speaker: 'Interviewer',
    text: "How do you approach testing in your applications?"
  },
  {
    time: '13:15',
    startTime: 795,
    endTime: 900,
    speaker: 'Candidate',
    text: "I believe in a comprehensive testing strategy. We use Jest and React Testing Library for unit and integration tests, Cypress for E2E testing, and Lighthouse for performance monitoring. Our CI/CD pipeline enforces a minimum test coverage of 80%. We also implement snapshot testing for UI components..."
  },
  {
    time: '15:00',
    startTime: 900,
    endTime: 945,
    speaker: 'Interviewer',
    text: "Last question: How do you keep up with the rapidly evolving frontend ecosystem?"
  },
  {
    time: '15:45',
    startTime: 945,
    endTime: 1020,
    speaker: 'Candidate',
    text: "I regularly follow tech blogs, participate in React and JavaScript communities, and attend virtual conferences. I also maintain a personal blog where I document my learnings. Every quarter, I dedicate time to explore new technologies and build proof-of-concepts. Recently, I've been exploring Next.js 13 and Remix..."
  },
  {
    time: '17:00',
    startTime: 1020,
    endTime: 1065,
    speaker: 'Interviewer',
    text: "Thank you for your time. Do you have any questions for us?"
  }
]; 