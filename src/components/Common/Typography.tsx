import {ReactNode, FC} from "react";

// Shared props for all typography components
interface BaseTypographyProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right" | "justify";
  color?: string;
  gutterBottom?: boolean;
  noWrap?: boolean;
}

// Helper to generate classes based on common props
const getBaseClasses = ({
  align = "left",
  gutterBottom = false,
  noWrap = false,
  className = "",
}: BaseTypographyProps) => {
  const baseClasses = [
    // Alignment
    align === "left" ? "text-left" : "",
    align === "center" ? "text-center" : "",
    align === "right" ? "text-right" : "",
    align === "justify" ? "text-justify" : "",

    // Spacing
    gutterBottom ? "mb-4" : "",

    // Text wrapping
    noWrap ? "whitespace-nowrap overflow-hidden text-ellipsis" : "",

    // Additional classes
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return baseClasses;
};

// Individual subcomponents
interface H1Props extends BaseTypographyProps {
  weight?: "normal" | "medium" | "semibold" | "bold";
}

const H1: FC<H1Props> = ({children, weight = "bold", ...props}) => {
  const baseClasses = getBaseClasses(props as BaseTypographyProps);
  const weightClass =
    weight === "normal"
      ? "font-normal"
      : weight === "medium"
      ? "font-medium"
      : weight === "semibold"
      ? "font-semibold"
      : "font-bold";

  return (
    <h1
      className={`text-3xl md:text-4xl lg:text-5xl tracking-tight ${weightClass} ${baseClasses}`}
      style={props.color ? {color: props.color} : undefined}
    >
      {children}
    </h1>
  );
};

interface H2Props extends BaseTypographyProps {
  weight?: "normal" | "medium" | "semibold" | "bold";
}

const H2: FC<H2Props> = ({children, weight = "bold", ...props}) => {
  const baseClasses = getBaseClasses(props as BaseTypographyProps);
  const weightClass =
    weight === "normal"
      ? "font-normal"
      : weight === "medium"
      ? "font-medium"
      : weight === "semibold"
      ? "font-semibold"
      : "font-bold";

  return (
    <h2
      className={`text-2xl md:text-3xl lg:text-4xl tracking-tight ${weightClass} ${baseClasses}`}
      style={props.color ? {color: props.color} : undefined}
    >
      {children}
    </h2>
  );
};

interface H3Props extends BaseTypographyProps {
  weight?: "normal" | "medium" | "semibold" | "bold";
}

const H3: FC<H3Props> = ({children, weight = "semibold", ...props}) => {
  const baseClasses = getBaseClasses(props as BaseTypographyProps);
  const weightClass =
    weight === "normal"
      ? "font-normal"
      : weight === "medium"
      ? "font-medium"
      : weight === "semibold"
      ? "font-semibold"
      : "font-bold";

  return (
    <h3
      className={`text-xl md:text-2xl lg:text-3xl ${weightClass} ${baseClasses}`}
      style={props.color ? {color: props.color} : undefined}
    >
      {children}
    </h3>
  );
};

interface H4Props extends BaseTypographyProps {
  weight?: "normal" | "medium" | "semibold" | "bold";
}

const H4: FC<H4Props> = ({children, weight = "semibold", ...props}) => {
  const baseClasses = getBaseClasses(props as BaseTypographyProps);
  const weightClass =
    weight === "normal"
      ? "font-normal"
      : weight === "medium"
      ? "font-medium"
      : weight === "semibold"
      ? "font-semibold"
      : "font-bold";

  return (
    <h4
      className={`text-lg md:text-xl lg:text-2xl ${weightClass} ${baseClasses}`}
      style={props.color ? {color: props.color} : undefined}
    >
      {children}
    </h4>
  );
};

interface TextProps extends BaseTypographyProps {
  weight?: "normal" | "medium" | "semibold" | "bold";
  size?: "xs" | "sm" | "base" | "lg" | "xl";
}

const Text: FC<TextProps> = ({
  children,
  weight = "normal",
  size = "base",
  ...props
}) => {
  const baseClasses = getBaseClasses(props as BaseTypographyProps);

  const weightClass =
    weight === "normal"
      ? "font-normal"
      : weight === "medium"
      ? "font-medium"
      : weight === "semibold"
      ? "font-semibold"
      : "font-bold";

  const sizeClass =
    size === "xs"
      ? "text-xs"
      : size === "sm"
      ? "text-sm"
      : size === "base"
      ? "text-base"
      : size === "lg"
      ? "text-lg"
      : "text-xl";

  return (
    <p
      className={`${sizeClass} leading-relaxed ${weightClass} ${baseClasses}`}
      style={props.color ? {color: props.color} : undefined}
    >
      {children}
    </p>
  );
};

interface CaptionProps extends BaseTypographyProps {
  weight?: "normal" | "medium" | "semibold" | "bold";
}

const Caption: FC<CaptionProps> = ({children, weight = "normal", ...props}) => {
  const baseClasses = getBaseClasses(props as BaseTypographyProps);
  const weightClass =
    weight === "normal"
      ? "font-normal"
      : weight === "medium"
      ? "font-medium"
      : weight === "semibold"
      ? "font-semibold"
      : "font-bold";

  return (
    <span
      className={`text-xs md:text-sm text-gray-600 ${weightClass} ${baseClasses}`}
      style={props.color ? {color: props.color} : undefined}
    >
      {children}
    </span>
  );
};

interface DisplayProps extends BaseTypographyProps {
  weight?: "normal" | "medium" | "semibold" | "bold";
}

const Display: FC<DisplayProps> = ({children, weight = "bold", ...props}) => {
  const baseClasses = getBaseClasses(props as BaseTypographyProps);
  const weightClass =
    weight === "normal"
      ? "font-normal"
      : weight === "medium"
      ? "font-medium"
      : weight === "semibold"
      ? "font-semibold"
      : "font-bold";

  return (
    <h1
      className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight ${weightClass} ${baseClasses}`}
      style={props.color ? {color: props.color} : undefined}
    >
      {children}
    </h1>
  );
};

// Combine all components into one Typography component
const Typography = {
  H1,
  H2,
  H3,
  H4,
  Text,
  Caption,
  Display,
};

export default Typography;
