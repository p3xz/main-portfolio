import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ButtonWithIconProps {
  label?: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export const ButtonWithIconDemo = ({
  label = "Let's Collaborate",
  href,
  className = "",
  onClick,
}: ButtonWithIconProps) => {
  const baseClasses = `group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 bg-white text-neutral-950 hover:bg-neutral-200 shadow-sm focus-visible:outline-2 focus-visible:outline-white active:scale-95 cursor-pointer ${className}`;

  const innerContent = (
    <>
      <span>{label}</span>
      <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-950 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses} onClick={onClick}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      {innerContent}
    </button>
  );
};

export default ButtonWithIconDemo;
