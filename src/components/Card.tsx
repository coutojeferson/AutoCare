import { Text, TouchableOpacity } from 'react-native';
import { Vehicle } from '../types/vehicle';
import { formatKm } from '../utils/formatKm';
import { getVehicleTypeLabel } from '../utils/getVehicleTypeLabel';
import { styles } from './Card.styles';

type Props = {
  item: Vehicle;
  onPress: () => void;
};

export function Card({ item, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.vehicleName}>{item.name}</Text>
      <Text style={styles.vehicleInfo}>
        Tipo: {getVehicleTypeLabel(item.type)}
      </Text>
      <Text style={styles.vehicleInfo}>
        KM atual: {formatKm(item.currentKm)}
      </Text>
    </TouchableOpacity>
  );
}
