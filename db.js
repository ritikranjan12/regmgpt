import * as SQLite from 'expo-sqlite/next';
// Create operation
const db = SQLite.openDatabase('chat.db');

// Create operation
function create(chat) {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO chats (message) VALUES (?)',
            [chat.message],
            (_, { insertId }) => {
                console.log('Chat created with ID: ' + insertId);
            },
            (_, error) => {
                console.error('Error creating chat: ' + error);
            }
        );
    });
}

// Read operation
function read(id) {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM chats WHERE id = ?',
            [id],
            (_, { rows }) => {
                if (rows.length > 0) {
                    const chat = rows.item(0);
                    console.log('Chat found:', chat);
                } else {
                    console.log('Chat not found');
                }
            },
            (_, error) => {
                console.error('Error reading chat: ' + error);
            }
        );
    });
}

// Update operation
function update(id, chat) {
    db.transaction(tx => {
        tx.executeSql(
            'UPDATE chats SET message = ? WHERE id = ?',
            [chat.message, id],
            () => {
                console.log('Chat updated with ID: ' + id);
            },
            (_, error) => {
                console.error('Error updating chat: ' + error);
            }
        );
    });
}

// Delete operation
function del(id) {
    db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM chats WHERE id = ?',
            [id],
            () => {
                console.log('Chat deleted with ID: ' + id);
            },
            (_, error) => {
                console.error('Error deleting chat: ' + error);
            }
        );
    });
}
