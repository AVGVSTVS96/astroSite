interface HandleMouseDownProps {
  href?: string | undefined;
}

export const handleMouseDown =
  // Use generic type to support any HTML element
  <T extends Element>({ href }: HandleMouseDownProps) =>
    (e: React.MouseEvent<T>) => {
      if (href &&
        e.button === 0 &&
        !e.ctrlKey &&
        !e.shiftKey
      ) {
        e.preventDefault();
        window.location.href = href;
      } else {
        return;
      }
    };
