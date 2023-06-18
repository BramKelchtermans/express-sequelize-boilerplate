import Sequelize, { DataTypes, Model } from 'sequelize';

class QueuableJob extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                jobName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                data: {
                    type: DataTypes.JSONB,
                    allowNull: true
                },
                status: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue: 'queued'
                }
            },
            {
                sequelize,
                timestamps: true
            }
        );
        return this;
    }

    static associate(models) { }
}

export default QueuableJob;