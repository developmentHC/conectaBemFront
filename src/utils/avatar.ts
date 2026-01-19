type AvatarOptions = {
  size?: number;
  background?: string;
  color?: string;
  bold?: boolean;
  rounded?: boolean;
};

export function getAvatarUrl(
  name: string,
  options?: AvatarOptions
) {
  const {
    size = 256,
    background = "1E40AF",
    color = "ffffff",
    bold = true,
    rounded = false,
  } = options || {};

  const params = new URLSearchParams({
    name: name,
    size: String(size),
    background,
    color,
    bold: String(bold),
    rounded: String(rounded),
  });

  return `https://ui-avatars.com/api/?${params.toString()}`;
}
