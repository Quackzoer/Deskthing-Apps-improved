import React from "react";
import { useTextStyle } from "@src/hooks/use-text-style";

interface Props {
  children: React.ReactNode;
}

export const StyledText = ({ children }: Props) => {
  const { shadowStyle, textStyle, gradientEnabled, shadowEnabled } = useTextStyle();

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {gradientEnabled && shadowEnabled && (
        <p className="min-h-fit min-w-fit whitespace-nowrap font-clock" style={shadowStyle}>
          {children}
        </p>
      )}
      <p className="min-h-fit min-w-fit whitespace-nowrap font-clock" style={textStyle}>
        {children}
      </p>
    </div>
  );
};