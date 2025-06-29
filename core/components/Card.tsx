import {styled, View, ViewStyle, ThemeType} from "@/core/styled";

const Card = styled(View, {
  style: (theme: ThemeType): ViewStyle => ({
    backgroundColor: theme.cardColor,
    borderRadius: theme.cardBorderRadius,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1, },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  }),
});

export default Card;
