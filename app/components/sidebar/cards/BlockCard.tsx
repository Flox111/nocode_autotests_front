import Image from "next/image";

const BlockCard = () => {
  return (
    <div className="flex flex-col justify-center w-[80px] items-center h-full gap-1">
      <div className="bg-[#006acc] m-[10px] h-[36px] w-[36px] rounded-[4px] flex justify-center items-center">
        <Image
          className="h-[20px] w-[20px]"
          src="/location.svg"
          alt="location"
          width={20}
          height={20}
        />
      </div>
      <p className="text-[12px] text-center text-[#a3a3a3] leading-3 pb-[10px] px-[4px]">
        Make HTTP request
      </p>
    </div>
  );
};

export default BlockCard;
