export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-4 items-center justify-center rounded border-2 border-purple-800 p-0.5">
      <span className="text-[0.5rem] text-purple-800">{children}</span>
    </div>
  );
}
