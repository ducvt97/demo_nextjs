import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface ButtonProps extends React.PropsWithChildren {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "delete";
  size?: "sm" | "md" | "lg";
  iconLeft?: IconDefinition;
  iconRight?: IconDefinition;
  children?: React.ReactNode;
  className?: string;
  onClick?: React.ReactEventHandler;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  children,
  className = "",
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`btn ${size} ${variant} ${className}`}
    >
      {iconLeft && <FontAwesomeIcon icon={iconLeft} className="mr-1 text-xs" />}
      {children}
      {iconRight && <FontAwesomeIcon icon={iconRight} className="ml-1" />}
    </button>
  );
};

export default Button;
