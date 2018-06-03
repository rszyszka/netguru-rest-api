import mongoose, {Schema} from 'mongoose';

const movieSchema = new Schema({
    Title: {
        type: 'String',
        unique: true
    },
    Year: {
        type: 'String'
    },
    Rated: {
        type: 'String'
    },
    Released: {
        type: 'String'
    },
    Runtime: {
        type: 'String'
    },
    Genre: {
        type: 'String'
    },
    Director: {
        type: 'String'
    },
    Writer: {
        type: 'String'
    },
    Actors: {
        type: 'String'
    },
    Plot: {
        type: 'String'
    },
    Language: {
        type: 'String'
    },
    Country: {
        type: 'String'
    },
    Awards: {
        type: 'String'
    },
    Poster: {
        type: 'String'
    },
    Ratings: {
        type: [
            'Mixed'
        ]
    },
    Metascore: {
        type: 'String'
    },
    imdbRating: {
        type: 'String'
    },
    imdbVotes: {
        type: 'String'
    },
    imdbID: {
        type: 'String'
    },
    Type: {
        type: 'String'
    },
    DVD: {
        type: 'String'
    },
    BoxOffice: {
        type: 'String'
    },
    Production: {
        type: 'String'
    },
    Website: {
        type: 'String'
    },
    totalSeasons: {
        type: 'String'
    }
});

movieSchema.methods = {
    view(type){
        switch(type) {
            case 'list':
                return{
                    id: this.id,
                    title: this.Title,
                    genre: this.Genre,
                    year: this.Year
                };
            default:
                return this.toJSON();
        }
    }
};

const model = mongoose.model('Movie', movieSchema);
export const schema = model.schema;
export default model;