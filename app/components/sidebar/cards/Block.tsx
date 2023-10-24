import { BlockProps } from "./card.types";

const Block = ({ children, title }: BlockProps) => {
  return (
    <div className="border-[#3b3b3b] w-full [&:not(:last-child)]:border-b-[1px]">
      <h2 className="text-primary-100 text-[13px] font-semibold ms-2 my-3">
        {title}
      </h2>
      <div className="grid grid-cols-3 gap-y-2 mb-1">{children}</div>
    </div>
  );
};

export default Block;
