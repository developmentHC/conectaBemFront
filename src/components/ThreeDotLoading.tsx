import { Box } from "@mui/material";

const ThreeDotLoading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={dotContainerStyle}>
        {[...Array(3)].map((_, i) => (
          <Box
            key={i}
            sx={{
              ...dotStyle,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

const dotContainerStyle = {
  display: "flex",
  gap: "8px",
};

const dotStyle = {
  width: 12,
  height: 12,
  borderRadius: "50%",
  backgroundColor: "#F7F7F7",
  animation: "pulse 1.4s infinite ease-in-out",
};

export default ThreeDotLoading;
