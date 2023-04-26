module.exports = (sequelize, dataTypes) => {
    let alias = 'Actor_Movie';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true

        },
        actor_id: dataTypes.BIGINT(10),
        movie_id: dataTypes.BIGINT(10)
    };
    let config = {
        tableName : "actor_movie",
        timestamps: true,
        createdAt: 'created_at',
        updateAt: 'updated_at',
        deleteAt: false
    }
    const Actor_Movie = sequelize.define(alias, cols, config)

    return Actor_Movie
}