import React from 'react';
import {SectionList} from 'react-native';
import {Text} from "react-native-elements/src/index";

export default class SettingsScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    // return <ExpoConfigView/>;
    return <SectionList
      renderItem={({item, index, section}) => <Text key={index}>{item}</Text>}
      renderSectionHeader={({section: {title}}) => (
        <Text style={{fontWeight: 'bold'}}>{title}</Text>
      )}
      sections={[
        {title: 'Title1', data: ['item1', 'item2']},
        {title: 'Title2', data: ['item3', 'item4']},
        {title: 'Title3', data: ['item5', 'item6']},
      ]}
      keyExtractor={(item, index) => item + index}
    />
  }
}
