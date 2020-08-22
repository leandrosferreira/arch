create database archoffice;

CREATE TABLE tbLogin(
	IdLogin serial PRIMARY KEY,
	Login VARCHAR(30) UNIQUE NOT NULL,
	Password VARCHAR(512) NOT NULL,
	Nome VARCHAR(80) NOT NULL,
	Email VARCHAR(100)
);

ALTER TABLE tbLogin
ALTER IdLogin TYPE BIGINT;

CREATE TABLE tbSystem(
	IdSystem serial PRIMARY KEY,
	SystemName VARCHAR(50) UNIQUE NOT NULL,
	Mnemonic VARCHAR(5)
);

CREATE TABLE tbRule(
	IdRule serial PRIMARY KEY,
	RuleName VARCHAR(50) UNIQUE NOT NULL,
	IdSystem INT,
	CONSTRAINT fkSystem FOREIGN KEY(IdSystem)  REFERENCES tbSystem(IdSystem)
);

CREATE TABLE tbLoginRules(
	IdRule INT NOT NULL,
	IdLogin BIGINT NOT NULL,
	PRIMARY KEY(IdRule, IdLogin),
	CONSTRAINT fkRule FOREIGN KEY(IdRule)  REFERENCES tbRule(IdRule),
	CONSTRAINT fkLogin FOREIGN KEY(IdLogin)  REFERENCES tbLogin(IdLogin)
);

	