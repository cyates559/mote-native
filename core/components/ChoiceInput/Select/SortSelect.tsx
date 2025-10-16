import {Dispatch, SetStateAction} from "react";
import {Sticky} from "@/core/components/Sticky";
import {MenuCard} from "@/core/components/Card";
import {Button} from "@/core/components/Button";
import {ArrowIcon} from "@/core/components/Icon";
import {styled, StyleSheet, View} from "@/core/components/View";
import {
  TEXT_INPUT_FLOATING_ICON_MARGIN,
  TEXT_INPUT_FLOATING_ICON_OUTER_SIZE,
  TEXT_INPUT_FLOATING_ICON_SIZE,
  TextInput,
  TextInputPropsType
} from "@/core/components/TextInput";
import useSelect from "./useSelect";
import {ChoiceInputPropsType} from "../types";
import {ViewStyleType} from "@/core/styled";

type SelectTextInputPropsType = Omit<TextInputPropsType, "children" | "value" | "setValue">;


export interface DefaultSelectPropsType<T> extends ChoiceInputPropsType<T>, SelectTextInputPropsType {}

export interface SortSelectPropsType<T> extends DefaultSelectPropsType<T> {
  searchValue: string | null;
  setSearchValue: Dispatch<SetStateAction<string | null>>;
}

const Container = styled(View, {
  style: {
    alignItems: "stretch",
    justifyContent: "center",
  },
});

const SelectTextInput = styled(TextInput, {
  style: {
    paddingEnd: TEXT_INPUT_FLOATING_ICON_OUTER_SIZE,
  },
});

const Indicator = styled(ArrowIcon, {
  size: TEXT_INPUT_FLOATING_ICON_SIZE,
  type: "chevron",
  style: {
    position: "absolute",
    end: TEXT_INPUT_FLOATING_ICON_MARGIN,
  },
});

const MenuContainer = styled(MenuCard, {
  style: {
    marginHorizontal: 8,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
  }
});

const ListItemView = styled(View, {
  // merging with the above view causes the shadow to not work on mobile
  style: ({style: {borderRadius}}) => StyleSheet.flatten<ViewStyleType>([
    {
      // in the future we might make this built-in to MenuCard
      borderRadius,
    },
    {
      borderTopStartRadius: 0,
      borderTopEndRadius: 0,
    },
  ]),
})

const ListItem = styled(Button, {
});


export default function SortSelect<T>(props: SortSelectPropsType<T>) {
  const {children=[], value, setValue, searchValue, setSearchValue,  ...rest} = props;
  const select = useSelect({value, setValue, searchValue, setSearchValue, children});
  const {focused, onFocus, onBlur, nextValue, onKeyPress, textInputRef,  onFocusListItem, onPressListItem} = select;
  return (
    <Container>
      <SelectTextInput
        forwardRef={textInputRef}
        onFocus={onFocus}
        onBlur={onBlur}
        value={searchValue}
        setValue={setSearchValue}
        onKeyPress={onKeyPress}
        {...rest}
        children={<Indicator direction={focused? "up": "down"}/>}
      />
      <Sticky>
        {focused &&
          <MenuContainer>
            <ListItemView>
              {children.map(({props: {value: thisValue, children}}) => {
                return (
                  <ListItem
                    key={thisValue?.toString()}
                    children={children}
                    selected={thisValue === nextValue}
                    onFocus={() => onFocusListItem(thisValue)}
                    onPress={() => onPressListItem(thisValue)}
                  />
                );
              })}
            </ListItemView>
          </MenuContainer>
        }
      </Sticky>
    </Container>
  );
}