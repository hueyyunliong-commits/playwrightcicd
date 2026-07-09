//REST API - CRUD operations
import { test, expect } from '@playwright/test';

test('test15 - REST API - GET Request ', async ({ request }) => {
  
  await request.get('https://jsonplaceholder.typicode.com/posts/1').then(async (response) => {
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id', 1);
    expect(responseBody).toHaveProperty('title');
    expect(responseBody).toHaveProperty('body');
  })
});

test('test15 - REST API - POST Request ', async ({ request }) => {
  await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'foo',
      body: 'bar',
      userId: 1,
    },
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(async (response) => {
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('title', 'foo');
    expect(responseBody).toHaveProperty('body', 'bar');
    expect(responseBody).toHaveProperty('userId', 1);
  });
});

test('test15 - REST API - PUT Request ', async ({ request }) => {
  await request.put('https://jsonplaceholder.typicode.com/posts/1', {
    data: {
      id: 1,  
    title: 'updated title',
    body: 'updated body',
    userId: 1,
    },
    headers: { 
'Content-type': 'application/json; charset=UTF-8' },
  }).then(async (response) => {
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id', 1);
    expect(responseBody).toHaveProperty('title', 'updated title');
    expect(responseBody).toHaveProperty('body', 'updated body');
    expect(responseBody).toHaveProperty('userId', 1);
  }); 
});

test('test15 - REST API - DELETE Request ', async ({ request }) => {
  await request.delete('https://jsonplaceholder.typicode.com/posts/1').then(async (response) => {
    
  });
});

test('Test Lab 3 exercise', async ({ request }) => {
  const response = await request.get('http://ip-api.com/json/8.8.8.8');
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.status).toBe('success');
  expect(responseBody.query).toBe('8.8.8.8');
  expect(responseBody.countryCode).toBe('US');
});
