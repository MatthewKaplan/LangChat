import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Input } from '../common';
import { Actions } from 'react-native-router-flux';
import { MaterialCommunityIcons, AntDesign, EvilIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { changeUsername, changePassword, login } from '../../actions/index';

class LoginForm extends Component {
	handleChange = (text, input) => {
		if (input === 'username') {
			this.props.changeUsername(text);
		} else {
			this.props.changePassword(text);
		}
	};

	login = async () => {
		const { username, password } = this.props;
		try {
			const res = await fetch('https://langchat-crosspollination.herokuapp.com/api/v1/log_in/?format=json', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify({ username, password })
			});
			const user = await res.json();
			const cookieData = res.headers.get('set-cookie'); //use postive lookbehind to extract csfrtoken= and positive lookahead to extract ;
			const match = cookieData.match(/(csrftoken=)\w+;/);
			const csrftoken = match[0].split('=')[1].slice(0, -1);
			this.props.login(user, csrftoken); // redux
			Actions.home();
		} catch (error) {
			console.log(error.message);
		}
	};

	render() {
		const { containerStyle, inputContainerStyle, textHeaderStyle, buttonContainerStyle } = styles;
		const { username, password } = this.props;
		return (
			<View style={containerStyle}>
				<EvilIcons name="close" size={40} onPress={() => Actions.splashPage()} style={{ width: '13%' }} />
				<Text style={textHeaderStyle}>Log In</Text>
				<View style={inputContainerStyle}>
					<Input
						label={<MaterialCommunityIcons name="email-outline" size={30} color="#999" />}
						placeholder="Username"
						value={this.props.username}
						onChangeText={username => this.handleChange(username, 'username')}
						required
					/>
				</View>
				<View style={inputContainerStyle}>
					<Input
						label={<AntDesign name="lock" size={30} color="#999" />}
						placeholder="Password"
						secureTextEntry
						value={this.props.password}
						onChangeText={password => this.handleChange(password, 'password')}
					/>
				</View>
				<View style={buttonContainerStyle}>
					<Button disabled={!username || !password} onPress={this.login}>
						Log In
					</Button>
				</View>
			</View>
		);
	}
}

const styles = {
	inputContainerStyle: {
		borderBottomWidth: 1,
		padding: 5,
		backgroundColor: '#fff',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		borderColor: '#ddd',
		position: 'relative'
	},
	containerStyle: {
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 1,
		marginLeft: 5,
		marginRight: 5,
		paddingTop: 50
	},
	textHeaderStyle: {
		fontSize: 30,
		fontWeight: '600',
		paddingTop: 30,
		paddingBottom: 40
	},
	buttonContainerStyle: {
		marginTop: 80
	}
};

export const mapStateToProps = state => ({
	username: state.auth.username,
	password: state.auth.password
});

export const mapDispatchToProps = dispatch => ({
	changeUsername: text => dispatch(changeUsername(text)),
	changePassword: text => dispatch(changePassword(text)),
	login: (user, token) => dispatch(login(user, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
