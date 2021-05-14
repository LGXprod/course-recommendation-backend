import pandas as pd
from scipy import spatial



def onehot_encode(valueset, valuelist):
    return [1 if value in valuelist else 0 for value in valueset]


def get_strset(data, columnname):
        
    valueset = set()
    for index, row in data.iterrows():
        values = row[columnname]
        for value in values:
            if value not in ['', ' ']:
                valueset.add(value.strip())
        
    return list(valueset)


def split_textcolumns(data, splitter, *columnnames):
    
    for columnname in columnnames:
        data[columnname] = data[columnname].str.split(splitter)

    return data


def encode_textcolumns(data, *columnnames):
        
    for columnname in columnnames:
        valueset = get_strset(data, columnname)
        data[f'onehot_{columnname}'] = data[columnname].apply(lambda x: onehot_encode(valueset, x))

    return data


def curate(datafilepath):
    
    data = pd.read_csv(datafilepath)
    data = data.dropna()
    data = data[['Subject Number', 'Subject Name', 'Group Assignments', 'Assignment Types', 'Keywords']]
    data = split_textcolumns(data, ',', 'Assignment Types', 'Keywords')
    return encode_textcolumns(data, 'Assignment Types', 'Keywords')





class Prediction:

    def __init__(self, sample: dict, data):
        self.sample = sample
        self.sample['onehot_Assignment Types'] = onehot_encode(get_strset(data, 'Assignment Types'), sample['Assignment Types'])
        self.sample['onehot_Keywords'] = onehot_encode(get_strset(data, 'Keywords'), sample['Keywords'])
        self.data = data

    
    def calc_similarityscore(self, subject, sample):
    
        gsubject = int(subject['Group Assignments'])
        gsample = int(self.sample['Group Assignments'])
        
        gscore = abs(gsubject - gsample)
        ascore  = spatial.distance.cosine(subject['onehot_Assignment Types'], self.sample['onehot_Assignment Types'])
        kwscore  = spatial.distance.cosine(subject['onehot_Keywords'], self.sample['onehot_Keywords'])
        
        return ((0.01)*(1-gscore) + (0.1)*(1-ascore) + (1-kwscore))/(1.11)

    
    def get_similaritylist(self):
        
        similarity_list = []
        for index, row in self.data.iterrows():
            similarity_list.append((index, self.calc_similarityscore(row, self.sample)))
            
        return sorted(similarity_list, reverse=True, key=lambda score: score[1])

    def K_nearest(self, k):
        similaritylist = self.get_similaritylist()
        return [(str(self.data['Subject Number'][similaritylist[i][0]]), float(round(similaritylist[i][1], 6))) for i in range(0, k)]



# EXAMPLE USAGE BELOW:
# DATAPATH = 'data-final.csv'

# def testing():

#     data = curate(DATAPATH)
#     sample = {'Group Assignments': 0, 'Assignment Types': ['Quiz/test'], 'Keywords':['LTE', 'Prototyping']}
    
#     prediction = Prediction(sample, data)
#     k_nearest = prediction.K_nearest(10)
#     print(k_nearest)

# testing()