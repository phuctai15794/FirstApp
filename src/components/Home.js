import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Pressable, View, Text, TextInput, ToastAndroid } from 'react-native';
import PushNotification from 'react-native-push-notification';
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { connectDB, createTable, saveUser } from '../services/Database';
import { setRegister } from '../store/userReducer';
import { Constants } from '../utils';
import MainStyles from '../styles/Main';
import TextStyles from '../styles/Text';

Home = ({ navigation, route }) => {
	const [fullName, setFullName] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		createChannel();
	}, []);

	const createChannel = () => {
		PushNotification.createChannel({
			channelId: 'test-channel',
			channelName: 'Test Channel',
		});
	};

	const onPressRegister = async () => {
		if (fullName.trim() === '') {
			ToastAndroid.show('Please enter your full name', ToastAndroid.SHORT);
		} else {
			setFullName('');
			try {
				const data = {
					id: Math.floor(Math.random() * 1000),
					fullName: fullName,
				};

				const db = await connectDB();
				await createTable(db);
				await saveUser(db, data);

				// await AsyncStorage.setItem("userInfo", userDetail.fullName);

				dispatch(setRegister(fullName));
				navigation.navigate(Constants.ROUTES.LISTS.COUNTER.NAME);
			} catch (e) {
				console.log(e);
			}
		}
	};

	const onPressUser = () => {
		navigation.navigate(Constants.ROUTES.LISTS.USER.NAME);
	};

	return (
		<View style={MainStyles.body}>
			<TextInput
				style={[MainStyles.input, { marginBottom: 5 }]}
				placeholder="Enter your full name"
				value={fullName}
				keyboardType="default"
				onChangeText={setFullName}
			/>
			{route.params?.message ? (
				<Text style={[MainStyles.titleSub, TextStyles.clDanger, { marginBottom: 15 }]}>
					{route.params.message}
				</Text>
			) : null}
			<View
				style={{
					flexDirection: 'row',
				}}
			>
				<Pressable
					onPress={onPressRegister}
					android_ripple
					style={({ pressed }) => [
						{
							marginRight: 5,
							backgroundColor: pressed ? TextStyles.clPrimaryFocus.color : TextStyles.clPrimary.color,
						},
						MainStyles.pressableButton,
					]}
				>
					<Text style={TextStyles.clLight}>Register</Text>
				</Pressable>
				<Pressable
					onPress={onPressUser}
					android_ripple
					style={({ pressed }) => [
						{
							marginRight: 5,
							backgroundColor: pressed ? TextStyles.clInfoFocus.color : TextStyles.clInfo.color,
						},
						MainStyles.pressableButton,
					]}
				>
					<Text style={TextStyles.clLight}>User</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default Home;
