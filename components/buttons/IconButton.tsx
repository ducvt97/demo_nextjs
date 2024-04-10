import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
  variant?: "primary" | "outline" | "warning" | "error";
  icon: IconDefinition;
  className?: string;
}

const IconButton: React.FC<Props> = ({
  variant = "primary",
  icon,
  className,
}) => {
  return (
    <button
      type="button"
      data-twe-ripple-init
      data-twe-ripple-color="light"
      className={`icon-btn ${variant} ${className ?? ""}`}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default IconButton;
