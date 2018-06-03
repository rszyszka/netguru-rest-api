import Comments from './model'
import Movie from '../movies/model'
import {response} from "../../services/response";
import mongoose from "mongoose";

export const index = (req, res, next) => {
    const id = req.query.id;
    if(id){
     return Movie.findOne({_id: id}).exec((err, movie) => {
         if(movie) {
             Comments.find()
                 .where('movie').equals(movie.id)
                 .then(response(res))
                 .catch(next)
         }else{
             Comments.find()
                 .then(response(res))
                 .catch(next)
         }
        })
    }
    return Comments.find()
        .then(response(res))
        .catch(next)
};

export const create = (req,res,next) =>{
    const {movie, text} = req.body;
    if(movie) {
        return Movie.findOne({_id: movie}).exec((err, result) => {
            if (result) {
                Comments.create({movie, text})
                    .then(response(res, 201))
                    .catch(next)
            } else {
                response(res, 404)({
                    message: 'Movie of given id does not exist'
                })
            }
        });
    }else{
        response(res,404)({
            message: 'movie id is required'
        })
    }
};

