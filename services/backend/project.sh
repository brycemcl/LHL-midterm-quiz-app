#!/bin/sh
while ! pg_isready -d postgresql://username:password@postgres:5432/database > /dev/null ; do sleep .01; done;

#reset table using resetdb.js
# npm run db:reset
#psql after reset
psql postgresql://username:password@postgres:5432/database << EOF
\i db/schema/01_users.sql;
\i db/schema/05_widgets.sql;
\i db/seeds/01_users.sql;
\i db/seeds/05_widgets.sql;
\dt
EOF
npm start