#!/bin/sh
while ! $(psql "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}") ; do sleep 1; done;
psql "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}" << EOF
\i db/schema/01_users.sql;
\i db/schema/05_widgets.sql;
\i db/seeds/01_users.sql;
\i db/seeds/05_widgets.sql;
\dt
EOF
exec npm start