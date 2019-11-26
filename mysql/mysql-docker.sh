# Restore
cat dm124_db.sql | docker exec -i mysql_database_api /usr/bin/mysql -u root --password=root dm124_db
# Backup
docker exec mysql_database_api /usr/bin/mysqldump -u root --password=root dm124_db > dm124_db.sql