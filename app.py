import json
import os

from flask import Flask
from flask import request
import pymysql.cursors

import KNN

app = Flask(__name__)

config = os.environ
# print("config", config)

connection = pymysql.connect(
  host = config["HOST"], 
  user = config["DB_USERNAME"],
  passwd = config["DB_PASSWORD"], 
  database = "crDB",
  charset = 'utf8mb4',
  cursorclass = pymysql.cursors.DictCursor
)

data = KNN.curate("./sampledata.csv")

@app.route("/recommendation", methods=["GET", "POST"])
def postRecommendation():
  if request.method == "POST":
    session_id = request.headers.get("session_id")

    try:
      body = request.form

      quizData = {
        "Group Assignments": body["group_assignments"],
        "Assignment Types": body["assignment_types"],
        "Keywords": body["keywords"]
      }

      prediction = KNN.Prediction(quizData, data)
      similarity_list = prediction.get_similaritylist()

      session_query = "select user_id as student_id from sessions where session_id = %s"
      session_query_vals = (session_id)

      with connection.cursor() as cursor:
        cursor.execute(session_query, session_query_vals)
        result = cursor.fetchone()

        if result == None:
          return json.dumps({}), 403, {'ContentType':'application/json'}
        else:
          query = "update students set recommendations = %s where student_id = %s"
          vals = (json.dumps(similarity_list), result["student_id"])

          with connection.cursor() as cursor:
            cursor.execute(query, vals)

          connection.commit()

          return json.dumps(similarity_list), 200, {'ContentType':'application/json'}

    except Exception as e:
      print("error", e)
      return json.dumps({}), 400, {'ContentType':'application/json'}

  else:
    session_id = request.headers.get("session_id")

    try:
      query = "select recommendations from students where student_id = (select user_id as student_id from sessions where session_id=%s)"
      vals = (session_id)

      with connection.cursor() as cursor:
        cursor.execute(query, vals)
        result = cursor.fetchone()

        return json.dumps(result), 200, {'ContentType':'application/json'}
    except:
      return json.dumps({}), 400, {'ContentType':'application/json'}
