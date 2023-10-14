const Header = () => {
  return (
    <div className="bg-[#1e1e1e] h-[48px] py-[10px]">
      <div className="grid grid-cols-3">
        <div></div>
        <h2 className="text-[#d9d9d9] text-[18px] font-semibold justify-self-center">
          Flows / New flow
        </h2>
        <div className="text-[#d9d9d9] text-[11.5px] mr-[10px] self-center justify-self-end">
          <button className="bg-[#444444] rounded-[4px] px-[8px]" >
            Test flow
            </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
