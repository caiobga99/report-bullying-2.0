import { Link } from "react-router-dom";
import ReportBullyingLogo from "../../assets/logo.svg";
interface FormHeaderProps {
  heading: string;
  paragraph: string;
  linkName: string;
  linkUrl: string;
  theme: string;
}

export default function FormHeader({
  heading,
  paragraph,
  linkName,
  linkUrl = "#",
  theme,
}: FormHeaderProps) {
  return (
    <div className="mb-10 font-dm">
      <div className="flex justify-center">
        <img
          alt="Logo do Report Bullying"
          className="max-h-44 max-w-44 "
          src={ReportBullyingLogo}
        />
      </div>
      <h2
        className={
          theme === "light"
            ? "mt-6 text-center text-3xl font-extrabold text-gray-900"
            : "mt-6 text-center text-3xl font-extrabold text-gray-50"
        }
      >
        {heading}
      </h2>
      <p
        className={
          theme === "light"
            ? "text-center text-sm text-gray-600 mt-5"
            : "text-center text-sm text-gray-50 mt-5"
        }
      >
        {paragraph}
        <Link
          to={linkUrl}
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
}
