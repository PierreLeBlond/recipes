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
      <div className="relative flex items-center justify-center">
        <label className="flex w-full translate-y-[1px] justify-center rounded-tr-md p-2 text-sm font-bold hover:cursor-pointer has-[:checked]:bg-primary">
          ÉDITION
          <input
            type="radio"
            name="viewMode"
            onChange={() => setPreview(false)}
            defaultChecked={!preview}
            className="hidden"
          />
        </label>

        <label className="flex w-full translate-y-[1px] justify-center rounded-tl-md p-2 text-sm font-bold hover:cursor-pointer has-[:checked]:bg-primary">
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
      <div className="flex bg-primary p-2">{children}</div>
    </>
  );
}
