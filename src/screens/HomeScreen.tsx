import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../routes/AppRoutes';
import { Vehicle } from '../types/vehicle';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AddButton from '../components/AddButton';
import { Card } from '../components/Card';
import { styles } from './HomeScreen.styles';
import { getAllVehicles } from '../database/vehicleRepository';
// import { updateVehicleKm } from '../storage/UpdateVehicleKm';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  async function loadVehicles() {
    const data = getAllVehicles();
    setVehicles(data);
  }

  function handleToVehicleDetailsScreen(vehicle: Vehicle) {
    navigation.navigate('VehicleDetails', { vehicle });
  }

  useFocusEffect(
    useCallback(() => {
      loadVehicles();
    }, []),
  );

  return (
    <View style={styles.container}>
      {vehicles.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.title}>Nenhum veículo cadastrado ainda</Text>
          <Text style={styles.subtitle}>
            Cadastre seu carro ou moto para acompanhar as manutenções.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddVehicle')}
          >
            <Text style={styles.buttonText}>Adicionar veículo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={vehicles}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View>
                <Card
                  item={item}
                  onPress={() => handleToVehicleDetailsScreen(item)}
                />
              </View>
            )}
          />
          <AddButton onPress={() => navigation.navigate('AddVehicle')} />
        </>
      )}
    </View>
  );
}
