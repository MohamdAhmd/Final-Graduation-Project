/* Replace with your SQL commands */
CREATE TABLE App_ROLE (
	role_id serial NOT NULL,
	role_name varchar(100) NOT NULL,
	CONSTRAINT role_pkey PRIMARY KEY (role_id),
	CONSTRAINT role_name_key UNIQUE (role_name)
);