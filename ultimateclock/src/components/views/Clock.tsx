import { useSettingStore } from "@src/store/settingsStore";
import { PositionedContainer } from "../molecules/positioned-container";
import { StyledText } from "../molecules/styled-text";

export const Clock = () => {
  const time = useSettingStore((s) => s.currentTime);

  return (
    <PositionedContainer>
      <div className="relative flex flex-col items-center gap-1">
        <StyledText>{time}</StyledText>
      </div>
    </PositionedContainer>
  );
};