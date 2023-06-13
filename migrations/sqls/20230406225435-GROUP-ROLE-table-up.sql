/* Replace with your SQL commands */
CREATE TABLE GROUP_ROLE (
	group_role_id serial NOT NULL,
	group_id int4 NULL,
    role_id int4 NULL,
	CONSTRAINT group_role_pkey PRIMARY KEY (group_role_id)
);