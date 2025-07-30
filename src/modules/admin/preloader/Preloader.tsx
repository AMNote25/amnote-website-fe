import React from "react";
import HorizontalLineLoader from "@/components/ui/loader";
import Logo from "@/components/nav-bar/logo";


interface LoaderLayoutProps {
  isVisible?: boolean;
  duration?: number;
  onComplete?: () => void;
  message?: string;
}

const LoaderLayout = ({
  isVisible = true,
  duration = 3000,
  onComplete = () => {},
  message = "Cố lên, cố lên, sắp tới rồi sắp tới rồi...",
}) => {
  React.useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onComplete();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <Logo className="h-40 w-60" />
        </div>
        <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">
          Chào mừng bạn đến với AMnote - Phần mềm kế toán hiện đại
        </p>
      </div>

      <div className="w-full max-w-xl px-8">
        <HorizontalLineLoader
          width="w-full"
          height="h-1"
          duration={2}
          showGlow={true}
          className="mb-4"
        />
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        {message}
      </div>
    </div>
  );
};

export default LoaderLayout;
