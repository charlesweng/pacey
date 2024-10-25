import mariadb

config = {
     'user': 'root',
     'password': '',
     'host': '127.0.0.1', # try changing to localhost
     'port': 3306,
     'database': 'flask_app',
 }
print("Starting Test File...")
conn = mariadb.connect(**config)
cursor = conn.cursor()
# query = f"SELECT customer_id, username FROM Customer WHERE username='charles' AND password='weng';"
# query = f"SELECT patient_id FROM Patient WHERE patient_id='1' AND password='weng';"
query = f"SELECT  patient_id, pacemaker_dependent, incision_location FROM Patient ORDER BY patient_id DESC;"
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