import { Sequelize, DataTypes } from 'sequelize';
import defaultConfig from '../config/dbConfig.js';
import createBlogModel from './blogModel.js';
import createAuthorModel from './authorModel.js';

const sequelize = new Sequelize(
  defaultConfig.dbConfig.DB,
  defaultConfig.dbConfig.USER,
  defaultConfig.dbConfig.PASSWORD, {
  host: defaultConfig.dbConfig.HOST,
  dialect: defaultConfig.dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: defaultConfig.dbConfig.pool.max,
    min: defaultConfig.dbConfig.pool.min,
    acquire: defaultConfig.dbConfig.pool.acquire,
    idle: defaultConfig.dbConfig.pool.idle
  }
}
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected..');
  } catch (err) {
    console.log('Error: ' + err);
  }
})();

const db = {
  Sequelize,
  sequelize
};



const [blogs, authors] = [createBlogModel, createAuthorModel].map(fn => fn(sequelize, DataTypes));
db.blogs = blogs;
db.authors = authors;

sequelize.sync({ force: false })
  .then(() => {
    console.log('Re-sync done!');
  });

export default db;
