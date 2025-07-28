import React, { useEffect, useState } from "react";

/**
 * HorizontalLineLoader Component
 *
 * A horizontal line loader with red-white gradient animation that moves from left to right
 * with a glowing effect. Built with Tailwind CSS for performance and responsiveness.
 *
 * Features:
 * - Red to white gradient animation
 * - Continuous left-to-right movement
 * - Glowing effect using box-shadow
 * - GPU-accelerated transforms for smooth performance
 * - Responsive design with customizable width
 * - Fallback for reduced motion preferences
 * - Error boundary support
 *
 * @param {Object} props
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.paused - Whether to pause the animation
 * @param {number} props.duration - Animation duration in seconds (default: 2)
 * @param {string} props.width - Width of the loader (default: 'w-64')
 * @param {string} props.height - Height of the loader (default: 'h-1')
 * @param {boolean} props.showGlow - Whether to show the glow effect (default: true)
 */
const HorizontalLineLoader = ({
  className = "",
  paused = false,
  duration = 2,
  width = "w-64",
  height = "h-1",
  showGlow = true,
  ...props
}) => {
  // State for handling animation support detection
  const [supportsAnimation, setSupportsAnimation] = useState(true);

  // State for handling reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    try {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      // Listen for changes in motion preference
      const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    } catch (error) {
      console.warn("Media query not supported:", error);
      setPrefersReducedMotion(false);
    }
  }, []);

  // Determine if animation should be active
  const shouldAnimate = supportsAnimation && !prefersReducedMotion && !paused;

  // Base container classes for centering and responsiveness
  const containerClasses = `
    flex 
    items-center 
    justify-center 
    ${className}
  `.trim();

  // Loader line base classes
  const loaderBaseClasses = `
    ${width} 
    ${height} 
    bg-gray-200 
    dark:bg-gray-700 
    rounded-full 
    overflow-hidden 
    relative
  `.trim();

  // Animation style using CSS custom properties for better control
  const animationStyle = shouldAnimate
    ? {
        "--animation-duration": `${duration}s`,
        animationDuration: `${duration}s`,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        animationName: "slideGradient",
        animationFillMode: "both",
        // Use transform3d for GPU acceleration
        transform: "translate3d(0, 0, 0)",
        willChange: "transform",
      }
    : {};

  return (
    <div className={containerClasses} {...props}>
      <div className={loaderBaseClasses}>
        {/* Main gradient animation element */}
        <div
          className={`
            absolute 
            inset-0 
            rounded-full
            bg-gradient-to-r 
            from-transparent 
            via-red-500 
            to-red-200
            ${showGlow ? "shadow-lg shadow-red-500/50" : ""}
            ${shouldAnimate ? "animate-slide-gradient" : "opacity-60"}
          `}
          style={animationStyle}
          // Add aria-label for accessibility
          aria-label="Loading animation in progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext="Loading..."
        />

        {/* Additional glow overlay for enhanced effect */}
        {showGlow && shouldAnimate && (
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-red-500/30 to-transparent animate-slide-gradient blur-sm"
            style={{
              ...animationStyle,
              // Slightly offset animation for layered glow effect
              animationDelay: "0.1s",
            }}
          />
        )}

        {/* Fallback static gradient when animation is disabled */}
        {!shouldAnimate && (
          <div
            className={`
              absolute 
              inset-0 
              rounded-full
              bg-gradient-to-r 
              from-red-500 
              via-red-400 
              to-red-300
              opacity-60
              ${showGlow ? "shadow-lg shadow-red-500/30" : ""}
            `}
          />
        )}
      </div>

      {/* Screen reader only loading text */}
      <span className="sr-only">Loading content, please wait...</span>
    </div>
  );
};

/**
 * Preset loader components for common use cases
 */

// Small horizontal loader
export const HorizontalLoaderSmall = (props: React.ComponentProps<typeof HorizontalLineLoader>) => (
  <HorizontalLineLoader width="w-32" height="h-0.5" duration={1.5} {...props} />
);

// Medium horizontal loader (default)
export const HorizontalLoaderMedium = (props: React.ComponentProps<typeof HorizontalLineLoader>) => (
  <HorizontalLineLoader width="w-64" height="h-1" duration={2} {...props} />
);

// Large horizontal loader
export const HorizontalLoaderLarge = (props: React.ComponentProps<typeof HorizontalLineLoader>) => (
  <HorizontalLineLoader width="w-96" height="h-1.5" duration={2.5} {...props} />
);

// Full width horizontal loader
export const HorizontalLoaderFull = (props: React.ComponentProps<typeof HorizontalLineLoader>) => (
  <HorizontalLineLoader width="w-full" height="h-1" duration={2} {...props} />
);

// Fast animation variant
export const HorizontalLoaderFast = (props: React.ComponentProps<typeof HorizontalLineLoader>) => (
  <HorizontalLineLoader duration={1} {...props} />
);

// Slow animation variant
export const HorizontalLoaderSlow = (props: React.ComponentProps<typeof HorizontalLineLoader>) => (
  <HorizontalLineLoader duration={3} {...props} />
);

// No glow variant
export const HorizontalLoaderNoGlow = (props: React.ComponentProps<typeof HorizontalLineLoader>) => (
  <HorizontalLineLoader showGlow={false} {...props} />
);

/**
 * Error Boundary Wrapper for Loader
 * Provides fallback UI in case of rendering errors
 */
export class LoaderErrorBoundary extends React.Component<{ children?: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: React.ErrorInfo) {
    // Log error for debugging
    console.error("Loader component error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI - simple static loader
      return (
        <div className="flex items-center justify-center">
          <div className="w-64 h-1 bg-gray-200 rounded-full dark:bg-gray-700">
            <div className="w-1/3 h-full bg-red-500 rounded-full" />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Safe Loader Component with Error Boundary
 * Recommended for production use
 */
export const SafeHorizontalLoader = (props: React.ComponentProps<typeof HorizontalLineLoader>) => (
  <LoaderErrorBoundary>
    <HorizontalLineLoader {...props} />
  </LoaderErrorBoundary>
);

export default HorizontalLineLoader;
