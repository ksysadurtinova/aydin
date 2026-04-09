export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
      <div className="flex items-center justify-between">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>
  );
}