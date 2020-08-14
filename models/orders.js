module.exports = (sequelize, DataTypes) => {
    const orders = sequelize.define("Orders", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER(11),
        },
        paid: {
            type: DataTypes.BOOLEAN(false),
        },
        items: {
            type: DataTypes.STRING()
        }
    })
    return orders;
}
