import { Milestone } from './types'

export const MILESTONES = [
  {
    title: 'Building Foundations',
    goal: 'Collaboratively set short-term and long-term recovery goals.',
    duration: 'Month 1-2 of mentoring journey',
    success: {
      mentor: 'Prioritize open communication, active listening, and sharing personal experiences to build a strong mentor-mentee relationship.',
      mentee: 'Encourage mentee input, break down goals into smaller tasks, and ensure goals are realistic and achievable.',
    },
  },
  {
    title: 'Reality Check and Reflection',
    goal: 'Explore new opportunities and strategies for personal development.',
    duration: 'Month 3-4 of mentoring journey',
    success: {
      mentor: 'Regularly assess progress, maintain open dialogue, and be vigilant about any red flags, offering additional support when needed.',
      mentee: 'Emphasize the normalcy of setbacks, highlight previous successes, and work collaboratively to adjust goals if necessary.',
    },
  },
  {
    title: 'Exploring Growth Opportunities',
    goal: 'Explore new opportunities and strategies for personal development.',
    duration: 'Month 5-6 of mentoring journey',
    success: {
      mentor: 'Tailor opportunities to the mentee\'s interests and strengths and collaborate on exploring new avenues for personal development.',
      mentee: 'Gradually introduce new opportunities, provide support, and break down larger goals into manageable steps.',
    },
  },
  {
    title: 'Strengthening Support Networks',
    goal: 'Develop a support network involving family, friends, and community resources.',
    duration: 'Month 7-8 of mentoring journey',
    success: {
      mentor: 'Foster open communication with the mentee\'s support network, providing education about the recovery process and emphasizing positive changes.',
      mentee: 'Facilitate conversations, offer guidance on communication, and provide resources to help the mentee involve their support network.',
    },
  },
  {
    title: 'Overcoming Challenges',
    goal: 'Address potential setbacks and strategize ways to overcome challenges.',
    duration: 'Month 9-10 of mentoring journey',
    success: {
      mentor: 'Maintain empathy while setting clear expectations, providing encouragement, and reinforcing the importance of resilience.',
      mentee: 'Regular check-ins, group activities, and emphasizing the importance of reaching out for support when needed.',
    },
  },
  {
    title: 'Celebrating Achievements and Planning Ahead',
    goal: 'Celebrate achievements and set new goals for continued growth.',
    duration: 'Month 11-12 of mentoring journey',
    success: {
      mentor: 'Encourage ongoing goal setting, support the mentee in envisioning a future beyond the programme, and explore opportunities for continued development.',
      mentee: 'Gradually reduce programme structure, facilitate discussions about future, and provide resources for ongoing support.',
    },
  },
] as const

export const createDefaultMilestones = (): Milestone[] => MILESTONES.map((_, index) => ({
  milestoneTitle: '',
  milestoneStep: index + 1,
  reflection: '',
  goals: [],
  milestoneId: 0,
}))
