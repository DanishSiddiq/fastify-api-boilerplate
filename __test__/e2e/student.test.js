const HttpStatus    = require('http-status-codes');
const fastify       = require('../../src/app');
const studentModel  = require('../../src/models/student-model');

jest.mock('../../src/models/student-model');

beforeAll(() => {
    mockCreateStudent();
    mockFindStudent();
    mockUpdateStudent();
});

const mockCreateStudent = () => {
    studentModel.create.mockResolvedValue(
        {
            "_id": "5e456a4628309eb0e1c53d9a",
            "firstName": "Danish",
            "lastName": "Siddiq",
            "registrationNumber": "313",
            "createdAt": "2020-02-13T15:24:54.384Z",
            "updatedAt": "2020-02-13T15:25:39.714Z"
        }
    );
};

const mockFindStudent = () => {
    studentModel.findOne.mockResolvedValue(
        {
            "_id": "5e456a4628309eb0e1c53d9a",
            "firstName": "Danish",
            "lastName": "Siddiq",
            "registrationNumber": "313",
            "createdAt": "2020-02-13T15:24:54.384Z",
            "updatedAt": "2020-02-13T15:25:39.714Z"
        }
    );
};

const mockUpdateStudent = () => {
    studentModel.updateOne.mockResolvedValue(
        {
            n: 1,
            nModified: 1,
            ok: 1
        }
    );
};

afterAll(() => {
    fastify.close();
});

test('create student [POST `/v1/student`]', async () => {
    const res = await fastify.inject({
        method: 'POST',
        url: '/v1/student',
        payload: {
            firstName : "Danish",
            lastName : "Siddiq",
            registrationNumber : 313
        }
    });

    expect(res.statusCode).toEqual(HttpStatus.CREATED);
    expect(JSON.parse(res.payload))
        .toEqual(expect.objectContaining({
            _id: expect.any(String),
            firstName: expect.any(String),
            lastName: expect.any(String)
    }))
});

test('find student [GET `/v1/student/:id`]', async () => {
    const res = await fastify.inject({
        method: 'GET',
        url: '/v1/student/5e456a4628309eb0e1c53d9a',
    });

    expect(res.statusCode).toEqual(HttpStatus.OK);
    expect(JSON.parse(res.payload))
        .toEqual(expect.objectContaining({
            _id: '5e456a4628309eb0e1c53d9a',
            firstName: 'Danish'
        }));

});


test('update student [PUT `/v1/student/:id`]', async () => {
    const res = await fastify.inject({
        method: 'PUT',
        url: '/v1/student/5e456a4628309eb0e1c53d9a?firstName=Danish 1&lastName=Siddiq 1',
    });

    expect(res.statusCode).toEqual(HttpStatus.OK);
    expect(JSON.parse(res.payload))
        .toEqual({ status: 'ok' });
});

