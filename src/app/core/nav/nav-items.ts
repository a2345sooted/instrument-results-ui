export type NavItem = {
  label: string;
  route: string;
  icon?: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'View Runs', route: '/runs', icon: 'list' },
  { label: 'Create Run', route: '/runs/create', icon: 'add' },
  { label: 'About', route: '/about', icon: 'info' },
];
