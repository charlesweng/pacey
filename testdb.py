import mariadb

config = {
     'user': 'root',
     'password': '',
     'host': '127.0.0.1', # try changing to localhost
     'port': 3306,
     'database': 'flask_app',
 }

conn = mariadb.connect(**config)
cursor = conn.cursor()
query = f"SELECT customer_id, username FROM Customer WHERE username='charles' AND password='weng';"
res = None
try:
    conn = mariadb.connect(**config)
    cursor = conn.cursor()
    cursor.execute(query)
    res = cursor.fetchone()
finally:
    cursor.close()
    conn.close()
print(res[0], res[1])