import mongoose, {Schema} from 'mongoose'

const commentSchema = new Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    text: {
        type: 'String',
        trim: true,
        required: true
    }
});

const model = mongoose.model('Comment', commentSchema);
export default model;
export const schema = model.schema;