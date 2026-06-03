import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from './AddVehicleScreen.styles';
import SelectButton from '../components/SelectButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/AppRoutes';
import { saveVehicle } from '../database/vehicleRepository';
import { db } from '../database/database';

type VehicleType = 'car' | 'motorcycle';
type Props = NativeStackScreenProps<RootStackParamList, 'AddVehicle'>;

export function AddVehicleScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [currentKm, setCurrentKm] = useState('');
  const [type, setType] = useState<VehicleType>('car');

  async function handleSave() {
    if (!name.trim()) {
      Alert.alert('Atenção', 'Informe o nome do veículo.');
      return;
    }

    if (!currentKm.trim()) {
      Alert.alert('Atenção', 'Informe a quilometragem atual.');
      return;
    }

    const vehicle = {
      id: String(Date.now()),
      name,
      type,
      currentKm: Number(currentKm),
      createdAt: new Date().toISOString(),
    };

    try {
      saveVehicle(vehicle);

      Alert.alert('Sucesso', 'Veículo cadastrado com sucesso!');

      navigation.goBack();
    } catch (error) {}
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecione o tipo do veículo</Text>

      <SelectButton value={type} onChange={setType} />
      <Text style={styles.label}>Nome do veículo</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Ex: Civic, CG 160, Gol..."
        style={styles.input}
      />

      <Text style={styles.label}>KM atual</Text>
      <TextInput
        value={currentKm}
        onChangeText={setCurrentKm}
        placeholder="Ex: 45000"
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
        <Text style={styles.primaryButtonText}>Salvar veículo</Text>
      </TouchableOpacity>
    </View>
  );
}
