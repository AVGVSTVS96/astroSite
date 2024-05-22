export const isActiveLink = (currentPath: string, linkHref: string) => {
  const isActive =
    currentPath === linkHref ||
    currentPath === `${linkHref}/` ||
    (linkHref === '/blog' && currentPath.startsWith('/posts/'));

  return isActive
    ? 'text-foreground'
    : 'text-muted-foreground hover:text-foreground/80';
};
