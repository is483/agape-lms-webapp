import { Role } from '../../app/types'
import paths from '../../paths'

export interface NavbarLinks {
  name: string
  mobileName?: string
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
          mobileName: 'Journeys',
          iconName: 'conversion_path',
          path: paths.MentoringJourneys.ViewAll,
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
          mobileName: 'Profile',
          iconName: 'account_circle',
          path: paths.MyProfile,
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
          mobileName: 'Journeys',
          iconName: 'conversion_path',
          path: paths.MentoringJourneys.ViewAll,
        },
        {
          name: 'Sessions',
          iconName: 'schedule',
          path: paths.Sessions.ViewAll,
        },
        {
          name: 'Assigned Mentees',
          mobileName: 'Mentees',
          iconName: 'group',
          path: paths.AssignedMentees.subPath,
        },
      ],
    },
    {
      title: 'Account Settings',
      links: [
        {
          name: 'My Profile',
          mobileName: 'Profile',
          iconName: 'account_circle',
          path: paths.MyProfile,
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
          path: paths.Sessions.ViewAll,
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
          mobileName: 'Mentor',
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
          mobileName: 'Profile',
          iconName: 'account_circle',
          path: paths.MyProfile,
        },
      ],
    },
  ],
} as const
