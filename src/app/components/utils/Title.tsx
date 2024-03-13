type TitleProps = {
  title: string;
};

export function Title({ props }: { props: TitleProps }) {
  const width = 1024;
  const length = props.title.length;
  const fontSize = Math.min(7, 70 / length);
  return (
    <>
      <svg viewBox="0 0 800 120" className="w-full">
        <text
          className="fill-gray-100 stroke-gray-900 stroke-1 font-extrabold [text-shadow:0px_4px_0px_rgba(0,0,0,0.2)]"
          x="50%"
          y="50%"
          fontSize={`${fontSize}vw`}
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {props.title}
        </text>
      </svg>
    </>
  );
}
