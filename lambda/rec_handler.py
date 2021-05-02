import os
import sys
from dotenv import load_dotenv

# insert at 1, 0 is the script path (or '' in REPL)
sys.path.insert(1, "../KNN-final")
from KNN import curate, Prediction

load_dotenv()

def generateRecommendation(event, context):
    # print(os.environ["REC_API_KEY"])

    if event["body"] != None and event["body"]["api_key"] == os.getenv("REC_API_KEY"):
      # print("here")

      data = curate("../KNN-final/sampledata.csv")
      
      prediction = Prediction(event["body"]["studentInterests"], data)
      similarity_list = prediction.get_similaritylist()
      # print(similarity_list)

      subjectCodes = []

      for recommendation in similarity_list[:event["body"]["numSubjects"]+1]:
        rowIndex, probability = recommendation

        subjectCodes.append(data["Subject Number"].values[rowIndex])

      return subjectCodes
    else:
      return ""

event = {
  "body": {
    "api_key": "4360172738",
    "studentInterests": {'Group Assignments': 0, 'Assignment Types': ['Quiz/test'], 'Keywords':['LTE', 'Prototyping']},
    "numSubjects": 5
  }
}
generateRecommendation(event, {}) 