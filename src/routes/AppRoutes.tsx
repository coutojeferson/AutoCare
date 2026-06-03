import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Vehicle } from '../types/vehicle';
import { HomeScreen } from '../screens/HomeScreen';
import { AddVehicleScreen } from '../screens/AddVehicleScreen';
import { VehicleDetailsScreen } from '../screens/VehicleDetailsScreen';
import { AddMaintenanceScreen } from '../screens/AddMaintenanceScreen';

export type RootStackParamList = {
  Home: undefined;
  AddVehicle: undefined;
  VehicleDetails: {
    vehicle: Vehicle;
  };
  AddMaintenance: {
    vehicleId: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Meus veículos' }}
        />

        <Stack.Screen
          name="AddVehicle"
          component={AddVehicleScreen}
          options={{ title: 'Adicionar veículo' }}
        />

        <Stack.Screen
          name="VehicleDetails"
          component={VehicleDetailsScreen}
          options={{
            title: 'Detalhes do veículo',
            contentStyle: { backgroundColor: '#F5F5F5' },
          }}
        />

        <Stack.Screen
          name="AddMaintenance"
          component={AddMaintenanceScreen}
          options={{ title: 'Adicionar manutenção' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
