import { LinearProgress } from "@mui/material";
// import Link from "next/link";
// import { IoMdArrowBack } from "react-icons/io";

type WelcomeSectionHeaderProps = {
  title: string;
  href: string;
  description?: string;
  progress?: number;
};

export const WelcomeSectionHeader = ({
  title,
  href,
  progress,
  description,
}: WelcomeSectionHeaderProps) => {
  return (
    <div className="flex flex-col gap-4">
      {/* <Link className="w-fit" href={href}>
        <IoMdArrowBack className="text-xl cursor-pointer" />
      </Link> */}
      <h1 className="text-2xl font-semibold w-full" data-testid="title">
        {title}
      </h1>
      {progress && (
        <LinearProgress
          data-testid="progress"
          variant="determinate"
          value={progress}
        />
      )}
      {description && (
        <p className="text-gray-600" data-testid="description">
          {description}
        </p>
      )}
    </div>
  );
};
