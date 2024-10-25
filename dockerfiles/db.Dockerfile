FROM mariadb:10.6.2

ENV MYSQL_DATABASE=flask_app
ENV MARIADB_ALLOW_EMPTY_ROOT_PASSWORD=1

RUN apt-get update 
RUN apt-get -y install python3 python3-pip gcc libmariadb3 libmariadb-dev


WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY db /docker-entrypoint-initdb.d

EXPOSE 3306

CMD ["mysqld"]
