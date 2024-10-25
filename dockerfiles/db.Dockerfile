FROM mariadb:10.6.2

ENV MYSQL_DATABASE=flask_app
ENV MARIADB_ALLOW_EMPTY_ROOT_PASSWORD=1

RUN apt-get update 
RUN apt-get -y install python3 python3-pip gcc libmariadb3 libmariadb-dev


WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh

COPY db /docker-entrypoint-initdb.d
COPY testdb.py .

EXPOSE 3306

CMD ["/entrypoint.sh"]
# CMD ["-c"]
