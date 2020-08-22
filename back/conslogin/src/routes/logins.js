import express from 'express';

const router = express.Router();

router.get('/:valor', async (req, res) => {
  try {
    const query = await global.pool.query(
      'SELECT idlogin, login from tbLogin where (login ilike $1::text) or (nome ilike $1::text) ',
      ['%' + req.params.valor + '%']
    );
    res.send(query.rows);

    console.log(`GET /logins - " ${req.params.valor}`);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
