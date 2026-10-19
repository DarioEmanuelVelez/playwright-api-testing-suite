import { test, expect } from '@playwright/test';

test.describe('Módulo de Reservas - Operaciones de Consulta (GET)', () => {

  test('debe obtener la lista general de reservas con status 200', async ({ request }) => {
    const response = await request.get('/booking');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('bookingid');
  });

  test('debe obtener los detalles completos de una reserva extrayendo un ID dinámico', async ({ request }) => {
    // 1. Extraemos un ID válido de la lista actual
    const listResponse = await request.get('/booking');
    const bookings = await listResponse.json();
    const targetBookingId = bookings[0].bookingid;

    // 2. Consultamos la entidad puntual
    const response = await request.get(`/booking/${targetBookingId}`);
    expect(response.status()).toBe(200);

    const body = await response.json();

    // 3. Validación de contrato
    expect(body).toHaveProperty('firstname');
    expect(typeof body.firstname).toBe('string');
    expect(body).toHaveProperty('totalprice');
    expect(typeof body.totalprice).toBe('number');
    expect(body).toHaveProperty('depositpaid');
    expect(typeof body.depositpaid).toBe('boolean');
  });

  test('debe responder 404 cuando se consulta una reserva con un ID inexistente', async ({ request }) => {
    const response = await request.get('/booking/999999999');
    expect(response.status()).toBe(404);
  });

});