const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");



//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll().then((movies) => {
                res.render("moviesList.ejs", { movies })
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id, {
            include : ["genre", "actors"]
        
        })

        .then((movie) => {
                res.render('moviesDetail.ejs', { movie });
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5,
        })
            .then(movies => {
                res.render('newestMovies', { movies });
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte]: 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then((movies) => {
                res.render('recommendedMovies.ejs', {movies});
            });
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    add: function (req, res) {

        db.Genre.findAll()

        .then((allGenres) => {
         res.render("moviesAdd",{
            allGenres,
        });
        
    })
    .catch((error) => {
        console.log(error);
    })
    },

    create: function (req,res) {
        db.Movie.create({
            ...req.body,
        })

            return res.redirect("/movies")

    },
    edit: function(req, res) {
        const Movie = db.Movie.findByPk(req.params.id)

        const allGenres = db.Genre.findAll()

        Promise.all([Movie, allGenres])
        .then(function ([Movie, allGenres]) {
            return res.render("moviesEdit", {
                Movie : {
                    ...Movie.dataValues,
                    release_date : Movie.release_date.toISOString().split("T")[0],
                },
                allGenres,
            })
        }).catch(error => console.log(error))

    },
    update: function (req,res) {
        db.Movie.update(
            {
                ...req.body,
            },
            {
                where : {
                    id : req.params.id
                }
            }
        )
        .then(() => res.redirect("/movies/detail/" + req.params.id))
        .catch((error) => console.log(error))

    },
    delete: function (req, res) {

        db.Movie.findByPk(req.params.id)
        .then(Movie => {

            return res.render('moviesDelete', {
                Movie,
            })
        })
        .catch((error) => console.log(error))

    },
    destroy: function (req, res) {
        db.Actor.update(
            {
                favorite_movie_id : null,
            },{
                where : {
                    favorite_movie_id: req.params.id,
                },
            }
        ).then(() => {
            db.Actor_Movie.destroy({
                    where: {
                        movie_id: req.params.id
                    }
                }).then(() => {
                    db.Movie.destroy(
                        {
                            where : {
                                id: req.params.id
                            }
                        }
                    ).then(() => res.redirect("/movies"))
        })
    }).catch((error) => console.log(error))

    }
}

module.exports = moviesController;