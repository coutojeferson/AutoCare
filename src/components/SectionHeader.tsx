import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './SectionHeader.styles';

type Props = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
};

export function SectionHeader({ icon, title }: Props) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.iconCircle}>
        <MaterialCommunityIcons name={icon} size={22} color="#000" />
      </View>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}
