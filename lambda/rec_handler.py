import os

def generateRecommendation(event, context):
    print(os.environ["REC_API_KEY"])

    if event.body != None and event.body.api_key == os.environ["REC_API_KEY"]:
      print("here")

      return "worked"
    else:
      return ""

    