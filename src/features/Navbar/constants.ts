import { Role } from '../../app/types'
import paths from '../../paths'

export interface NavbarLinks {
  name: string
  iconName: string
  path: string
}

export interface NavbarLinkSection {
  title: string
  links: NavbarLinks[]
}

export const navbarLinksRecord: Record<Role, NavbarLinkSection[]> = {
  Admin: [
    {
      title: 'Overview',
      links: [
        {
          name: 'Mentoring Journeys',
          iconName: 'conversion_path',
          path: paths.MentoringJourney,
        },
        {
          name: 'Mentors',
          iconName: 'groups',
          path: paths.Mentors,
        },
        {
          name: 'Mentees',
          iconName: 'groups_2',
          path: paths.Mentees,
        },
        {
          name: 'Pairing',
          iconName: 'handshake',
          path: paths.Pairing,
        },
      ],
    },
    {
      title: 'Account Settings',
      links: [
        {
          name: 'My Profile',
          iconName: 'account_circle',
          path: paths.Profile,
        },
      ],
    },
  ],
  Mentor: [
    {
      title: 'My Activities',
      links: [
        {
          name: 'Mentoring Journeys',
          iconName: 'conversion_path',
          path: paths.MentoringJourney,
        },
        {
          name: 'Sessions',
          iconName: 'schedule',
          path: paths.Sessions,
        },
        {
          name: 'Assigned Mentees',
          iconName: 'group',
          path: paths.AssignedMentees,
        },
        {
          name: 'Training',
          iconName: 'exercise',
          path: paths.Training,
        },
      ],
    },
    {
      title: 'Account Settings',
      links: [
        {
          name: 'My Profile',
          iconName: 'account_circle',
          path: paths.Profile,
        },
      ],
    },
  ],
  Mentee: [
    {
      title: 'My Activities',
      links: [
        {
          name: 'Session',
          iconName: 'schedule',
          path: paths.Sessions,
        },
        {
          name: 'Milestones',
          iconName: 'mountain_flag',
          path: paths.Milestones,
        },
        {
          name: 'Feedback',
          iconName: 'rate_review',
          path: paths.Feedback,
        },
        {
          name: 'Mentor Profile',
          iconName: 'person',
          path: paths.MentorProfile,
        },
      ],
    },
    {
      title: 'Account Settings',
      links: [
        {
          name: 'My Profile',
          iconName: 'account_circle',
          path: paths.Profile,
        },
      ],
    },
  ],
}
