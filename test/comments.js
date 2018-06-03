import Comment from '../src/api/comments/model';
import Movie from '../src/api/movies/model';
import app from '../src/app';
import chai from 'chai';
import chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';

let should = chai.should();
chai.use(chaiHttp);

let id;

describe('Comments', () => {
    before((done) => {
        Comment.remove().then();
        Movie.remove().then();
        Movie.create({Title: "Hello"})
            .then((res)=>{
            id = res.id;
        });
        done();
    });

    describe('/GET Comments',()=>{
        it('it should GET all comments',(done)=>{
            chai.request(app)
                .get('/comments')
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        });

        it('it should GET comments on specified movie',(done)=>{
            chai.request(app)
                .get('/comments')
                .query({id: id})
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        })
    });
    describe('/POST Comments',()=>{
        it('it should create comment',(done)=>{

            const req = {
                movie: id,
                text: 'Touching'
            };
            chai.request(app)
                .post('/comments')
                .send(req)
                .end((err,res)=>{
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                })
        });
        it('it should give message that movie id is required',(done)=>{
            const req = {
                text: 'Touching'
            };
            chai.request(app)
                .post('/comments')
                .send(req)
                .end((err,res)=>{
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message')
                        .eql('movie id is required');
                    done();
                })
        });
        it('it should give message that movie of given id does not exist',(done)=>{
            const req = {
                movie: '4dda112331a11e',
                text: 'Touching'
            };
            chai.request(app)
                .post('/comments')
                .send(req)
                .end((err,res)=>{
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message')
                        .eql('Movie of given id does not exist');
                    done();
                })
        });
        it('it should give message that field text is required',(done)=>{
            const req = {
                movie: id
            };
            chai.request(app)
                .post('/comments')
                .send(req)
                .end((err,res)=>{
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.text.should.have.property('kind').eql('required');
                    done();
                })
        })
    })
});