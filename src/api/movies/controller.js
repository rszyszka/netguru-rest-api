import { response } from "../../services/response";
import Movie from './model';
import axios from 'axios';

export const fetchMovie = (req, res, next) => {
    const { Title } = req.body;
    if(!Title)
        response(res,404)({message: 'Title not given'});
    else {
        axios.get('http://www.omdbapi.com/',{
             params: {
                        apiKey: '65d355aa',
                        t: Title
                    }
        }).then((movie) =>{
            if(movie.data.Response === 'True') {
                Movie.create(movie.data)
                    .then(response(res,201))
                    .catch((err) => {
                        if (err.code === 11000) {
                            res.status(409).json({
                                valid: false,
                                param: 'Title',
                                message: 'This movie is already in the database'
                            })
                        }else{
                            next(err);
                        }
                    });
            }else{
                response(res,404)({message: 'Movie not found'})
            }
        });
    }
};

export const index = (req, res, next) => {
    return Movie.find()
        .sort({Title: 1})
        .then((movies) => movies.map((movie) => movie.view('list')))
        .then(response(res))
        .catch(next)
};

export const searchByYear = (req, res, next) => {
    const minYear = req.params.minYear;
    const maxYear = req.params.maxYear;
    Movie.find({
        'Year': {$lte:maxYear, $gte: minYear}
    })
    .sort({Title: 1})
    .then((movies) => movies.map((movie) => movie.view('list')))
    .then(response(res))
    .catch(next)
};