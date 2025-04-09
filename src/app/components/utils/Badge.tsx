export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-4 items-center justify-center rounded-sm border-2 border-edit p-0.5">
      <span className="text-[0.5rem] text-edit">{children}</span>
    </div>
  );
}
