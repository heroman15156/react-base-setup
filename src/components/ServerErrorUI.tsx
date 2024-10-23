import { AlertTriangle, RefreshCw } from "lucide-react";

interface ServerErrorUIProps {
  status: number;
  onRetry: () => void;
}
export default function ServerErrorUI({ onRetry, status }: ServerErrorUIProps) {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-yellow-50 rounded-lg p-8">
      <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
      <h2 className="text-2xl font-bold text-yellow-700 mb-2">서버 오류</h2>
      <p className="text-yellow-600 mb-4">
        서버에서 오류가 발생했습니다. (상태 코드: {status})
      </p>
      <button
        onClick={() => {
          console.log(onRetry, "onRetry");
          onRetry();
          console.log("123123");
        }}
        className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        다시 시도
      </button>
    </div>
  );
}
