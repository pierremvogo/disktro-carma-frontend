// src/components/LanguageSwitcher.jsx
import useScreenSize from "@/@disktro/hooks/useScreenSize";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { isMobileScreen } = useScreenSize();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    console.log(lng);
  };

  return (
    <div>
      <select
        className="w-fit h-fit"
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="en">🇺🇸 {isMobileScreen ? <>EN</> : <>English</>}</option>
        <option value="fr">
          🇫🇷 {isMobileScreen ? <>FR</> : <>Français</>}
        </option>
        <option value="es">🇪🇸 {isMobileScreen ? <>ES</> : <>Español</>}</option>
        <option value="de">🇩🇪 {isMobileScreen ? <>DE</> : <>Deutsch</>}</option>
      </select>
    </div>
  );
}
export default LanguageSwitcher;
