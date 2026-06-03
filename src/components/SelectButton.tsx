import { TouchableOpacity, View, Text } from 'react-native';
import { styles } from './SelectButton.styles';

type VehicleType = 'car' | 'motorcycle';

type SelectButtonProps = {
  value: VehicleType;
  onChange: (value: VehicleType) => void;
};

export default function SelectButton({value, onChange}: SelectButtonProps) {

    return (
      <View style={styles.typeContainer}>
      <TouchableOpacity
        style={[
          styles.typeButton,
          value === 'car' && styles.typeButtonActive,
        ]}
        onPress={() => onChange('car')}
      >
        <Text
          style={[
            styles.typeText,
            value === 'car' && styles.typeTextActive,
          ]}
        >
          Carro
        </Text>
      </TouchableOpacity>
    
      <TouchableOpacity
        style={[
          styles.typeButton,
          value === 'motorcycle' && styles.typeButtonActive,
        ]}
        onPress={() => onChange('motorcycle')}
      >
        <Text
          style={[
            styles.typeText,
            value === 'motorcycle' && styles.typeTextActive,
          ]}
        >
          Moto
        </Text>
      </TouchableOpacity>
    </View>
    )
  
}
