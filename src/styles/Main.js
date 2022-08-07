import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	body: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	titleMain: {
		fontSize: 30,
		textTransform: 'capitalize',
		fontFamily: 'Satisfy-Regular',
	},
	titleSub: {
		fontSize: 18,
		fontFamily: 'IndieFlower-Regular',
	},
	input: {
		width: '100%',
		borderWidth: 1,
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
		backgroundColor: '#ffffff',
	},
	button: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
	},
	pressableButton: {
		color: '#ffffff',
		borderRadius: 5,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 15,
		paddingRight: 15,
	},
});
