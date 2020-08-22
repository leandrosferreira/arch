import express from 'express';

const router = express.Router();

router.get('/', async (request, response) => {
  try {
    const query = await global.pool.query(
      'select ' +
        '	idrule, ' +
        '	rulename, ' +
        '	coalesce((select true from tbLoginRules lr where lr.idLogin = $1::integer and  lr.idrule = r.idrule),false) as permissao ' +
        'from ' +
        '	tbRule r ' +
        'where ' +
        '	r.idsystem = $2::integer ',
      [request.query.IdLogin, request.query.IdSystem]
    );
    response.send(query.rows);

    console.log(
      `GET /loginrules - IdLogin=${request.query.IdLogin}&IdSystem=${request.query.IdSystem} `
    );
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.post('/', async (request, response) => {
  const { body } = request;

  try {
    const { IdLogin, IdsRoles, IdsRolesDel } = body;

    let sqlDeleInsert = '';
    IdsRolesDel.forEach((Role) => {
      sqlDeleInsert += ` delete from tbLoginRules where idLogin = ${IdLogin} and IdRule = ${Role} ; `;
    });

    IdsRoles.forEach((Role) => {
      sqlDeleInsert += ` insert into tbLoginRules (idrule, idlogin) values (${Role}, ${IdLogin}) ; `;
    });

    console.log(sqlDeleInsert);

    await global.pool.query(sqlDeleInsert);

    response.status(200).send({
      status: 'ok',
      message: `Lançamentos com id (${IdLogin}) inseridos com sucesso`,
    });
  } catch ({ message }) {
    response.status(400).send({ error: message });
  }
});

router.delete('/', async (request, response) => {
  const { body } = request;

  try {
    const { IdLogin, IdsRoles } = body;

    let sqlDelete = '';
    IdsRoles.forEach((Role) => {
      sqlDelete += ` delete from tbLoginRules where idLogin = ${IdLogin} and IdRule = ${Role} ; `;
    });

    await global.pool.query(sqlDelete);

    console.log(sqlDelete);

    response.send({
      status: 'ok',
      message: `Lançamento com id (${IdLogin}) excluído com sucesso`,
    });
  } catch ({ message }) {
    response.status(400).send({ error: message });
  }
});

export default router;
