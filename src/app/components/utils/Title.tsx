type TitleProps = {
  title: string;
};

export function Title({ props: { title } }: { props: TitleProps }) {
  return (
    <h1 className="text-blue-gray font-mono scroll-m-20 text-4xl font-extrabold tracking-tight shadow-blue-gray-500/20 [text-shadow:0px_1px_3px_var(--tw-shadow-color),_0px_1px_2px_var(--tw-shadow-color)] lg:text-5xl">
      {title}
    </h1>
  );
}
