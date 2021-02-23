const updateOneDocument = (db, collectionName, updateQuery, newData) => {
    const updatePromise = db
        .collection(collectionName)
        .updateOne(updateQuery, { $set: newData, $inc: { age: 1 } });

    updatePromise
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });
};

module.exports = updateOneDocument;
