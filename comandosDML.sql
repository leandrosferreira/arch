
insert into tbLogin(login, password, nome, email) values ('maria', '123456', 'Maria Aparecida da Rosa', 'maria@gmail.com');
insert into tbLogin(login, password, nome, email) values ('joao', '654321', 'Joao Pedro da Silva', 'joaopedro@gmail.com');
insert into tbLogin(login, password, nome, email) values ('jose', '123654', 'Jose Henrique Costa', 'jose@gmail.com');

insert into tbSystem(systemname, mnemonic) values ('vendas varejo', 'vnd');
insert into tbSystem(systemname, mnemonic) values ('apoio marketing', 'mkt');

insert into tbRule(rulename, idsystem) values ('incluir venda', 1);
insert into tbRule(rulename, idsystem) values ('deletar venda', 1);
insert into tbRule(rulename, idsystem) values ('relatorios venda', 1);
insert into tbRule(rulename, idsystem) values ('emitr NF', 1);
insert into tbRule(rulename, idsystem) values ('nova campanha', 2);
insert into tbRule(rulename, idsystem) values ('deletar campanha', 2);
insert into tbRule(rulename, idsystem) values ('listar campanhas', 2);
insert into tbRule(rulename, idsystem) values ('novo produto', 2);

