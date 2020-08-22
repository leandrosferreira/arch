import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const query = await global.pool.query(
      'SELECT IdSystem, SystemName from tbSystem   ',
      []
    );
    res.send(query.rows);

    console.log(`GET /systens `);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
