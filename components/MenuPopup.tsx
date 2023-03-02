import React from 'react';
import { View } from 'react-native';
import { Button, Menu, Divider } from 'react-native-paper';

export const MenuPopup = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View
      style={{
        paddingTop: 50,
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>Show menu</Button>}
      >
        <Menu.Item onPress={() => {}} title='Item 1' />
        <Menu.Item onPress={() => {}} title='Item 2' />
        <Divider />
        <Menu.Item onPress={() => {}} title='Item 3' />
      </Menu>
    </View>
  );
};
