import type { Component } from 'vue'
import {
  Send,
  Figma,
  Trello,
  Slack,
  Video,
  CreditCard,
  Mail,
  Newspaper,
  Phone,
  Container,
  Github,
  Gitlab,
  MessageCircle,
  MessageSquare,
  BookOpen,
} from 'lucide-vue-next'

// Create simple icon components
const createIcon = (icon: Component) => icon

export interface App {
  name: string
  logo: Component
  connected: boolean
  desc: string
}

export const apps: App[] = [
  {
    name: 'Discord',
    logo: createIcon(MessageCircle),
    connected: false,
    desc: 'Connect with Discord for seamless team communication.',
  },
  {
    name: 'Docker',
    logo: createIcon(Container),
    connected: false,
    desc: 'Effortlessly manage Docker containers on your dashboard.',
  },
  {
    name: 'Figma',
    logo: createIcon(Figma),
    connected: true,
    desc: 'View and collaborate on Figma designs in one place.',
  },
  {
    name: 'GitHub',
    logo: createIcon(Github),
    connected: false,
    desc: 'Streamline code management with GitHub integration.',
  },
  {
    name: 'GitLab',
    logo: createIcon(Gitlab),
    connected: false,
    desc: 'Efficiently manage code projects with GitLab integration.',
  },
  {
    name: 'Gmail',
    logo: createIcon(Mail),
    connected: false,
    desc: 'Access and manage Gmail messages effortlessly.',
  },
  {
    name: 'Medium',
    logo: createIcon(Newspaper),
    connected: false,
    desc: 'Explore and share Medium stories on your dashboard.',
  },
  {
    name: 'Notion',
    logo: createIcon(BookOpen),
    connected: true,
    desc: 'Effortlessly sync Notion pages for seamless collaboration.',
  },
  {
    name: 'Skype',
    logo: createIcon(Phone),
    connected: false,
    desc: 'Connect with Skype contacts seamlessly.',
  },
  {
    name: 'Slack',
    logo: createIcon(Slack),
    connected: false,
    desc: 'Integrate Slack for efficient team communication',
  },
  {
    name: 'Stripe',
    logo: createIcon(CreditCard),
    connected: false,
    desc: 'Easily manage Stripe transactions and payments.',
  },
  {
    name: 'Telegram',
    logo: createIcon(Send),
    connected: false,
    desc: 'Connect with Telegram for real-time communication.',
  },
  {
    name: 'Trello',
    logo: createIcon(Trello),
    connected: false,
    desc: 'Sync Trello cards for streamlined project management.',
  },
  {
    name: 'WhatsApp',
    logo: createIcon(MessageSquare),
    connected: false,
    desc: 'Easily integrate WhatsApp for direct messaging.',
  },
  {
    name: 'Zoom',
    logo: createIcon(Video),
    connected: false,
    desc: 'Host Zoom meetings directly from your dashboard.',
  },
]
