EXISTING_IMG=$(docker ps -a -q -f=name=iprotect-db-test)
if [[ -n "$EXISTING_IMG" ]]; then
  echo "cleaning up test database"
  docker stop $EXISTING_IMG && docker rm $EXISTING_IMG
fi

echo "creating db"
docker create --name iprotect-db-test -p 5434:5432 -e POSTGRES_USER=test -e POSTGRES_PASSWORD=password -e POSTGRES_DB=iprotect postgres:13.6
docker start iprotect-db-test
sleep 1
(DATABASE_URL=postgresql://test:password@localhost:5434/iprotect?schema=public npx prisma migrate deploy)
