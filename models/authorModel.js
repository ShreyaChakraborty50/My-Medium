export default (sequelize, DataTypes) =>{

    const Author = sequelize.define("author",{
        authorId : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        authorName :{
            type : DataTypes.STRING,
            allowNull : false
        }


    })
    
    return Author

}

