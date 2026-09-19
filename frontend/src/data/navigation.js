import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  Users,
  Video,
  FileText,
  ShieldAlert,
  Megaphone,
  Sparkles,
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: null },
  { id: 'tasks', label: 'My Tasks', icon: CheckSquare, badge: '5' },
  { id: 'events', label: 'Events', icon: CalendarDays, badge: null },
  { id: 'volunteers', label: 'Volunteers', icon: Users, badge: '42' },
  { id: 'meetings', label: 'Meetings', icon: Video, badge: null },
  { id: 'documents', label: 'Documents', icon: FileText, badge: null },
  { id: 'risks', label: 'Risks', icon: ShieldAlert, badge: '4', badgeVariant: 'warning' },
  { id: 'announcements', label: 'Announcements', icon: Megaphone, badge: null },
  { id: 'ai-assistant', label: 'AI Assistant', icon: Sparkles, badge: 'Copilot', badgeVariant: 'ai' },
];
