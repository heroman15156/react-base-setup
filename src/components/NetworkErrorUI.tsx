import { Wifi, RefreshCw } from "lucide-react";

type NetworkErrorUIProps = {
  onRetry: () => void;
};

export default function NetworkErrorUI({ onRetry }: NetworkErrorUIProps) {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-red-50 rounded-lg p-8">
      <Wifi className="w-16 h-16 text-red-500 mb-4" />
      <h2 className="text-2xl font-bold text-red-700 mb-2">네트워크 오류</h2>
      <p className="text-red-600 mb-4">인터넷 연결을 확인해 주세요.</p>
      <button
        onClick={onRetry}
        className="flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        다시 시도
      </button>
    </div>
  );
}
