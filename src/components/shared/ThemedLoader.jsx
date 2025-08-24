import { Loader2 } from "lucide-react";


export default function ThemedLoader() {
  return (
    <div className="flex items-center justify-center h-screen gap-2 text-blue-700 transition-colors bg-primary-page-bg">
      <Loader2 className="w-6 h-6 animate-spin" />
      <span className="font-medium text-light">Loading...</span>
    </div>
  );
}