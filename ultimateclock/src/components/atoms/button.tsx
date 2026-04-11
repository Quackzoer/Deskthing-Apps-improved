export const CtrlButton = ({
  onClick,
  label,
  color,
  hoverColor,
  large = false,
}: {
  onClick: () => void;
  label: string;
  color: string;
  hoverColor: string;
  large?: boolean;
}) => (
  <button
    onClick={onClick}
    style={{
      background: color,
      border: "none",
      borderRadius: "16px",
      color: "white",
      fontSize: large ? "24px" : "20px",
      fontFamily: "inherit",
      padding: large ? "16px 48px" : "14px 36px",
      cursor: "pointer",
      transition: "background 0.15s",
      minWidth: large ? "160px" : "120px",
    }}
    onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.background = hoverColor)}
    onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.background = color)}
  >
    {label}
  </button>
);