import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './AddMaintenanceScreen.styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../routes/AppRoutes';
import { Maintenance } from '../types/maintenance';
import { saveMaintenance } from '../database/maintenanceRepository';

type Props = NativeStackScreenProps<RootStackParamList, 'AddMaintenance'>;

export function AddMaintenanceScreen({ route, navigation }: Props) {
  const { vehicleId } = route.params;

  const [lastKm, setLastKm] = useState('');
  const [intervalKm, setIntervalKm] = useState('');

  function handleSave() {
    if (!lastKm.trim()) {
      Alert.alert('Atenção', 'Informe o KM da última troca.');
      return;
    }

    if (!intervalKm.trim()) {
      Alert.alert('Atenção', 'Informe o intervalo em KM.');
      return;
    }

    const maintenance: Maintenance = {
      id: String(Date.now()),
      vehicleId,
      type: 'oil_change',
      lastKm: Number(lastKm),
      intervalKm: Number(intervalKm),
      createdAt: new Date().toISOString(),
    };

    saveMaintenance(maintenance);

    Alert.alert('Sucesso', 'Manutenção cadastrada com sucesso!');
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>KM da última troca</Text>
      <TextInput
        value={lastKm}
        onChangeText={setLastKm}
        keyboardType="numeric"
        placeholder="Ex: 10000"
        style={styles.input}
      />

      <Text style={styles.label}>Intervalo da troca em KM</Text>
      <TextInput
        value={intervalKm}
        onChangeText={setIntervalKm}
        keyboardType="numeric"
        placeholder="Ex: 3000"
        style={styles.input}
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
        <Text style={styles.primaryButtonText}>Salvar manutenção</Text>
      </TouchableOpacity>
    </View>
  );
}
