import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	ScrollView,
	Button,
	Text,
	TextInput,
	View,
	ImageBackground,
	RefreshControl,
	Alert,
	ToastAndroid,
} from 'react-native';
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { selectorUser } from '../store/userReducer';
import { Constants } from '../utils';
import MainStyles from '../styles/Main';
import TextStyles from '../styles/Text';

Counter = ({ navigation }) => {
	const [fullName, setFullName] = useState('');
	const [userInfo, setUserInfo] = useState(null);
	const [counter, setCounter] = useState(0);
	const [isLoggedIn, setLogin] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const { registerName } = useSelector(selectorUser);

	useEffect(() => {
		setUserInfo(registerName);
		// getUserInfo();
	}, []);

	const getUserInfo = async () => {
		try {
			const userInfo = await AsyncStorage.getItem('userInfo');
			setUserInfo(userInfo);
		} catch (e) {
			console.log(e);
		}
	};

	const onRefresh = () => {
		setTimeout(() => {
			setRefreshing(true);
			setFullName('');
			setCounter(0);
			setRefreshing(false);
		}, 1000);
	};

	const confirmLogout = (message) => {
		Alert.alert(
			'Notify',
			message,
			[
				{
					text: 'Cancel',
					onPress: () => {
						ToastAndroid.show("Yeahhh! You're still loggedin", ToastAndroid.SHORT);
					},
				},
				{
					text: 'OK',
					onPress: () => {
						setFullName('');
						setCounter(0);
						setLogin(false);
						ToastAndroid.show('Logout successfully', ToastAndroid.SHORT);
					},
				},
			],
			{
				cancelable: true,
			},
		);
	};

	const upCounter = () => {
		setCounter(counter + 1);
	};

	const downCounter = () => {
		counter > 0 && setCounter(counter - 1);
	};

	const resetCounter = () => {
		setCounter(0);
	};

	const login = () => {
		if (fullName.trim() === '') {
			ToastAndroid.show('Please enter your register name', ToastAndroid.SHORT);
		} else {
			ToastAndroid.show('Login successfully', ToastAndroid.SHORT);
			setLogin(true);
		}
	};

	const logout = () => {
		confirmLogout('Are you sure ?');
	};

	return (
		<ImageBackground style={{ height: '100%' }} source={require('../assets/background.jpg')}>
			<ScrollView
				contentContainerStyle={MainStyles.body}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			>
				<Text style={[MainStyles.titleMain, TextStyles.clLight, { marginBottom: 5 }]}>
					Welcome to the counter
				</Text>
				{!isLoggedIn ? (
					<>
						<Text style={[MainStyles.titleSub, TextStyles.clLight, { marginBottom: 5 }]}>
							Hello {userInfo}
						</Text>
						<Text style={[MainStyles.titleSub, TextStyles.clWarning, { marginBottom: 15 }]}>
							please login to play the counter
						</Text>
						<TextInput
							style={[MainStyles.input, { marginBottom: 5 }]}
							placeholder="Enter your register name"
							value={fullName}
							keyboardType="default"
							onChangeText={setFullName}
						/>
					</>
				) : (
					<>
						<Text style={[MainStyles.titleSub, TextStyles.clWarning, { marginBottom: 15 }]}>
							Hello, {fullName}
						</Text>
						<Text
							style={[
								TextStyles.clLight,
								{
									fontSize: 20,
									padding: 10,
									backgroundColor: TextStyles.clDark.color,
								},
							]}
						>
							Your counter is: <Text style={TextStyles.clWarning}>{counter}</Text>
						</Text>
					</>
				)}
				<View style={MainStyles.button}>
					{!isLoggedIn ? (
						<>
							<View style={{ marginRight: 10 }}>
								<Button
									title="Login"
									color={TextStyles.clSuccess.color}
									onPress={() => login()}
								></Button>
							</View>
							<View style={{ marginRight: 10 }}>
								<Button
									title="SignOut"
									color={TextStyles.clSecondary.color}
									onPress={async () => {
										// await AsyncStorage.removeItem("userInfo");
										navigation.navigate(Constants.ROUTES.LISTS.HOME.NAME, {
											message: 'I do not want to play',
										});
										// navigation.goBack()
									}}
								></Button>
							</View>
						</>
					) : (
						<>
							<View style={{ marginRight: 10 }}>
								<Button
									title="Up"
									color={TextStyles.clPrimary.color}
									onPress={() => upCounter()}
								></Button>
							</View>
							<View style={{ marginRight: 10 }}>
								<Button
									title="Down"
									disabled={!counter && true}
									color={TextStyles.clSecondary.color}
									onPress={() => downCounter()}
								></Button>
							</View>
							<View style={{ marginRight: 10 }}>
								<Button
									title="Reset"
									disabled={!counter && true}
									color={TextStyles.clWarning.color}
									onPress={() => resetCounter()}
								></Button>
							</View>
							<View>
								<Button
									title="Logout"
									color={TextStyles.clDanger.color}
									onPress={() => logout()}
								></Button>
							</View>
						</>
					)}
				</View>
			</ScrollView>
		</ImageBackground>
	);
};

export default Counter;
