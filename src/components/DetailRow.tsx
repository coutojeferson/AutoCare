import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './DetailRow.styles';

type Props = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
};

export function DetailRow({ icon, label, value }: Props) {
  return (
    <View style={styles.detailRow}>
      <MaterialCommunityIcons name={icon} size={20} color="#666" />
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}
