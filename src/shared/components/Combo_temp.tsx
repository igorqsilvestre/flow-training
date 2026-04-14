import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { theme } from '../themes/theme';

interface ComboBoxOption {
  label: string;
  valor: string;
}

interface ComboBoxProps {
  valores: ComboBoxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function ComboBox({
  valores,
  value,
  onChange,
  placeholder = 'Selecione uma opção',
}: ComboBoxProps) {
  const [visible, setVisible] = useState(false);

  const selectedLabel =
    valores.find((item) => item.valor === value)?.label ?? placeholder;

  return (
    <>
      {/* Campo */}
      <TouchableOpacity
        style={styles.container}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.text,
            !value && { color: theme.colors.primary },
          ]}
        >
          {selectedLabel}
        </Text>

        <MaterialIcons
          name="keyboard-arrow-down"
          size={24}
          color={theme.colors.primary}
        />
      </TouchableOpacity>

      {/* Modal */}
      <Modal transparent animationType="fade" visible={visible}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modal}>
            <FlatList
              data={valores}
              keyExtractor={(item) => item.valor}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onChange?.(item.valor);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
  },
  text: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.primary,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 24,
  },
  modal: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    maxHeight: 300,
  },
  option: {
    width: '100%',        
    padding: 14,
  },
  optionText: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.primary,
  },
});
