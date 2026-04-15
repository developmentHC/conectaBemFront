import useMediaQuery from "@mui/material/useMediaQuery";

export function useIsMobile() {
  return useMediaQuery("(max-width: 767.98px)");
}
