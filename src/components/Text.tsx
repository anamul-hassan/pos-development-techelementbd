import { FC } from "react";
import { useTranslation } from "react-i18next";

interface ITextProps {}

const Text: FC<ITextProps> = () => {
  const { t } = useTranslation();
  return <p>{t("text")}</p>;
};

export default Text;
