export type CodeInputProps = {
  value: (string | null)[];
  onChange?: (value: (string | null)[]) => void;
  onFirstComplete?: (value: (string | null)[]) => void;
};