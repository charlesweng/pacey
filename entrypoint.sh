#!/usr/bin/env bash
/usr/local/bin/docker-entrypoint.sh mysqld > /dev/null 2>&1 & disown
sleep 20
python3 testdb.py
