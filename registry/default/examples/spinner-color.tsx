import { Spinner } from "@/registry/default/ui/spinner";

export default function SpinnerColor() {
  return (
    <div className="flex items-center gap-6">
      <div className="text-red-500">
        <Spinner size={24} />
      </div>
      <div className="text-green-500">
        <Spinner size={24} />
      </div>
      <div className="text-blue-500">
        <Spinner size={24} />
      </div>
      <div className="text-yellow-500">
        <Spinner size={24} />
      </div>
      <div className="text-purple-500">
        <Spinner size={24} />
      </div>
    </div>
  );
}
