import { LinearProgress, LinearProgressProps } from "@mui/material";

export const Progress = ({progress, ...props}: {progress: number} & LinearProgressProps) => {
  return (
    <LinearProgress
      data-testid="progress"
      variant="determinate"
      value={progress}
      {...props}
    />
  );
};