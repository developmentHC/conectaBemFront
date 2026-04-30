import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

export default function BackButton() {
  const router = useRouter();
  return (
    <div className="w-fit">
      <button
        type="button"
        className="flex items-center gap-1 font-medium text-gray-600 text-sm hover:text-gray-900"
        onClick={() => router.back()}
      >
        <IoMdArrowBack size={20} />
        voltar
      </button>
    </div>
  );
}
