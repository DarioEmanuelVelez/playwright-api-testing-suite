import { test, expect } from '@playwright/test';

test.describe('Módulo de Reservas - Operaciones de Consulta (GET)', () => {

  test('debe obtener la lista de todas las reservas existentes con status 200', async ({ request }) => {
    // 1. Disparamos la petición GET al endpoint relativo
    const response = await request.get('/booking');

    // 2. Validación #1: Código de estado HTTP
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    // 3. Validación #2: Encabezados (Headers)
    // Verificamos que el servidor responda en formato JSON
    const headers = response.headers();
    expect(headers['content-type']).toContain('application/json');

    // 4. Validación #3: Cuerpo de la respuesta (Payload)
    const body = await response.json();
    
    // Verificamos que sea un arreglo (lista) y que no venga vacío
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);

    // 5. Validación #4: Estructura interna del primer elemento
    // Cada reserva debe contener obligatoriamente la propiedad "bookingid"
    expect(body[0]).toHaveProperty('bookingid');
    expect(typeof body[0].bookingid).toBe('number');
  });

});