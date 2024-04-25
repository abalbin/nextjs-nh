import { sanitizeText } from "@/app/lib/utils";

export function Button({}) {
  return (
    <button
      className={`group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}
    >
      {sanitizeText("Algún Mensaje")}
    </button>
  );
}
