#!/bin/sh
while ! $(psql "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}") ; do sleep 1; done;

#reset db
psql "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}"  -c "DROP DATABASE ${POSTGRES_DB};"
psql "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}"  -c "CREATE DATABASE ${POSTGRES_DB};"
#setup db
psql "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}" << EOF
\i db/schema/01_users.sql
\i db/schema/02_quizzes.sql
\i db/schema/03_questions.sql
\i db/schema/04_options.sql
\i db/schema/05_answers.sql
\i db/schema/06_options_answers.sql
\i db/seeds/01_users.sql;
\dt
EOF
exec npm start