module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("Tests", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        category: {
            type: DataTypes.STRING(35),
        },

        itemId: {
            type: DataTypes.STRING(35),
        },

        itemName: {
            type: DataTypes.STRING,
        },

        minPrice: {
            type: DataTypes.INTEGER(5),
        },

        popular: {
            type: DataTypes.BOOLEAN(true),
        },
        type: {
            type: DataTypes.STRING(35),
        },
        objectID: {
            type: DataTypes.STRING(35),
        },
    })
    return users;
}
 