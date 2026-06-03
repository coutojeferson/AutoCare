import { TouchableOpacity, Text } from 'react-native';
import { styles } from './AddButton.styles';

type Props = {
  onPress: () => void
}

export default function AddButton({onPress}: Props) {
  return (
    <TouchableOpacity
  style={styles.fab}
  onPress={onPress}
>
  <Text style={styles.fabText}>+</Text>
</TouchableOpacity>
  );
}
