import { enablePromise, openDatabase } from 'react-native-sqlite-storage';

enablePromise(true);

const databaseName = 'counter.db';
const tableName = 'Users';

export const connectDB = async () => {
	return openDatabase({ name: databaseName, location: 'default' });
};

export const deleteDatabase = async (db) => {
	await db.executeSql(`DROP DATABASE ${databaseName}`);
};

export const createTable = async (db) => {
	await db.executeSql(`CREATE TABLE IF NOT EXISTS ${tableName}(
    id INT AUTO_INCREMENT NOT NULL,
    fullName VARCHAR(100) NOT NULL
  )`);
};

export const deleteTable = async (db) => {
	await db.executeSql(`DROP TABLE ${tableName}`);
};

export const getAllUsers = async (db) => {
	try {
		const items = [];
		const results = await db.executeSql(`SELECT id, fullName FROM ${tableName}`);
		results.forEach((result) => {
			for (let index = 0; index < result.rows.length; index++) {
				items.push(result.rows.item(index));
			}
		});
		return items;
	} catch (error) {
		console.error(error);
		throw Error('Failed to get items !!!');
	}
};

export const getDetailUser = async (db, fullName) => {
	try {
		const data = await db.executeSql(`SELECT id, fullName FROM ${tableName} WHERE fullName = '${fullName}'`);
		const [result] = data.length && data.map((item, index) => item.rows.item(index));
		return {
			id: result?.id,
			fullName: result?.fullName,
		};
	} catch (error) {
		console.error(error);
		throw Error('Failed to get detail !!!');
	}
};

export const saveUser = async (db, item) => {
	const detail = await getDetailUser(db, item.fullName);

	if (detail.id === undefined && detail.fullName === undefined) {
		await db.executeSql(`INSERT INTO ${tableName}(id, fullName) VALUES (${item.id}, '${item.fullName}')`);
	}
};

export const deleteUser = async (db, fullName) => {
	await db.executeSql(`DELETE FROM ${tableName} WHERE fullName = '${fullName}'`);
};
