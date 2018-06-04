import Movie from '../src/api/movies/model';
import app from '../src/app';
import chai from 'chai';
import chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';

let should = chai.should();
chai.use(chaiHttp);

describe('Movies', () => {
    before((done) => {
        Movie.remove().catch();
        Movie.create({Title: 'American Sniper', Year: '2014'},(err)=>{
            done();
        });
    });

    describe('/POST movies', () =>{
        it('it should fetch movie by given title from external api and add it to database',(done)=>{
        let movie = {
            Title: "American Pie"
        };

        chai.request(app)
            .post('/movies')
            .send(movie)
            .end((err,res) =>{
                res.should.have.status(201);
                res.body.should.be.a('object');
                done();
            })
    });

    it('it should give message that no title is given',(done)=>{
        let movie = {
            Year: "2001"
        };
        chai.request(app)
            .post('/movies')
            .send(movie)
            .end((err,res) =>{
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.message.should.be.eql('Title not given');
                done();
            })
    });

    it('it should not add a movie to the database because this one already exist',(done)=>{
        let movie = {
            Title: "American Pie"
        };

        chai.request(app)
            .post('/movies')
            .send(movie)
            .end((err,res) =>{
                res.should.have.status(409);
                res.body.should.be.a('object');
                res.body.should.have.property('valid').eql(false);
                res.body.should.have.property('message');
                res.body.message.should.be.eql('This movie is already in the database');
                done();
            })
    });
    });

    describe('/GET movies', () =>{
        it('it should GET all the movies',(done) =>{
            chai.request(app)
                .get('/movies')
                .end((err,res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
    });

        it('it should GET movies from given year range',(done) =>{
            chai.request(app)
                .get('/movies/2010/2015')
                .end((err,res)=>{
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                })
                
        })
});

});