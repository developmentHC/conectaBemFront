import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { MdStar } from "react-icons/md";
import clsx from "clsx";

const schema = z.object({
  suggestions: z.string().min(1, "Sugestão inválida"),
});

type Data = z.infer<typeof schema>;

export const SuggestionForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: { suggestions: "" },
  });

  const [suggestionsSent, setSuggestionsSent] = useState<boolean>(false);

  const onChangeSuggestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const onlyLettersAndSpace = rawValue.trimStart();
    setValue("suggestions", onlyLettersAndSpace);
  };

  const handleSuggestionSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    handleSubmit(async () => {
      setSuggestionsSent(true);
    })();
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm">
        Sua especialidade não está na lista? Envie sua sugestão e iremos
        analisar a viabilidade de incluí-la em nosso cadastro
      </span>
      <TextField
        {...register("suggestions")}
        onChange={onChangeSuggestion}
        disabled={suggestionsSent}
        placeholder="Nome e descrição da especialidade"
        multiline
        rows={3}
        error={!!errors.suggestions}
        helperText={errors.suggestions?.message}
      />
      <Button
        onClick={handleSuggestionSubmit}
        disabled={suggestionsSent}
        className={clsx(
          suggestionsSent && "!bg-blue-secondary-900 !text-white"
        )}
        variant="contained"
      >
        {!suggestionsSent ? (
          "Enviar Sugestão"
        ) : (
          <p className="flex items-center gap-2 text-button">
            <MdStar className="text-[#0000008F]" size={20} />
            Sugestão Enviada!
          </p>
        )}
      </Button>
    </div>
  );
};
