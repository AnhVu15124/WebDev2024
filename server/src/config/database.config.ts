import {Sequelize} from "sequelize-typescript";
import env from "./env.config"

const sequelize = env.NODE_ENV === 'test' || env.NODE_ENV === 'development'
    ? new Sequelize(env.DATABASE as string,env.USER as string,env.PASSWORD as string,{
    host: env.DATABASE_HOST,
    dialect: 'mysql',
    logging: false
}) : new Sequelize(env.DATABASE_URL as string,{
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            required: true,
            rejectUnauthorized: false,
        },
    },
    logging: false,
});

export default sequelize;