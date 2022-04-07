export interface NavItemProps {
  title: string;
  to?: string;
  onClick?: () => void;
  isActive: boolean;
}
