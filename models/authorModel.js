var validator = require('validator');

module.exports = (sequelize, DataTypes) => {

    const Author = sequelize.define("author", {
        
        authorId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey : true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique : true,
            
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        }
        
        
    })

    return Author

}