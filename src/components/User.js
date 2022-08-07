import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, ImageBackground, TouchableHighlight, FlatList } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { fetchUsers, selectorUser } from '../store/userReducer';
import MainStyles from '../styles/Main';
import TextStyles from '../styles/Text';

User = () => {
	const dispatch = useDispatch();
	const { users } = useSelector(selectorUser);

	useEffect(() => {
		dispatch(fetchUsers());
	}, []);

	const showNotification = (item) => {
		PushNotification.localNotification({
			channelId: 'test-channel',
			title: `User ${item.name}`,
			message: `${item.company.name}`,
			bigText: `User's address is ${item.address.street}, ${item.address.suite}, ${item.address.city}`,
			color: 'green',
			picture: 'https://koenig-media.raywenderlich.com/uploads/2020/07/PushNotificationsTutorial-twitter.png',
		});
	};

	return (
		<ImageBackground style={[MainStyles.body]} source={require('../assets/background.jpg')}>
			<Text style={[MainStyles.titleMain, TextStyles.clLight, { marginBottom: 20 }]}>List of Users</Text>
			<FlatList
				data={users}
				style={{ height: '100%' }}
				renderItem={({ item, index, separators }) => (
					<TouchableHighlight
						key={item.id}
						style={{ marginBottom: 10 }}
						onPress={() => showNotification(item)}
					>
						<View
							style={{
								backgroundColor: '#ececec',
								alignItems: 'center',
								padding: 10,
							}}
						>
							<Text>{`Name: ${item.name}`}</Text>
							<Text>{`Email: ${item.email}`}</Text>
						</View>
					</TouchableHighlight>
				)}
			/>
		</ImageBackground>
	);
};

export default User;
