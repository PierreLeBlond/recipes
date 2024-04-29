type ViewModeProps = {
  preview: boolean;
  setPreview: (preview: boolean) => void;
};

export function ViewMode({
  props: { preview, setPreview },
  children,
}: {
  props: ViewModeProps;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative flex items-center justify-center pt-2">
        <label className="flex w-full translate-y-[1px] justify-center rounded-tr-md border-b border-r border-t border-gray-500 p-2 text-sm font-bold hover:cursor-pointer has-[:checked]:border-b-0 has-[:checked]:border-r-0">
          ÉDITION
          <input
            type="radio"
            name="viewMode"
            onChange={() => setPreview(false)}
            defaultChecked={!preview}
            className="hidden"
          />
        </label>

        <label className="flex w-full translate-y-[1px] justify-center rounded-tl-md border-b border-l border-t border-gray-500 p-2 text-sm font-bold hover:cursor-pointer has-[:checked]:border-b-0 has-[:checked]:border-l-0">
          PRÉVISUALISATION
          <input
            type="radio"
            name="viewMode"
            onChange={() => setPreview(true)}
            defaultChecked={preview}
            className="hidden"
          />
        </label>
      </div>
      <div className="flex p-2">{children}</div>
    </>
  );
}
