import { Loader2 } from "lucide-react";

const LoaderOverlay = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
    <Loader2 className="animate-spin h-10 w-10 text-white" />
  </div>
);

export default LoaderOverlay;
