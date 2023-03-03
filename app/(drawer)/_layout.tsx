import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { View, Text, Pressable } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CustomDrawerItem } from '../../components';
import { getCurrentRouteKey } from '../../utils';
import { Link } from 'expo-router';
import { RootStackParamList } from '../../navigations/types';
import { Fonts, Colors, GlobalStyles, Metrics } from '../../styles';
import Category from './category';
import ManageCategories from './manage-categories';
import Dashboard from './dashboard';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { useAppSelector } from '../../reduxStore/hooks';

const Drawer = createDrawerNavigator<RootStackParamList>();

type Props = {
  navigation: DrawerNavigationHelpers;
  selectedTab: string;
};

const CustomDrawerContent = ({ navigation, selectedTab }: Props) => {
  const storeCategories = useAppSelector((state) => state.categories);

  return (
    <DrawerContentScrollView scrollEnabled contentContainerStyle={{ flex: 1 }}>
      <View
        style={[
          GlobalStyles.container,
          Metrics.horizontalPadding,
          Metrics.mediumVerticalPadding,
        ]}
      >
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 12,
              marginBottom: 35,
              width: '100%',
            }}
          >
            <Text style={[Fonts.header3]}>Main Menu</Text>
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
            >
              <FontAwesome name='close' color={Colors.primary} size={25} />
            </TouchableOpacity>
          </View>

          {/* Drawer Items */}
          <View style={[Metrics.topMargin, { width: '100%' }]}>
            <CustomDrawerItem
              label={'Dashboard'}
              onPress={() => navigation.navigate('Dashboard')}
              icon='home'
            />
            {storeCategories.map(({ categoryId, categoryName }) => (
              <CustomDrawerItem
                key={categoryId}
                label={categoryName}
                onPress={() => navigation.navigate('Category', { categoryId })}
                icon='link'
              />
            ))}

            <CustomDrawerItem
              label={'Manage Categories'}
              onPress={() => navigation.navigate('ManageCategories')}
              icon='user-secret'
            />
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const CustomDrawer = () => (
  <View style={GlobalStyles.container}>
    <Drawer.Navigator
      // initialRouteName='Dashboard'
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={({ state, navigation }) => {
        const _selected = getCurrentRouteKey(state?.history, state.index);
        const _selectedTab = _selected?.key || 'Dashboard';
        return (
          <CustomDrawerContent
            navigation={navigation}
            selectedTab={_selectedTab}
          />
        );
      }}
    >
      <Drawer.Screen
        name='Dashboard'
        options={{
          title: 'Dashboard',
        }}
      >
        {(props) => <Dashboard {...props} />}
      </Drawer.Screen>
      <Drawer.Screen
        name='Category'
        options={{
          title: 'Category',
          headerRight: () => (
            <Link href='/modal' asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name='info-circle'
                    size={25}
                    color={Colors.dark}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      >
        {(props) => <Category {...props} />}
      </Drawer.Screen>
      <Drawer.Screen
        name='ManageCategories'
        options={{ title: 'Manage Categories' }}
      >
        {(props) => <ManageCategories {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  </View>
);

export default CustomDrawer;
