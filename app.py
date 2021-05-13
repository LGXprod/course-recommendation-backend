import json

from dotenv import dotenv_values
from flask import Flask
from flask import request
import pymysql.cursors

import KNN

app = Flask(__name__)

config = dotenv_values(".env")
print("config", config)

connection = pymysql.connect(
  host = config["HOST"], 
  user = config["DB_USERNAME"],
  passwd = config["DB_PASSWORD"], 
  database = "crDB",
  charset = 'utf8mb4',
  cursorclass = pymysql.cursors.DictCursor
)

data = KNN.curate("./sampledata.csv")
# sample = {'Group Assignments': 0, 'Assignment Types': ['Quiz/test'], 'Keywords':['LTE', 'Prototyping']}

# prediction = KNN.Prediction(sample, data)
# similarity_list = prediction.get_similaritylist()

print("here1")

@app.route("/recommendation", methods=["GET", "POST"])
def postRecommendation():
  if request.method == "POST":
    try:
      body = request.form

      quizData = {
        "Group Assignments": body["group_assignments"],
        "Assignment Types": body["assignment_types"],
        "Keywords": body["keywords"]
      }

      prediction = KNN.Prediction(quizData, data)
      similarity_list = prediction.get_similaritylist()
      print(similarity_list)

      query = "update students set recommendations = %s where student_id = (select user_id as student_id from sessions where session_id=%s)"
      vals = (json.dumps(similarity_list), body["session_id"])

      with connection.cursor() as cursor:
        cursor.execute(query, vals)

      connection.commit()

      return json.dumps(similarity_list), 200, {'ContentType':'application/json'}
    except Exception as e:
      print("here")
      print("e", e)
      return json.dumps({}), 400, {'ContentType':'application/json'}

print("here2")

# if __name__ == '__app__':
#     app.run(debug=True)