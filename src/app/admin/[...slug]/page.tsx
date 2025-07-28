import { Wrench } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-6 py-3 bg-main border-b border-header rounded-2xl transition-colors duration-300 header-shadow">
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gray-200 dark:bg-gray-700">
        <Wrench
          size={40}
          className="text-secondary"
        />
      </div>
      <h4 className="mb-2 text-sm font-medium text-center text-primary">
        Tính năng đang được phát triển
      </h4>
      <p className="max-w-xs text-sm text-center text-secondary">
        Chúng tôi đang nỗ lực hoàn thiện tính năng này. Vui lòng quay lại sau để
        trải nghiệm.
      </p>
    </div>
  );
}
