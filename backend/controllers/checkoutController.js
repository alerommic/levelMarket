const nodemailer = require('nodemailer');
const pool = require('../db');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

transporter.verify((err) => {
  if (err) {
    console.error('SMTP no listo:', err);
  } else {
    console.log('  SMTP listo para enviar correos');
  }
});

const checkout = async (req, res) => {
  const userId = req.session.user.id;
  const items  = req.body.items; //  gameid, quantity 
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    
    const orderRes = await client.query(
      `INSERT INTO orders (userid, shippingaddress, totalamount)
      VALUES ($1, (SELECT address FROM users WHERE userid=$1), 0)
      RETURNING orderid`,
      [userId]
    );
    const orderId = orderRes.rows[0].orderid;
    let total = 0;

    for (const { gameid, quantity } of items) {
      // Obtiene precio y stock actual
      const { rows: gameRows } = await client.query(
        'SELECT price, stock FROM games WHERE gameid = $1',
        [gameid]
      );
      if (gameRows.length === 0) {
        throw new Error(`Juego con ID ${gameid} no encontrado`);
      }
      const { price, stock } = gameRows[0];

      // Verifica que haya stock suficiente
      if (quantity > stock) {
        throw new Error(`Stock insuficiente`);
      }

      // Guarda los orderdetails 
      total += price * quantity;
      await client.query(
        `INSERT INTO orderdetails (orderid, gameid, quantity, price)
        VALUES ($1, $2, $3, $4)`,
        [orderId, gameid, quantity, price]
      );
    }

    // Actualiza total en Orders
    await client.query(
      `UPDATE orders SET totalamount = $1 WHERE orderid = $2`,
      [total, orderId]
    );

    // Recupera email del usuario
    const { rows: userRows } = await client.query(
      'SELECT email FROM users WHERE userid = $1',
      [userId]
    );
    const toEmail = userRows[0]?.email;
    if (!toEmail) throw new Error('Email de usuario no encontrado');

    await client.query('COMMIT');

    // Envía correo con instrucciones de pago
    await transporter.sendMail({
      from: `"LevelMarket" <${process.env.MAIL_USER}>`,
      to: toEmail,
      subject: `Pedido #${orderId} registrado`,
      text: `Tu pedido #${orderId} por importe ${total.toFixed(2)}€ ha sido registrado.\n` +
            `Realiza la transferencia a la cuenta ES74 8328 9234 9234 2394 indicando como concepto #${orderId}.`
    });

    res.json({ orderId });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error en checkout:', err.message);
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
};

module.exports = { checkout };
