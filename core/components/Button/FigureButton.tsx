import {ImageSourcePropType} from "react-native";
import {styled, Image, View} from "@/core/styled";
import {T} from "../Text";
import {Icon, IconNameType} from "../Icon";
import Button, {ButtonPropsType} from "./Button";

export interface BaseFigureButtonPropsType {
  icon?: IconNameType;
  imageSource?: ImageSourcePropType;
  text?: string;
  onPress?: ButtonPropsType['onPress'];
}

export interface FigureButtonPropsType extends ButtonPropsType, BaseFigureButtonPropsType {
}


const FigureButtonContainer = styled(Button, {
  theme: "Card",
  style: {
    minWidth: 80,
    flexGrow: 1,
    minHeight: 100,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    maxWidth: 180,
  },
});

const FigureContainer = styled(View, {
  style: {
    alignItems: "center",
  }
});

const FigureImageContainer = styled(FigureContainer, {
  style: {
    marginTop: -12,
    marginLeft: -10,
    marginRight: -10,
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit",
  },
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
  size: "48",
  style: {
    margin: 10,
  },
})

const FigureButtonTextContainer = styled(View, {
  style: {
    flex: 1,
    justifyContent: "flex-start",
  },
});

const FigureButtonText = styled(T, {
  style: {
  },
});

const LayerContainer = styled(View, {
  style: {
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    margin: 6,
  }
});

export default function FigureButton(props: FigureButtonPropsType) {
  const {
    icon="FileQuestion", imageSource,
    text, children, ...rest
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
      <FigureButtonTextContainer>
        <FigureButtonText>
          {text}
        </FigureButtonText>
      </FigureButtonTextContainer>
      <LayerContainer children={children}/>
    </FigureButtonContainer>
  )
}