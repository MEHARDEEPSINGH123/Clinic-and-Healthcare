"use client";

import React, { useState } from "react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  name?: string;
}

const DEFAULT_DOCTOR_FALLBACK = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80";

export default function SafeImage({
  src,
  alt,
  className,
  fallbackSrc = DEFAULT_DOCTOR_FALLBACK,
  name,
  ...props
}: SafeImageProps) {
  const [errorCount, setErrorCount] = useState(0);
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    if (errorCount === 0 && fallbackSrc) {
      setErrorCount(1);
      setImgSrc(fallbackSrc);
    } else {
      setErrorCount(2);
    }
  };

  if (errorCount >= 2 && name) {
    const initials = name
      .replace("Dr. ", "")
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("");

    return (
      <div
        className={`bg-primary text-highlight flex items-center justify-center font-heading font-bold select-none ${className}`}
      >
        <span>{initials || "DR"}</span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc || fallbackSrc}
      alt={alt || "Doctor"}
      className={className}
      onError={handleError}
      loading="lazy"
      {...props}
    />
  );
}
