export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-4 items-center justify-center rounded border-2 border-blue-gray-300 p-0.5">
      <span className="text-[0.5rem] text-blue-gray-300">{children}</span>
    </div>
  );
}
