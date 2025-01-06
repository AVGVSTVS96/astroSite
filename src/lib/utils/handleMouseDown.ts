interface HandleMouseDownProps {
  href?: string | undefined;
}

export const handleMouseDown =
  // Use generic type to support any HTML element
  <T extends Element>({ href }: HandleMouseDownProps) =>
    (e: React.MouseEvent<T>) => {
      if (e.button !== 0) return;
      if (href) { window.location.href = href; }
    };
