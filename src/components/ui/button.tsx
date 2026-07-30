import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary";
  icon?: ReactNode;
};

export function ButtonLink({
  children,
  className = "",
  icon,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={`button-link button-link--${variant} ${className}`.trim()}
      {...props}
    >
      <span>{children}</span>
      {icon ? (
        <span className="button-link__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
    </a>
  );
}
