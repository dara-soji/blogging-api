const request = require('supertest')
const { connect } = require('./database')
const UserModel = require('../models/user.model')
const app = require('../app');

describe('Auth: Signup', () => {
    let conn;

    beforeAll(async () => {
        conn = await connect()
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('should signup a user', async () => {
        const response = await request(app).post('/api/v1/auth/signup')
        .set('content-type', 'application/json')
        .send({ 
            username: 'dara_soji', 
            password: '12345678', 
            first_name: 'dara',
            last_name: 'adesoji',
            email: 'dara@example.com'
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('status')
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('token')
        expect(response.body.data.data).toHaveProperty('username', 'dara_soji')
        expect(response.body.data.data).toHaveProperty('first_name', 'dara')
        expect(response.body.data.data).toHaveProperty('last_name', 'adesoji')
        expect(response.body.data.data).toHaveProperty('email', 'dara@example.com');        
    })


    // it('should login a user', async () => {
    //     // create user in out db
    //     const user = await UserModel.create({ email: 'dara@examples.com', password: '12345678', last_name: 'adesoji', first_name: 'dara'});

    //     // login user
    //     const response = await request(app)
    //     .mockResolvedValue({
    //         data: [
    //           {
    //             userId: 1,
    //             id: 1,
    //             title: "My First Album",
    //           },
    //           {
    //             userId: 1,
    //             id: 2,
    //             title: "Album: The Sequel",
    //           },
    //         ],
    //       });
    

    //     expect(response.status).toBe(200)
    //     expect(response.body).toHaveProperty('token')      
    // })
})