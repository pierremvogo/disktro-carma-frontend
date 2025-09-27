// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

interface Props {
  label?: string;
  showText?: boolean;
  size?: "large" | "small";
}
const Loader = ({ label, showText = true }: Props) => {
  const { t } = useTranslation("dashboard");

  return (
    <div
      className="app-loader"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
      }}
    >
      {/* large-spinner */}
      {/* <FontAwesomeIcon
        style={{
          margin: "0 4px",
        }}
        icon="spinner"
        spin
        className={`${size && size === "large" && "large-spinner"} spinner`}
      /> */}
      {label || (showText && "Loading...")}
    </div>
  );
};

export const LoadingScreen = ({ ...rest }) => {
  return (
    <div className="iz_position-relative">
      <div
        style={{
          // width: "100%",
          minHeight: "50vh",
          margin: "auto",
          color: "black",
          // border: "4px solid red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader {...rest} />
      </div>
    </div>
  );
};

export default Loader;
