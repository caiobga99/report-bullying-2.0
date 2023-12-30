interface TimeLineComponentProps {
  date: string;
  title: string;
  content: string;
  theme: string;
  position: string;
}

export default function TimeLineComponent({
  date,
  title,
  content,
  position,
  theme,
}: TimeLineComponentProps) {
  const fixexContanerClass: string =
    position === "left"
      ? "mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline"
      : "mb-8 flex justify-between items-center w-full right-timeline";
  return (
    <div className={fixexContanerClass}>
      <div className="order-1 w-5/12"></div>
      <div className="order-1 w-5/12 px-1 py-4 text-right">
        <p className="mb-3 text-base text-yellow-300">{date}</p>
        <h4
          className={
            theme !== "light"
              ? "mb-3 font-bold text-lg md:text-2xl"
              : "text-black mb-3 font-bold text-lg md:text-2xl"
          }
        >
          {title}
        </h4>
        <p
          className={
            theme !== "light"
              ? "text-sm md:text-base leading-snug text-gray-50 text-opacity-100"
              : "text-sm md:text-base leading-snug text-gray-600 text-opacity-100"
          }
        >
          {content}
        </p>
      </div>
    </div>
  );
}
