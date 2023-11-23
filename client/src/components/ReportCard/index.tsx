import {
  UserCircleIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
const ReportCard: React.FC = () => {
  return (
    <div className="max-w-sm w-full lg:max-w-fit lg:flex items-center justify-center">
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <ChatBubbleBottomCenterIcon width={27} height={27} />
            <Link to={"/resposta/2"}>Visualize sua resposta</Link>
          </p>
          <div className="text-gray-900 font-bold text-xl mb-2">
            Can coffee make you a better developer?
          </div>
          <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, 
          </p>
        </div>
        <div className="flex items-center">
          <UserCircleIcon width={50} height={50} />
          {/* <img
            className="w-10 h-10 rounded-full mr-4"
            src="/img/jonathan.jpg"
            alt="Avatar of Jonathan Reinink"
          /> */}
          <div className="text-sm">
            <p className="text-gray-900 leading-none">Jonathan Reinink</p>
            <p className="text-gray-600">Aug 18</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
