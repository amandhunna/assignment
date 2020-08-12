module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(35),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(20),
            allowNull: false,
        }
    })
    return users;
}
