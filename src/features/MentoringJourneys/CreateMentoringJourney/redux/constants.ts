import { Milestone } from './types'

const MILESTONES = [
  {
    title: 'Building Foundations',
    goal: 'Collaboratively set short-term and long-term recovery goals.',
    success: {
      mentor: 'Prioritize open communication, active listening, and sharing personal experiences to build a strong mentor-mentee relationship.',
      mentee: 'Encourage mentee input, break down goals into smaller tasks, and ensure goals are realistic and achievable.',
    },
  },
  {
    title: 'Reality Check and Reflection',
    goal: 'Explore new opportunities and strategies for personal development.',
    success: {
      mentor: 'Tailor opportunities to the mentee\'s interests and strengths andcollaborate on exploring new avenues for personal development.',
      mentee: 'Gradually introduce new opportunities, provide support, and break down larger goals into manageable steps.',
    },
  },
  {
    title: 'Exploring Growth Opportunities',
    goal: 'Explore new opportunities and strategies for personal development.',
    success: {
      mentor: 'Tailor opportunities to the mentee\'s interests and strengths and collaborate on exploring new avenues for personal development.',
      mentee: 'Gradually introduce new opportunities, provide support, and break down larger goals into manageable steps.',
    },
  },
  {
    title: 'Strengthening Support Networks',
    goal: 'Develop a support network involving family, friends, and community resources.',
    success: {
      mentor: 'Foster open communication with the mentee\'s support network, providing education about the recovery process and emphasizing positive changes.',
      mentee: 'Facilitate conversations, offer guidance on communication, and provide resources to help the mentee involve their support network.',
    },
  },
  {
    title: 'Overcoming Challenges',
    goal: 'Address potential setbacks and strategize ways to overcome challenges.',
    success: {
      mentor: 'Maintain empathy while setting clear expectations, providing encouragement, and reinforcing the importance of resilience.',
      mentee: 'Regular check-ins, group activities, and emphasizing the importance of reaching out for support when needed.',
    },
  },
  {
    title: 'Celebrating Achievements and Planning Ahead',
    goal: 'Celebrate achievements and set new goals for continued growth.',
    success: {
      mentor: 'Encourage ongoing goal setting, support the mentee in envisioning a future beyond the programme, and explore opportunities for continued development.',
      mentee: 'Gradually reduce programme structure, facilitate discussions about future, and provide resources for ongoing support.',
    },
  },
] as const

export const defaultMilestones: Milestone[] = MILESTONES.map((_, index) => ({
  title: '',
  step: index + 1,
  reflection: '',
  goals: [],
}))
