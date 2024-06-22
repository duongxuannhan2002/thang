import pool from './database.js'
const queryWithConnection = async (queryFunction) => {
    const connection = await pool.promise().getConnection();
    try {
        return await queryFunction(connection);
    } catch (error) {
        console.error('Query error:', error);
        throw error;
    } finally {
        connection.release();
    }
};

export const readAllNft = async () => {
    return queryWithConnection(async (connection) => {
        const sql = `SELECT * from MarketItems`;
        const [results] = await connection.execute(sql);
        return results;
    });
};

export const read1Nft = async (id) => {
    return queryWithConnection(async (connection) => {
        const sql = `SELECT * from MarketItems where itemId = ?`;
        const [results] = await connection.execute(sql, [id]); // Use prepared statement
        return results;
    });
};

export const createNft = async (nftname, owner, price, image, key, sold) => {
    return queryWithConnection(async (connection) => {
        const sql = `INSERT INTO MarketItems (nftname, owner, price, image, key, sold) VALUES (?, ?, ?, ?, ?, ?)`
        const [results] = await connection.execute(sql, [nftname, owner, price, image, key, sold])
        return results;
    })
}

export const updateSold = async (sold, itemId) => {
    return queryWithConnection(async (connection) => {
        const sql = `UPDATE MarketItems
                    SET sold = ?
                    WHERE itemId = ?`
        const [results] = await connection.execute(sql, [sold, itemId])
        return results;
    })
}

export const updateOwner = async (owner, itemId) => {
    return queryWithConnection(async (connection) => {
        const sql = `UPDATE MarketItems
                    SET owner = ?
                    WHERE itemId = ?`
        const [results] = await connection.execute(sql, [owner, itemId])
        return results;
    })
}
export const createTran = async (itemId, buyer, amount, transactionDate) => {
    return queryWithConnection(async (connection) => {
        const sql = `INSERT INTO Transactions (itemId, buyer, amount, transactionDate) VALUES (?, ?, ?, ?)`
        const [results] = await connection.execute(sql, [itemId, buyer, amount, transactionDate])
        return results;
    })
}

