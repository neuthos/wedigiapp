import React, {useState} from "react";
import {Loader} from "lucide-react";

interface ImageProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt = src,
  width,
  height,
  className = "",
  objectFit = "cover",
  fallbackSrc = "/api/placeholder/400/300",
  onLoad,
  onError,
  priority = false,
}) => {
  const [isLoading, setIsLoading] = useState(!priority);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
    onError?.();
  };

  // Determine which image source to use
  const imageSrc = error ? fallbackSrc : src;

  // Base styling classes
  const imageClasses = `transition-opacity duration-300 ${className}`;
  const objectFitClass = objectFit ? `object-${objectFit}` : "";

  return (
    <div
      className="relative inline-block overflow-hidden"
      style={{width, height}}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loader className="w-8 h-8 text-gray-400 animate-spin" />
        </div>
      )}

      <img
        src={imageSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className={`${imageClasses} ${objectFitClass} ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={handleLoad}
        onError={handleError}
        style={{width: "100%", height: "100%"}}
      />
    </div>
  );
};

export default Image;
