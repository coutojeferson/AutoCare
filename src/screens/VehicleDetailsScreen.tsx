import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { RootStackParamList } from '../routes/AppRoutes';
import { Maintenance } from '../types/maintenance';
import { getMaintenanceStatusLabel } from '../utils/getMaintenanceStatusLabel';
import { getMaintenanceStatus } from '../utils/getMaintenanceStatus';
import { formatKm } from '../utils/formatKm';
import { formatDate } from '../utils/formatDate';
import { getVehicleTypeLabel } from '../utils/getVehicleTypeLabel';
import { getVehicleIcon } from '../utils/getVehicleIcon';
import { getLatestOilChange } from '../utils/getLatestOilChange';
import { getOilChangeMaintenances } from '../utils/getOilChangeMaintenances';
import { getNextOilChangeKm } from '../utils/getNextOilChangeKm';
import { getRemainingKm } from '../utils/getRemainingKm';
import { getRemainingKmMessage } from '../utils/getRemainingKmMessage';
import { DetailRow } from '../components/DetailRow';
import { SectionHeader } from '../components/SectionHeader';
import { styles } from './VehicleDetailsScreen.styles';
import {
  getMaintenancesByVehicle,
  saveMaintenance,
} from '../database/maintenanceRepository';
import { deleteVehicle, updateVehicleKm } from '../database/vehicleRepository';

type Props = NativeStackScreenProps<RootStackParamList, 'VehicleDetails'>;

export function VehicleDetailsScreen({ route, navigation }: Props) {
  const [vehicle, setVehicle] = useState(route.params.vehicle);
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [isKmModalVisible, setIsKmModalVisible] = useState(false);
  const [newKm, setNewKm] = useState(String(vehicle.currentKm));

  const latestOilChange = getLatestOilChange(maintenances);
  const oilHistory = getOilChangeMaintenances(maintenances);

  const nextKm = latestOilChange ? getNextOilChangeKm(latestOilChange) : null;

  const remainingKm =
    nextKm !== null ? getRemainingKm(nextKm, vehicle.currentKm) : null;

  const status =
    remainingKm !== null ? getMaintenanceStatus(remainingKm) : null;

  function handleDeleteVehicle() {
    Alert.alert(
      'Excluir veículo',
      'Tem certeza que deseja excluir este veículo? Esta ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive', // fica vermelho automaticamente no iOS
          onPress: () => {
            deleteVehicle(vehicle.id);
            navigation.goBack();
          },
        },
      ],
    );
  }

  function loadData() {
    try {
      const data = getMaintenancesByVehicle(vehicle.id);

      setMaintenances(data);

      setNewKm(String(vehicle.currentKm));
    } catch (error) {}
  }

  async function handleMaintenance() {
    if (!latestOilChange) {
      return navigation.navigate('AddMaintenance', {
        vehicleId: vehicle.id,
      });
    }

    const maintenance: Maintenance = {
      id: String(Date.now()),
      vehicleId: vehicle.id,
      type: 'oil_change',
      lastKm: Number(vehicle.currentKm),
      intervalKm: latestOilChange.intervalKm,
      createdAt: new Date().toISOString(),
    };

    saveMaintenance(maintenance);
    loadData();
    Alert.alert('Sucesso', 'Troca de óleo registrada com sucesso!');
  }

  async function handleUpdateKm() {
    if (!newKm.trim()) {
      Alert.alert('Atenção', 'Informe o KM atual.');
      return;
    }

    const parsedKm = Number(newKm);

    if (Number.isNaN(parsedKm)) {
      Alert.alert('Atenção', 'Informe um KM válido.');
      return;
    }

    updateVehicleKm(vehicle.id, parsedKm);
    setVehicle((prev) => ({ ...prev, currentKm: parsedKm }));
    setIsKmModalVisible(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [vehicle.id]),
  );

  const vehicleIcon = getVehicleIcon(vehicle.type);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.vehicleHeader}>
            <View style={styles.iconCircleLarge}>
              <MaterialCommunityIcons
                name={vehicleIcon}
                size={28}
                color="#000"
              />
            </View>
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>{vehicle.name}</Text>
              <Text style={styles.vehicleType}>
                {getVehicleTypeLabel(vehicle.type)}
              </Text>
              <Text style={styles.currentKm}>
                KM atual:{' '}
                <Text style={styles.currentKmValue}>
                  {formatKm(vehicle.currentKm)}
                </Text>
              </Text>
            </View>
            <MaterialCommunityIcons
              onPress={handleDeleteVehicle}
              name="trash-can-outline"
              size={28}
              color="#888"
            />
          </View>

          <TouchableOpacity
            style={styles.outlineButton}
            onPress={() => {
              setNewKm(String(vehicle.currentKm));
              setIsKmModalVisible(true);
            }}
          >
            <MaterialCommunityIcons name="refresh" size={20} color="#000" />
            <Text style={styles.outlineButtonText}>Atualizar KM</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <SectionHeader icon="oil" title="Troca de óleo" />

          {latestOilChange && status && remainingKm !== null ? (
            <>
              <View style={styles.statusBlock}>
                <View
                  style={[styles.statusDot, { backgroundColor: status.color }]}
                />
                <View style={styles.boxLabel}>
                  <Text style={[styles.statusLabel, { color: status.color }]}>
                    {getMaintenanceStatusLabel(status)}
                  </Text>
                  <Text style={styles.statusSubtext}>
                    {getRemainingKmMessage(remainingKm)}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <DetailRow
                icon="clock-outline"
                label="Última troca"
                value={formatKm(latestOilChange.lastKm)}
              />
              <DetailRow
                icon="calendar-outline"
                label="Próxima troca"
                value={formatKm(nextKm!)}
              />
              <DetailRow
                icon="refresh"
                label="Intervalo"
                value={formatKm(latestOilChange.intervalKm)}
              />
            </>
          ) : (
            <Text style={styles.emptyText}>
              Nenhuma manutenção cadastrada ainda.
            </Text>
          )}

          <TouchableOpacity
            style={[
              styles.primaryButton,
              !latestOilChange && styles.primaryButtonSpaced,
            ]}
            onPress={handleMaintenance}
          >
            <MaterialCommunityIcons name="oil" size={20} color="#FFF" />
            <Text style={styles.primaryButtonText}>
              {latestOilChange
                ? 'Marcar óleo como trocado agora'
                : 'Adicionar troca de óleo'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <SectionHeader icon="history" title="Histórico de trocas" />

          {oilHistory.length > 0 ? (
            <View style={styles.timeline}>
              {oilHistory.map((item, index) => (
                <View key={item.id} style={styles.timelineItem}>
                  <View style={styles.timelineLeft}>
                    <View style={styles.timelineDot} />
                    {index < oilHistory.length - 1 && (
                      <View style={styles.timelineLine} />
                    )}
                  </View>
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineKm}>
                      {formatKm(item.lastKm)}
                    </Text>
                    <Text style={styles.timelineType}>Troca de óleo</Text>
                  </View>
                  <Text style={styles.timelineDate}>
                    {formatDate(item.createdAt, item.id)}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>Nenhuma troca registrada.</Text>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={isKmModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsKmModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Atualizar KM</Text>

            <TextInput
              value={newKm}
              onChangeText={setNewKm}
              keyboardType="numeric"
              placeholder="Ex: 1000"
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleUpdateKm}
            >
              <Text style={styles.primaryButtonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsKmModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
