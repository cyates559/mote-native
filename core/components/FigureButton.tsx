import {ImageSourcePropType} from "react-native";
import {styled, Image, View, ViewStyle} from "@/core/styled";
import {ThemeType} from "@/core/theme";
import T from "./T";
import Button, {ButtonPropsType} from "./Button";
import Icon, {IconNameType} from "./Icon";

export interface FigureButtonPropsType extends Omit<ButtonPropsType, "children"> {
  icon?: IconNameType;
  imageSource?: ImageSourcePropType;
  text?: string;
}


const FigureButtonContainer = styled(Button, {
  style: (theme: ThemeType): ViewStyle => ({
    borderRadius: theme.cardBorderRadius,
    minWidth: 100,
    minHeight: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  }),
});

const FigureContainer = styled(View, {
  style: {
    alignItems: "center",
  }
});

const FigureImageContainer = styled(FigureContainer, {
  style: (theme: ThemeType) => ({
    marginTop: -12,
    marginLeft: -10,
    marginRight: -10,
    borderTopLeftRadius: theme.cardBorderRadius,
    borderTopRightRadius: theme.cardBorderRadius,
  }),
});

const FigureImage = styled(Image, {
  style: {
    paddingTop: "100%",
    // position: relative,
    flex: 1,


// background-repeat: no-repeat;
// background-position: center;
// background-size: contain;
  }
});

const FigureIcon = styled(Icon, {
  size: "75%",
  style: {
  },
})

const FigureButtonText = styled(T, {
  style: {},
});

export default function FigureButton(props: FigureButtonPropsType) {
  const {
    icon="FileQuestion", imageSource,
    text, ...rest
  } = props;
  return (
    <FigureButtonContainer {...rest}>
      {imageSource?
        <FigureImageContainer>
          <FigureImage source={imageSource}/>
        </FigureImageContainer>:
        <FigureContainer>
          <FigureIcon name={icon}/>
        </FigureContainer>
      }
      <FigureButtonText>
        {text}
      </FigureButtonText>
    </FigureButtonContainer>
  )
}