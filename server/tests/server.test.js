const Server = require('./../server');
const supertest = require('supertest');

let request;
let server;

// Wait for the server to start.
beforeAll(async () => {

    server = new Server();
    await server.init();    
    request = supertest(server.getServer());
});

// Get teams list.
it('Gets teams list', async done => {
    
    const response = await request.get('/teams/list');  
    expect(response.status).toBe(200);    
    expect(response.body.teams.length).toBeGreaterThan(0);
    done();
});

// Get countries.
it('Gets countries list', async done => {

    const response = await request.get('/countries/list');
    expect(response.status).toBe(200);
    expect(response.body.countries.length).toBeGreaterThan(0);
    done();
});

// Force a 404 status response code.
it('Forces 404', async done => {

    const response = await request.get('/nosuch');
    expect(response.status).toBe(404);    
    done();
});

// Finally stop the server.
afterAll(() => {
    server.closeServer();
});