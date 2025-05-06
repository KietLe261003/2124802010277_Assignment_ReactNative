import {TouchableHighlight, View, Image, Text, StyleSheet} from 'react-native';

interface ContactItemProps {
  onPress: () => void;
  name: string;
  phone: string;
  avatar: string;
}

const ContactItem: React.FC<ContactItemProps> = ({
  onPress,
  name,
  phone,
  avatar,
}) => {
  return (
    <TouchableHighlight
      underlayColor={'#D8D8D8'}
      style={{paddingLeft: 24}}
      onPress={onPress}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 16,
          paddingBottom: 16,
          paddingRight: 24,
          borderBottomColor: '#D8D8D8',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}>
        <Image
          style={{borderRadius: 22, width: 44, height: 44}}
          source={{uri: avatar}}
        />
        <View style={{justifyContent: 'center', flex: 1, marginLeft: 20}}>
          <Text style={{color: '#000000', fontWeight: 'bold', fontSize: 16}}>
            {name}
          </Text>
          <Text style={{color: '#000000', fontWeight: 'bold', fontSize: 16}}>
            {phone}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ContactItem;