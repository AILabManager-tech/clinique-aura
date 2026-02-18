import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-sky-600 text-white hover:bg-sky-700 hover:scale-[1.02]",
  secondary:
    "bg-sage-500 text-white hover:bg-sage-600 hover:scale-[1.02]",
  outline:
    "border-2 border-sky-600 text-sky-600 hover:bg-sky-50",
  ghost:
    "text-sky-600 hover:bg-sky-50",
};

interface BaseProps {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type Props = ButtonProps | LinkProps;

/**
 * Button - Polymorphic button/link component with variant and size support.
 *
 * @component
 * @example
 * ```tsx
 * <Button variant="primary" size="md">Click me</Button>
 * <Button href="/about" variant="outline">Learn more</Button>
 * ```
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: Props) {
  const classes = clsx(
    "inline-flex items-center justify-center rounded-lg font-medium transition-all",
    variants[variant],
    {
      "px-4 py-2 text-sm": size === "sm",
      "px-6 py-3 text-base": size === "md",
      "px-8 py-4 text-lg": size === "lg",
    },
    className
  );

  if ("href" in props && props.href) {
    return <a className={classes} {...(props as LinkProps)} />;
  }

  return <button className={classes} {...(props as ButtonProps)} />;
}
