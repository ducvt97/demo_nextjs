import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface ButtonProps extends React.PropsWithChildren {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  iconLeft?: IconDefinition;
  iconRight?: IconDefinition;
  children?: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  size = "medium",
  iconLeft,
  iconRight,
  children,
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-1 focus:bg-primary-accent-300 focus:shadow-primary-1 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong ${className}`}
    >
      {iconLeft && <FontAwesomeIcon icon={iconLeft} className="mr-1 text-xs" />}
      {children}
      {iconRight && <FontAwesomeIcon icon={iconRight} className="ml-1" />}
    </button>
  );
};

export default Button;
