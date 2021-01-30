const request = require('supertest');
const app = require('../index');

beforeAll(done => {
    done()

})
    describe('Sample Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true)
    })
  });

  describe('Get Endpoints works', () => {
    it('should return developer details', async () => {
     let res = await request(app)
      .get('/')
      .set('Accept', 'application/json')
    //   .expect('Content-Type', /json/)
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty("data");
    })
  });

  describe('Can validate a successful input', () => {
      it('should return successful validation', async() => {
        const res = await request(app)
      .post('/validate-rule')
      .send({
        "rule": {
            "field": "missions",
            "condition": "gte",
            "condition_value": 30
          },
          "data": {
            "name": "James Holden",
            "crew": "Rocinante",
            "age": 34,
            "position": "Captain",
            "missions": 45
          }
      })
    expect(res.status).toEqual(200)
    // expect(res.body).toHaveProperty('post')
      });
  })

  describe('Can throw an error response on wrong input', () => {
    it('should return a wrong validation', async() => {
      const res = await request(app)
    .post('/validate-rule')
    .send({
        
            "rule": {
              "field": "missions.name",
              "condition": "gte",
              "condition_value": 30
            },
            "data": {
              "name": "James Holden",
              "crew": "Rocinante",
              "age": 34,
              "position": "Captain",
            }
          }
    )
  expect(res.status).toEqual(400)
    });
})

describe('Can test the rule field', () => {
    it('should return the rule field is required', async() => {
      const res = await request(app)
    .post('/validate-rule')
    .send({
        
            "data": {
              "name": "James Holden",
              "crew": "Rocinante",
              "age": 34,
              "position": "Captain",
            }
          }
    )
  expect(res.status).toEqual(400)
    });
})

describe('Can test the contains condition value', () => {
    it('should return the rule field contains the condition value', async() => {
      const res = await request(app)
    .post('/validate-rule')
    .send({
        
        "rule": {
            "field": 0,
            "condition": "contains",
            "condition_value": "jed"
          },
          "data": ["jedidiah", "tony", 7]
          }
    )
  expect(res.status).toEqual(200)
    });
})

describe('Can test the Greater than or equal to condition value', () => {
    it('should return the rule field is greater than the condition value', async() => {
      const res = await request(app)
    .post('/validate-rule')
    .send({
        
        "rule": {
            "field": 0,
            "condition": "gte",
            "condition_value": 10
          },
          "data": [10, "tony", 7]
          }
    )
  expect(res.status).toEqual(200)
    });
});

describe('Can test the Not equal to condition value', () => {
    it('should fail the rule field is not equal to the condition value', async() => {
      const res = await request(app)
    .post('/validate-rule')
    .send({
        
        "rule": {
            "field": 0,
            "condition": "neq",
            "condition_value": 10
          },
          "data": [10, "tony", 7]
          }
    )
  expect(res.status).toEqual(400)
    });
});

  afterAll(done => {
   
    done()
  })