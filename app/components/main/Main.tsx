import Flow from "../flow/Flow";
import SideBar from "../sidebar/SideBar";

const Main = () => {
  return (
    <div className="flex h-full w-full fixed">
      <SideBar />
      <Flow />
    </div>
  );
};

export default Main;
