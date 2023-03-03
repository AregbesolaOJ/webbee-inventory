import React from 'react';
import { View } from 'react-native';
import { Button, Menu, Divider } from 'react-native-paper';
import { MenuPopupProps } from '../interfaces';

export const MenuPopup = ({
  onSelect,
  menuOptions,
  attributeType,
  light,
  anchor: Comp,
}: MenuPopupProps) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handleOptionSelect = (option: string) => {
    closeMenu();
    onSelect(option);
  };

  return (
    <Menu
      visible={visible && menuOptions.length > 0}
      onDismiss={closeMenu}
      anchor={
        <Comp onPress={openMenu} attributeType={attributeType} light={light} />
      }
    >
      {menuOptions?.map((option) => (
        <React.Fragment key={option}>
          <Menu.Item
            onPress={() => handleOptionSelect(option)}
            title={option.toUpperCase()}
          />
          <Divider />
        </React.Fragment>
      ))}
    </Menu>
  );
};
