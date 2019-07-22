import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TextMessage = props => {
  console.log(props.message)
	return <Text>{props.message}</Text>;
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 5,
		paddingBottom: 5,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignContent: 'center'
	},
	username: {
		fontWeight: '500',
		fontSize: 16
	},
	messageText: {
		fontSize: 16,
		flex: 1,
		flexWrap: 'wrap'
	},
	initialContainer: {
		width: 40,
		height: 40,
		marginRight: 15,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: 'black',
		justifyContent: 'center'
	},
	initials: {
		fontSize: 22,
		textAlign: 'center'
	}
});

export default TextMessage;
