import { AlertTriangle, RefreshCw } from "lucide-react";

interface BaseErrorUIProps {
  error: Error;
  onRetry: () => void;
}

export default function ({ error, onRetry }: BaseErrorUIProps): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg p-8">
      <AlertTriangle className="w-16 h-16 text-gray-500 mb-4" />
      <h2 className="text-2xl font-bold text-gray-700 mb-2">오류 발생</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={onRetry}
        className="flex items-center bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        다시 시도
      </button>
    </div>
  );
}
