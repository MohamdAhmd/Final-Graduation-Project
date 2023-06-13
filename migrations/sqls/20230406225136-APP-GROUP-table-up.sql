/* Replace with your SQL commands */
CREATE TABLE APP_GROUP (
	group_id serial NOT NULL,
	group_name varchar(100) NOT NULL,
	CONSTRAINT group_group_name_key UNIQUE (group_name),
	CONSTRAINT group_pkey PRIMARY KEY (group_id)
);
