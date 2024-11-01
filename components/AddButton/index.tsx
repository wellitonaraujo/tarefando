import {ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface AddButtonProps {
  icon: ImageSourcePropType;
  onPress: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({
  onPress,
}) => {
  return (
    <View>
      <TouchableOpacity 
        onPress={onPress} 
        style={styles.container}
      >
          <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#1E90FF',
      alignItems: 'center',
      height: 60,
      width: 60,
      padding: 10,
      borderRadius: 60,
      position: 'absolute',
      bottom: 25,
      justifyContent: 'center',
      alignSelf: 'center'
  },
  plus: {
      color: '#fff',
      fontSize: 24,
      fontWeight: '200'
  },
})