const deleteDocument = (db, collectionName, deleteQuery) => {
    db.collection(collectionName)
        .deleteMany(deleteQuery)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });
};

module.exports = deleteDocument;
