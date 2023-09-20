module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define("blog", {
    blogId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
    },

    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  return Blog;
};
