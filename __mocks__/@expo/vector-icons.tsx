import { View } from 'react-native';

type DetailRowProps = {
  name: string;
};

export function MaterialCommunityIcons({ name }: DetailRowProps) {
  return <View testID={name} />;
}
