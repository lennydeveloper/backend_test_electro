import nodeFetch from 'node-fetch';
import _ from 'lodash';

global.fetch = nodeFetch;

describe("GET /api/user/likes", () => {
    test("should respond with a 200 HTTP STATUS CODE", async () => {
        const response = await fetch('http://localhost:3000/api/user/likes')
        expect(response.status).toBe(200)
    })
    test("It should respond with a list of 5 items", async () => {
        const response = await fetch('http://localhost:3000/api/user/likes')
        const data = await response.json();
        expect(data.length).toBe(5)
    })
})

describe("GET /api/search/photos", () => {
    test("should respond with a 200 HTTP STATUS CODE", async () => {
        const response = await fetch('http://localhost:3000/api/search/photos?search=extropeliarmus')
        expect(response.status).toBe(200)
    })
    test("It should respond with an empty list", async () => {
        const response = await fetch('http://localhost:3000/api/search/photos?search=extropeliarmus')
        const data = await response.json();
        expect(data.results.length).toBe(0)
    })
})