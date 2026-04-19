import React from 'react';
import {
  Dumbbell,
  Apple,
  Heart,
  Target,
  Home,
  BookOpen,
  Zap,
  FileText,
  Search,
  Package,
  TrendingUp,
  Award,
  CheckCircle,
  Settings,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Plus,
  Minus,
  Filter,
  Download,
  Share2,
  Copy,
} from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
  color?: string;
  fill?: string;
}

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number; color?: string; fill?: string }>> = {
  // Category icons
  workouts: Dumbbell,
  nutrition: Apple,
  mindset: Heart,

  // Feature icons
  target: Target,
  home: Home,
  book: BookOpen,
  zap: Zap,
  heart: Heart,
  
  // Blog icons
  all: FileText,
  posts: FileText,
  search: Search,
  
  // Navigation icons
  menu: Menu,
  close: X,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  
  // Other icons
  check: CheckCircle,
  settings: Settings,
  bell: Bell,
  user: User,
  logout: LogOut,
  plus: Plus,
  minus: Minus,
  filter: Filter,
  download: Download,
  share: Share2,
  copy: Copy,
  trending: TrendingUp,
  award: Award,
  package: Package,
};

export default function Icon({
  name,
  size = 24,
  className = '',
  strokeWidth = 2,
  color = 'currentColor',
  fill = 'none',
}: IconProps) {
  const IconComponent = iconMap[name.toLowerCase()];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      className={className}
      strokeWidth={strokeWidth}
      color={color}
      fill={fill}
    />
  );
}
