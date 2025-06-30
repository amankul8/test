
module.exports = {
    sqlExecuteHelper: (db, sql, params) => {
        return new Promise((resolve, reject) => {

            db.get(sql, [...params], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });

        })
    } 
}